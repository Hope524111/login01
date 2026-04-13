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
          const response = await axios.get("https://api.hooopex.com/api/posts", {
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
            images: post.images?.map(img => `https://api.hooopex.com${img}`) || [],
            video: post.video ? `https://api.hooopex.com${post.video}` : null,
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
          const res = await axios.post("https://api.hooopex.com/api/upload/image", formData);
          postData.images.push(res.data.url);
        }
  
        // 视频上传
        if (this.newPost.pendingVideo) {
          const formData = new FormData();
          formData.append("file", this.newPost.pendingVideo);
          const res = await axios.post("https://api.hooopex.com/api/upload/video", formData);
          postData.video = res.data.url;
        }
  
        const response = await axios.post("https://api.hooopex.com/api/posts", postData);
        const newPost = response.data;
        newPost.images = newPost.images.map(img => `https://api.hooopex.com${img}`);
        newPost.video = newPost.video ? `https://api.hooopex.com${newPost.video}` : null;
  
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
        const res = await axios.post(`https://api.hooopex.com/api/posts/${postId}/like`, {
          userName: this.userName
        });
  
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.isLiked = res.data.isLiked;
          post.likes = res.data.likes;
        }
      },
      async deletePost(id) {
        const res = await axios.delete(`https://api.hooopex.com/api/posts/${id}`, {
          params: { userName: this.userName }
        });
        if (res.status === 200) {
          this.posts = this.posts.filter(p => p.id !== id);
        }
      },
      async addComment(postId) {
        if (!this.newComment.trim()) return;
        const res = await axios.post(`https://api.hooopex.com/api/posts/${postId}/comments`, {
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.community-scroll {
  width: 80%;
  max-width: 800px;
  height: calc(100vh - 70px);
  overflow-y: auto;
  padding-bottom: var(--space-2xl);
  padding-top: var(--space-lg);
}

.community-scroll::-webkit-scrollbar {
  width: 6px;
}
.community-scroll::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: var(--radius-full);
}

/* Post creation card */
.post-creation {
  background: var(--gradient-card);
  backdrop-filter: blur(16px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: 100%;
  max-width: 700px;
  margin: 0 auto var(--space-xl);
  transition: all var(--transition-normal);
}

.post-creation:hover {
  border-color: var(--color-border-hover);
}

.user-info {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.post-input textarea {
  width: 100%;
  height: 100px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  padding: var(--space-md);
  font-size: var(--font-size-base);
  resize: none;
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  transition: all var(--transition-normal);
  font-family: var(--font-primary);
}

.post-input textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
}

.post-input textarea::placeholder {
  color: var(--color-text-muted);
}

/* Post actions */
.post-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-md);
}

.upload-buttons {
  display: flex;
  gap: var(--space-md);
}

.upload-buttons button {
  background: transparent;
  border: none;
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.upload-buttons button:hover {
  background: rgba(255, 107, 53, 0.15);
  color: var(--color-secondary);
}

.publish-btn {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-glow);
  margin-left: auto;
}

.publish-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-lg);
}

/* Image/Video preview */
.image-preview,
.video-preview {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}

.preview-item {
  position: relative;
}

.preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.preview-video {
  width: 100%;
  max-width: 300px;
  border-radius: var(--radius-sm);
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--color-error);
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);
}

.remove-btn:hover {
  transform: scale(1.1);
}

/* Posts list */
.posts-container {
  width: 100%;
  margin-bottom: 100px;
}

.post-card {
  background: var(--gradient-card);
  backdrop-filter: blur(16px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  transition: all var(--transition-normal);
}

.post-card:hover {
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-glow);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-md);
}

.post-info h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-xs);
}

.post-time {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

.delete-btn {
  background: transparent;
  border: 1px solid var(--color-error);
  color: var(--color-error);
  font-size: var(--font-size-xs);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.delete-btn:hover {
  background: var(--color-error);
  color: white;
}

.post-content p {
  color: var(--color-text);
  margin-bottom: var(--space-md);
  line-height: 1.6;
}

.post-images {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.post-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.post-image:hover {
  transform: scale(1.05);
}

.post-video {
  width: 100%;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-md);
}

/* Post stats */
.post-stats {
  display: flex;
  gap: var(--space-xl);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
}

.stat-item:hover {
  color: var(--color-primary);
  background: rgba(255, 107, 53, 0.1);
}

.stat-item i {
  font-size: var(--font-size-lg);
  transition: transform var(--transition-fast);
}

.stat-item:hover i {
  transform: scale(1.2);
}

.fa-heart.liked {
  color: var(--color-error) !important;
}

/* Comments section */
.comments-section {
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.comment-input-container {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--space-xs) var(--space-sm);
  margin-bottom: var(--space-md);
  transition: all var(--transition-normal);
}

.comment-input-container:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
}

.comment-input {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: transparent;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  outline: none;
}

.comment-input::placeholder {
  color: var(--color-text-muted);
}

.comment-submit-btn {
  background: var(--gradient-primary);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.comment-submit-btn:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-glow);
}

.comments-list {
  margin-top: var(--space-md);
}

.comment {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-md);
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-sm);
}

.comment-left {
  display: flex;
  flex-direction: column;
  min-width: 80px;
}

.comment-left strong {
  font-size: var(--font-size-sm);
  color: var(--color-text);
}

.comment-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.comment-content {
  flex: 1;
}

.comment-content p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Image modal */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
}

.fullscreen-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .community-scroll {
    width: 95%;
    padding: var(--space-md) 0;
  }

  .post-creation,
  .post-card {
    padding: var(--space-md);
  }

  .post-image {
    width: 80px;
    height: 80px;
  }

  .upload-buttons {
    flex-wrap: wrap;
  }

  .publish-btn {
    width: 100%;
    margin-top: var(--space-sm);
  }
}
</style>
