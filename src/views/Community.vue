<template>
    <div class="community-page">
      <div class="community-scroll slide-in">
        <!-- 发布动态 -->
        <div class="post-creation">
          <div class="user-info">
            <span>{{ userName }}</span>
          </div>
          <div class="post-input">
            <textarea v-model="newPost.content" placeholder="Share your fitness experiences..."></textarea>
  
            <div class="post-actions">
              <div class="upload-buttons">
                <button @click="uploadImage"><i class="fas fa-image"></i> Add photo</button>
                <button @click="uploadVideo"><i class="fas fa-video"></i> Add video</button>
              </div>
  
              <!-- 图片预览 -->
              <div v-if="newPost.previewImages.length" class="image-preview">
                <div v-for="(img, index) in newPost.previewImages" :key="index" class="preview-item">
                  <img :src="img" class="preview-img">
                  <button class="remove-btn" @click="removeImage(index)">✖</button>
                </div>
              </div>
  
              <!-- 视频预览 -->
              <div v-if="newPost.previewVideo" class="video-preview">
                <video controls class="preview-video">
                  <source :src="newPost.previewVideo" type="video/mp4" />
                </video>
                <button class="remove-btn" @click="removeVideo">✖</button>
              </div>
  
              <button class="publish-btn" @click="publishPost">Publish</button>
            </div>
          </div>
        </div>
  
        <!-- 帖子列表 -->
        <div class="posts-container">
          <div v-for="post in posts" :key="post.uniqueKey" class="post-card">
            <div class="post-header">
              <div class="post-info">
                <h3>{{ post.userName }}</h3>
                <span class="post-time">{{ post.timeAgo }}</span>
              </div>
  
              <button v-if="post.userName === userName" class="delete-btn" @click="deletePost(post.id)">🗑️ Delete</button>
            </div>
  
            <div class="post-content">
              <p>{{ post.content }}</p>
  
              <div v-if="post.images.length" class="post-images">
                <img v-for="img in post.images" :key="img" :src="img" class="post-image" @click="showImage(img)" />
              </div>
  
              <video v-if="post.video" controls class="post-video">
                <source :src="post.video" type="video/mp4" />
              </video>
            </div>
  
            <div class="post-stats">
              <div class="stat-item like-btn" @click="likePost(post.id)">
                <i :class="['fas', 'fa-heart', { liked: post.isLiked }]"></i>
                <span>{{ post.likes }}</span>
              </div>
              <div class="stat-item comment-btn" @click="toggleComments(post.id)">
                <i class="fas fa-comment"></i>
                <span>{{ post.comments.length }}</span>
              </div>
            </div>
  
            <!-- 评论 -->
            <div v-if="post.showComments" class="comments-section">
              <div class="comment-input-container">
                <input v-model="newComment" placeholder="Add a comment..." class="comment-input" />
                <button class="comment-submit-btn" @click="addComment(post.id)">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
  
              <div class="comments-list">
                <div v-for="comment in post.comments" :key="comment.id" class="comment">
                  <div class="comment-left">
                    <strong>{{ comment.userName }}</strong>
                    <span class="comment-time">{{ comment.timeAgo }}</span>
                  </div>
                  <div class="comment-content">
                    <p>{{ comment.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 放大图片 -->
      <div v-if="fullscreenImage" class="image-modal" @click="fullscreenImage = null">
        <img :src="fullscreenImage" class="fullscreen-img" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Community",
    data() {
      return {
        userName: localStorage.getItem("loginName"),
        posts: [],
        fullscreenImage: null,
        newComment: "",
        newPost: {
          content: "",
          images: [],
          video: "",
          previewImages: [],
          pendingImages: [],
          previewVideo: null,
          pendingVideo: null
        }
      };
    },
    methods: {
      async fetchPosts() {
        try {
          const response = await axios.get("https://api.hope52411.tech/api/posts", {
            params: { userName: this.userName }
          });
  
          const seen = new Set();
          this.posts = response.data.filter(p => {
            if (!seen.has(p.id)) {
              seen.add(p.id);
              return true;
            }
            return false;
          }).map(post => ({
            ...post,
            uniqueKey: `post-${post.id}`,
            images: post.images?.map(img => `https://api.hope52411.tech${img}`) || [],
            video: post.video ? `https://api.hope52411.tech${post.video}` : null,
            showComments: false,
            isLiked: Array.isArray(post.likedUsers) && post.likedUsers.includes(this.userName)
          }));
        } catch (err) {
          console.error("Failed to fetch posts", err);
        }
      },
      async publishPost() {
        if (!this.newPost.content.trim()) return;
  
        const postData = {
          content: this.newPost.content,
          userName: this.userName,
          images: [],
          video: null
        };
  
        // 图片上传
        for (const file of this.newPost.pendingImages) {
          const formData = new FormData();
          formData.append("file", file);
          const res = await axios.post("https://api.hope52411.tech/api/upload/image", formData);
          postData.images.push(res.data.url);
        }
  
        // 视频上传
        if (this.newPost.pendingVideo) {
          const formData = new FormData();
          formData.append("file", this.newPost.pendingVideo);
          const res = await axios.post("https://api.hope52411.tech/api/upload/video", formData);
          postData.video = res.data.url;
        }
  
        const response = await axios.post("https://api.hope52411.tech/api/posts", postData);
        const newPost = response.data;
        newPost.images = newPost.images.map(img => `https://api.hope52411.tech${img}`);
        newPost.video = newPost.video ? `https://api.hope52411.tech${newPost.video}` : null;
  
        this.posts.unshift({
          ...newPost,
          showComments: false,
          isLiked: false,
          uniqueKey: `post-${newPost.id}`,
          comments: []
        });
  
        this.newPost = {
          content: "",
          images: [],
          video: "",
          previewImages: [],
          pendingImages: [],
          previewVideo: null,
          pendingVideo: null
        };
      },
      async likePost(postId) {
        const res = await axios.post(`https://api.hope52411.tech/api/posts/${postId}/like`, {
          userName: this.userName
        });
  
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.isLiked = res.data.isLiked;
          post.likes = res.data.likes;
        }
      },
      async deletePost(id) {
        const res = await axios.delete(`https://api.hope52411.tech/api/posts/${id}`, {
          params: { userName: this.userName }
        });
        if (res.status === 200) {
          this.posts = this.posts.filter(p => p.id !== id);
        }
      },
      async addComment(postId) {
        if (!this.newComment.trim()) return;
        const res = await axios.post(`https://api.hope52411.tech/api/posts/${postId}/comments`, {
          content: this.newComment,
          userName: this.userName
        });
  
        const post = this.posts.find(p => p.id === postId);
        if (post) post.comments.push(res.data);
        this.newComment = "";
      },
      showImage(img) {
        this.fullscreenImage = img;
      },
      uploadImage() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = true;
        input.onchange = e => {
          const files = Array.from(e.target.files);
          files.forEach(file => {
            const reader = new FileReader();
            reader.onload = e => {
              this.newPost.previewImages.push(e.target.result);
            };
            reader.readAsDataURL(file);
            this.newPost.pendingImages.push(file);
          });
        };
        input.click();
      },
      uploadVideo() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "video/*";
        input.onchange = e => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = e => {
            this.newPost.previewVideo = e.target.result;
          };
          reader.readAsDataURL(file);
          this.newPost.pendingVideo = file;
        };
        input.click();
      },
      removeImage(index) {
        this.newPost.previewImages.splice(index, 1);
        this.newPost.pendingImages.splice(index, 1);
      },
      removeVideo() {
        this.newPost.previewVideo = null;
        this.newPost.pendingVideo = null;
      },
      toggleComments(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) post.showComments = !post.showComments;
      }
    },
    mounted() {
      this.fetchPosts();
    }
  };
  </script>
  
  <style scoped>
.community-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.community-scroll {
  width: 80%;
  max-width: 800px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding-bottom: 30px;
}

.community-scroll::-webkit-scrollbar {
  width: 8px;
}
.community-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
.community-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.post-creation {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 700px;
  margin: 20px auto;
}

.user-info {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.post-input textarea {
  width: 90%;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 12px;
  font-size: 14px;
  resize: none;
  outline: none;
  transition: all 0.3s ease;
}
.post-input textarea:focus {
  border-color: #667eea;
  box-shadow: 0px 0px 5px rgba(102, 126, 234, 0.5);
}

.image-preview,
.video-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.preview-item {
  position: relative;
}
.preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.preview-video {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.remove-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  cursor: pointer;
}

.publish-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}
.publish-btn:hover {
  background: linear-gradient(45deg, #5563c1, #623c8a);
  transform: scale(1.05);
}

.upload-buttons {
  display: flex;
  gap: 10px;
}
.upload-buttons button {
  background: none;
  border: none;
  font-size: 14px;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}
.upload-buttons button:hover {
  color: #4a52c1;
  transform: scale(1.1);
}
.upload-buttons i {
  font-size: 18px;
}

.posts-container {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 100px;
}
.post-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}
.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.post-time {
  color: #666;
  font-size: 0.9em;
}
.delete-btn {
  background: linear-gradient(45deg, #ff6b6b, #ff4757);
  color: white;
  border: none;
  font-size: 14px;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.delete-btn:hover {
  background: linear-gradient(45deg, #ff4757, #e63946);
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(255, 107, 107, 0.5);
}

.post-images {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.post-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
.post-video {
  width: 100%;
  margin-top: 10px;
  border-radius: 8px;
}

.post-stats {
  display: flex;
  gap: 20px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  transition: all 0.3s ease;
}
.stat-item:hover {
  color: #333;
  transform: scale(1.1);
}
.fa-heart {
  color: #bbb;
  transition: color 0.3s ease;
}
.fa-heart.liked {
  color: red;
}
.fa-comment {
  color: #666;
  transition: color 0.3s ease;
}
.stat-item:hover .fa-comment {
  color: #333;
}
.stat-item span {
  font-weight: bold;
}

.comments-section {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}
.comment-input-container {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px;
  border-radius: 25px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
.comment-input {
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 25px;
  outline: none;
  font-size: 14px;
  transition: all 0.3s ease;
}
.comment-input:focus {
  box-shadow: 0px 0px 8px rgba(102, 126, 234, 0.8);
}
.comment-submit-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 10px 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 5px;
}
.comment-submit-btn:hover {
  background: linear-gradient(45deg, #764ba2, #667eea);
  transform: scale(1.1);
}
.comments-list {
  margin-top: 10px;
  padding-left: 10px;
}
.comment {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}
.comment-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  padding-left: 5px;
}
.comment-time {
  font-size: 12px;
  color: #777;
  margin-top: 3px;
}
.comment-content {
  flex: 1;
  padding-left: 10px;
  font-size: 14px;
  color: #333;
  text-align: left;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.fullscreen-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.slide-in {
  animation: slideInUp 0.6s ease-out both;
}

@keyframes slideInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .community-scroll {
    width: 95%;
    padding: 10px 0 30px;
  }

  .post-creation {
    padding: 15px;
    margin: 10px auto;
    width: 90%;
  }

  .post-input textarea {
    width: 80%;
    font-size: 14px;
    height: 80px;
  }

  .preview-img,
  .post-image {
    width: 80px;
    height: 80px;
  }

  .preview-video,
  .post-video {
    max-width: 100%;
  }

  .upload-buttons {
    flex-direction: column;
    gap: 6px;
  }

  .publish-btn {
    width: 100%;
    font-size: 15px;
  }

  .post-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .delete-btn {
    padding: 6px 12px;
    font-size: 13px;
    width: 100%;
  }

  .comment-input-container {
    flex-direction: column;
    align-items: stretch;
  }

  .comment-input {
    font-size: 13px;
    padding: 8px;
    border-radius: 10px;
  }

  .comment-submit-btn {
    margin-left: 0;
    margin-top: 6px;
    align-self: flex-end;
  }

  .comment-left {
    width: auto;
    padding-left: 0;
  }

  .comment-content {
    padding-left: 0;
    margin-top: 5px;
  }

  .post-card {
    padding: 15px;
  }
}

</style>
