<template>
  <div class="community-page">
    <div class="community-container">
      <!-- Modern Header -->
      <div class="community-header">
        <div class="header-title">
          <span class="fire-icon">🔥</span>
          <h1>活力社区</h1>
        </div>
        <div class="filter-tabs">
          <button
            v-for="tab in filterTabs"
            :key="tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Post Creation Box -->
      <div class="post-creation-card">
        <div class="creation-layout">
          <div class="user-avatar">
            <div class="avatar-circle">{{ userName ? userName.charAt(0).toUpperCase() : 'U' }}</div>
          </div>
          <div class="creation-input-area">
            <textarea
              v-model="newPost.content"
              class="creation-textarea"
              placeholder="Share your fitness journey..."
            ></textarea>
            <div v-if="newPost.previewImages.length" class="creation-image-preview">
              <div v-for="(img, index) in newPost.previewImages" :key="index" class="creation-preview-item">
                <img :src="img" class="creation-preview-img" />
                <button class="creation-remove-btn" @click="removeImage(index)">✖</button>
              </div>
            </div>
            <div v-if="newPost.previewVideo" class="creation-video-preview">
              <video controls class="creation-preview-video">
                <source :src="newPost.previewVideo" type="video/mp4" />
              </video>
              <button class="creation-remove-btn" @click="removeVideo">✖</button>
            </div>
            <div class="creation-actions">
              <div class="media-buttons">
                <button class="media-btn" @click="uploadImage">
                  <span class="btn-icon">📷</span>
                  <span class="btn-label">Image</span>
                </button>
                <button class="media-btn" @click="uploadVideo">
                  <span class="btn-icon">🎥</span>
                  <span class="btn-label">Video</span>
                </button>
              </div>
              <button class="publish-btn-gradient" @click="publishPost">
                <span>Publish</span>
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts List -->
      <div class="posts-container">
        <div v-for="post in sortedPosts" :key="post.uniqueKey" class="post-card-modern">
          <!-- Vote Section -->
          <div class="vote-section">
            <button
              :class="['vote-btn', { upvoted: post.isLiked }]"
              @click="likePost(post.id)"
            >
              <i class="fas fa-chevron-up"></i>
            </button>
            <span :class="['vote-count', { 'voted': post.isLiked }]">{{ post.likes }}</span>
          </div>

          <!-- Post Content -->
          <div class="post-main">
            <!-- Top Row: Avatar + User Info + Badge -->
            <div class="post-top-row">
              <div class="post-author">
                <div class="author-avatar">{{ post.userName ? post.userName.charAt(0).toUpperCase() : 'U' }}</div>
                <div class="author-info">
                  <span class="author-name">{{ post.userName }}</span>
                  <span class="post-time">{{ post.timeAgo }}</span>
                </div>
              </div>
              <div class="author-badge" v-if="post.userName === userName">
                <span class="badge-icon">🗑️</span>
                <button class="delete-btn" @click="deletePost(post.id)">Delete</button>
              </div>
              <div class="author-badge top-contributor" v-else>
                <span class="badge-icon">🏆</span>
                <span class="badge-text">Top Contributor</span>
              </div>
            </div>

            <!-- Content -->
            <div class="post-body">
              <p :class="['post-text', { collapsed: post.collapsed && post.content.length > 200 }]">
                {{ post.content }}
              </p>
              <button
                v-if="post.content.length > 200"
                class="read-more-btn"
                @click="post.collapsed = !post.collapsed"
              >
                {{ post.collapsed ? 'Read more' : 'Show less' }}
              </button>
            </div>

            <!-- Image Gallery -->
            <div v-if="post.images && post.images.length" :class="['image-gallery', `gallery-${Math.min(post.images.length, 4)}`]">
              <div
                v-for="(img, imgIndex) in post.images.slice(0, 4)"
                :key="imgIndex"
                :class="['gallery-item', { 'more-overlay': imgIndex === 3 && post.images.length > 4 }]"
                @click="showImage(img)"
              >
                <img :src="img" class="gallery-img" />
                <div v-if="imgIndex === 3 && post.images.length > 4" class="more-count">
                  +{{ post.images.length - 4 }}
                </div>
              </div>
            </div>

            <!-- Video -->
            <div v-if="post.video" class="post-video-container">
              <video controls class="post-video">
                <source :src="post.video" type="video/mp4" />
              </video>
            </div>

            <!-- Bottom Row: Stats -->
            <div class="post-stats-row">
              <button class="stat-btn comment-btn" @click="toggleComments(post.id)">
                <i class="fas fa-comment"></i>
                <span>{{ post.comments ? post.comments.length : 0 }}</span>
              </button>
              <button class="stat-btn share-btn" @click="sharePost(post)">
                <i class="fas fa-share"></i>
                <span>Share</span>
              </button>
            </div>

            <!-- Comments Section -->
            <div v-if="post.showComments" class="comments-section-slide">
              <div class="comment-input-wrapper">
                <div class="comment-user-avatar">{{ userName ? userName.charAt(0).toUpperCase() : 'U' }}</div>
                <input
                  v-model="newComment"
                  placeholder="Add a comment..."
                  class="comment-input"
                  @keyup.enter="addComment(post.id)"
                />
                <button class="comment-submit" @click="addComment(post.id)">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
              <div class="comments-list">
                <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
                  <div class="comment-avatar">{{ comment.userName ? comment.userName.charAt(0).toUpperCase() : 'U' }}</div>
                  <div class="comment-bubble">
                    <div class="comment-header">
                      <span class="comment-author">{{ comment.userName }}</span>
                      <span class="comment-time">{{ comment.timeAgo }}</span>
                    </div>
                    <p class="comment-text">{{ comment.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="fullscreenImage" class="image-modal-overlay" @click="fullscreenImage = null">
      <button class="modal-close-btn">✖</button>
      <img :src="fullscreenImage" class="modal-fullscreen-img" />
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
      activeTab: "all",
      filterTabs: [
        { id: "all", label: "All" },
        { id: "trending", label: "Trending" },
        { id: "latest", label: "Latest" }
      ],
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
  computed: {
    sortedPosts() {
      let posts = [...this.posts];
      if (this.activeTab === "trending") {
        return posts.sort((a, b) => b.likes - a.likes);
      } else if (this.activeTab === "latest") {
        return posts;
      }
      return posts;
    }
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
          collapsed: true,
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

      for (const file of this.newPost.pendingImages) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("https://api.hooopex.com/api/upload/image", formData);
        postData.images.push(res.data.url);
      }

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
        collapsed: true,
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
    sharePost(post) {
      if (navigator.share) {
        navigator.share({
          title: 'Fitness Post',
          text: post.content.substring(0, 100),
          url: window.location.href
        });
      }
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
/* CSS Variables */
.community-page {
  --color-primary: #FF6A35;
  --color-bg: #1A1A2E;
  --color-card: rgba(255, 255, 255, 0.05);
  --color-border: rgba(255, 255, 255, 0.1);
  --gradient-primary: linear-gradient(135deg, #FF6A35 0%, #FF9F1C 100%);
  --color-text: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.7);
  --color-text-muted: rgba(255, 255, 255, 0.4);
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
}

.community-page {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
  padding: var(--space-lg) var(--space-md);
}

.community-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Modern Header */
.community-header {
  margin-bottom: var(--space-xl);
  animation: fadeInDown 0.5s ease;
}

.header-title {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.header-title h1 {
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.fire-icon {
  font-size: 2rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.filter-tabs {
  display: flex;
  gap: var(--space-sm);
  background: var(--color-card);
  padding: var(--space-xs);
  border-radius: 50px;
  width: fit-content;
  border: 1px solid var(--color-border);
}

.tab-btn {
  padding: var(--space-sm) var(--space-lg);
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 50px;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  color: var(--color-text);
}

.tab-btn.active {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

/* Post Creation Card */
.post-creation-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
  backdrop-filter: blur(10px);
  transition: all var(--transition-normal);
  animation: fadeInUp 0.5s ease;
}

.post-creation-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.15);
}

.creation-layout {
  display: flex;
  gap: var(--space-md);
}

.user-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.creation-input-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.creation-textarea {
  width: 100%;
  min-height: 80px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--space-md);
  color: var(--color-text);
  font-size: 0.95rem;
  resize: none;
  outline: none;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.creation-textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
}

.creation-textarea::placeholder {
  color: var(--color-text-muted);
}

.creation-image-preview,
.creation-video-preview {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.creation-preview-item {
  position: relative;
}

.creation-preview-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.creation-preview-video {
  width: 150px;
  border-radius: 8px;
}

.creation-remove-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff4757;
  border: none;
  color: white;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);
}

.creation-remove-btn:hover {
  transform: scale(1.1);
}

.creation-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.media-buttons {
  display: flex;
  gap: var(--space-md);
}

.media-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 20px;
  color: var(--color-primary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.media-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  border-color: var(--color-primary);
}

.btn-icon {
  font-size: 1rem;
}

.publish-btn-gradient {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-xl);
  background: var(--gradient-primary);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.publish-btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.publish-btn-gradient i {
  font-size: 0.8rem;
  transition: transform var(--transition-fast);
}

.publish-btn-gradient:hover i {
  transform: translateX(3px);
}

/* Posts Container */
.posts-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding-bottom: 100px;
}

/* Post Card Modern */
.post-card-modern {
  display: flex;
  gap: var(--space-md);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: var(--space-lg);
  backdrop-filter: blur(10px);
  transition: all var(--transition-normal);
  animation: fadeInUp 0.5s ease;
}

.post-card-modern:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 107, 53, 0.3);
  box-shadow: 0 12px 40px rgba(255, 107, 53, 0.15), 0 0 0 1px rgba(255, 107, 53, 0.1);
}

/* Vote Section */
.vote-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding-right: var(--space-md);
  border-right: 1px solid var(--color-border);
}

.vote-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.vote-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(255, 107, 53, 0.1);
}

.vote-btn.upvoted {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(255, 107, 53, 0.15);
  animation: heartPop 0.3s ease;
}

@keyframes heartPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.vote-count {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-secondary);
}

.vote-count.voted {
  color: var(--color-primary);
}

/* Post Main */
.post-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  min-width: 0;
}

/* Top Row */
.post-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-author {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.post-time {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.author-badge {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.author-badge.top-contributor {
  padding: var(--space-xs) var(--space-sm);
  background: rgba(255, 215, 0, 0.15);
  border-radius: 20px;
  font-size: 0.75rem;
  color: #ffd700;
}

.badge-icon {
  font-size: 0.9rem;
}

.badge-text {
  font-weight: 500;
}

.delete-btn {
  padding: var(--space-xs) var(--space-sm);
  background: rgba(255, 71, 87, 0.15);
  border: 1px solid rgba(255, 71, 87, 0.3);
  border-radius: 20px;
  color: #ff4757;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.delete-btn:hover {
  background: rgba(255, 71, 87, 0.25);
}

/* Post Body */
.post-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.post-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.post-text.collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: color var(--transition-fast);
}

.read-more-btn:hover {
  color: #ff9f1c;
}

/* Image Gallery */
.image-gallery {
  display: grid;
  gap: var(--space-sm);
  border-radius: 12px;
  overflow: hidden;
}

.gallery-1 {
  grid-template-columns: 1fr;
}

.gallery-2 {
  grid-template-columns: 1fr 1fr;
}

.gallery-3 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.gallery-3 .gallery-item:first-child {
  grid-row: span 2;
}

.gallery-4 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.gallery-item:hover .gallery-img {
  transform: scale(1.05);
}

.gallery-item.more-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.more-count {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  z-index: 1;
}

/* Video Container */
.post-video-container {
  border-radius: 12px;
  overflow: hidden;
}

.post-video {
  width: 100%;
  border-radius: 12px;
}

/* Stats Row */
.post-stats-row {
  display: flex;
  gap: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
}

.stat-btn {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 20px;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.stat-btn:hover {
  background: rgba(255, 107, 53, 0.1);
  border-color: rgba(255, 107, 53, 0.3);
  color: var(--color-primary);
}

.stat-btn i {
  font-size: 1rem;
}

.comment-btn:hover {
  color: #00d2d3;
  background: rgba(0, 210, 211, 0.1);
  border-color: rgba(0, 210, 211, 0.3);
}

.share-btn:hover {
  color: #54a0ff;
  background: rgba(84, 160, 255, 0.1);
  border-color: rgba(84, 160, 255, 0.3);
}

/* Comments Section */
.comments-section-slide {
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.comment-input-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  border-radius: 25px;
  padding: var(--space-xs) var(--space-md);
  transition: all var(--transition-fast);
}

.comment-input-wrapper:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.comment-user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.comment-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 0.9rem;
  outline: none;
  padding: var(--space-sm) 0;
}

.comment-input::placeholder {
  color: var(--color-text-muted);
}

.comment-submit {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gradient-primary);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.comment-submit:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.comments-list {
  margin-top: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.comment-item {
  display: flex;
  gap: var(--space-sm);
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.comment-bubble {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: var(--space-sm) var(--space-md);
}

.comment-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.comment-author {
  font-weight: 600;
  font-size: 0.85rem;
}

.comment-time {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.comment-text {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Image Modal */
.image-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.modal-fullscreen-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .community-page {
    padding: var(--space-md);
  }

  .community-header {
    margin-bottom: var(--space-lg);
  }

  .header-title h1 {
    font-size: 1.5rem;
  }

  .filter-tabs {
    width: 100%;
  }

  .tab-btn {
    flex: 1;
    text-align: center;
    padding: var(--space-sm) var(--space-sm);
  }

  .post-creation-card {
    padding: var(--space-md);
  }

  .creation-layout {
    flex-direction: column;
  }

  .avatar-circle {
    width: 40px;
    height: 40px;
  }

  .creation-actions {
    flex-direction: column;
    gap: var(--space-md);
    align-items: stretch;
  }

  .media-buttons {
    justify-content: center;
  }

  .publish-btn-gradient {
    justify-content: center;
  }

  .post-card-modern {
    flex-direction: column;
    padding: var(--space-md);
  }

  .vote-section {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding-right: 0;
    padding-bottom: var(--space-md);
  }

  .vote-btn {
    width: 36px;
    height: 36px;
  }

  .post-top-row {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }

  .author-badge {
    align-self: flex-end;
  }

  .image-gallery {
    grid-template-columns: 1fr 1fr;
  }

  .gallery-3 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .gallery-3 .gallery-item:first-child {
    grid-row: span 1;
  }

  .post-stats-row {
    flex-wrap: wrap;
  }
}
</style>
