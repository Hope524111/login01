<template>
  <div class="friends-page">
    <div class="friends-scroll slide-in">
    <!-- 添加好友区域 -->
    <div class="friends-container">
      <h2>👥 Add New Friends</h2>

      <div class="search-section">
        <input v-model="searchQuery" placeholder="Enter username to search" />
        <button @click="searchUsers">Search</button>
      </div>

      <div v-if="searchResults.length" class="results">
        <h3>Search Results:</h3>
        <ul>
          <li v-for="user in searchResults" :key="user.id">
            <span><strong>{{ user.loginName }}</strong> - {{ user.email }}</span>
            <button @click="addFriend(user)">➕ Add</button>
          </li>
        </ul>
      </div>

      <div v-if="message" :class="['feedback', message.includes('❌') ? 'error' : '']">
        {{ message }}
      </div>
    </div>

    <!-- 好友列表区域 -->
    <div v-if="friendList.length" class="friends-section">
      <h3>🡫 Your Friends:</h3>
      <ul>
        <li v-for="friend in friendList" :key="friend.id">
          {{ friend.username }}
          <button @click="goToChat(friend.id, friend.username)">💬 Chat</button>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>


<script>
import ChatPopup from "@/views/ChatPopup.vue";
import axios from "axios";

export default {
  name: "Friends",
  components: { ChatPopup },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      message: "",
      friendList: []
    };
  },
  mounted() {
    this.fetchFriends();
  },
  methods: {
    goToChat(friendId, friendName) {
      this.$root.$emit("open-chat", friendId, friendName);

    },
    async fetchFriends() {
      try {
        const currentUser = localStorage.getItem("loginName");
        const response = await axios.get("https://api.hooopex.com/api/friends/list", {
          params: { userName: currentUser },
        });
        this.friendList = response.data || [];
      } catch (err) {
        console.error("❌ Failed to fetch friends:", err);
        this.message = "❌ Failed to load friend list.";
      }
    },
    async searchUsers() {
      if (!this.searchQuery.trim()) return;
      try {
        const response = await axios.get(
          `https://api.hooopex.com/sys-user/search?name=${encodeURIComponent(this.searchQuery)}`
        );
        this.searchResults = response.data;
        this.message = this.searchResults.length ? "" : "❌ The user was not found";
      } catch (err) {
        console.error("Search error:", err);
        this.message = "❌ Query failed, please try again later";
      }
    },
    async addFriend(user) {
      const currentUser = localStorage.getItem("loginName");
      if (user.loginName === currentUser) {
        this.message = "⚠️ You cannot add yourself as a friend.";
        return;
      }
      try {
        const res = await axios.post("https://api.hooopex.com/api/friends/add", {
          userName: currentUser,
          friendId: user.id,
        });
        this.message = res.data || "✅ Friend added successfully!";
        this.fetchFriends();
        setTimeout(() => (this.message = ""), 3000);
      } catch (err) {
        console.error("Add friend failed:", err);
        this.message = err.response?.data ? `❌ ${err.response.data}` : "❌ Failed to add friend.";
      }
    },
  },
};
</script>

<style scoped>
.friends-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.friends-scroll {
  margin-top: var(--space-lg);
  width: 80%;
  max-width: 800px;
  height: calc(100vh - 70px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 100px;
}

.friends-scroll::-webkit-scrollbar {
  width: 6px;
}
.friends-scroll::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: var(--radius-full);
}

.friends-container,
.friends-section {
  background: var(--gradient-card);
  backdrop-filter: blur(16px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  text-align: center;
  transition: all var(--transition-normal);
  margin-bottom: var(--space-xl);
}

.friends-container:hover,
.friends-section:hover {
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-glow);
}

.friends-container h2,
.friends-section h3 {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-lg);
}

.search-section {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.search-section input {
  flex: 1;
  max-width: 300px;
  padding: 12px var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  transition: all var(--transition-normal);
}

.search-section input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
  outline: none;
}

.search-section input::placeholder {
  color: var(--color-text-muted);
}

.search-section button {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-glow);
}

.search-section button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-lg);
}

.results ul,
.friends-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.results li,
.friends-section li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-lg);
  margin-bottom: var(--space-sm);
  transition: all var(--transition-normal);
}

.results li:hover,
.friends-section li:hover {
  border-color: var(--color-border-hover);
  background: rgba(255, 107, 53, 0.08);
}

.results li span,
.friends-section li span {
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

.results li button,
.friends-section li button {
  background: transparent;
  border: 2px solid var(--color-success);
  color: var(--color-success);
  padding: 6px 16px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.results li button:hover,
.friends-section li button:hover {
  background: var(--color-success);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 184, 148, 0.3);
}

.feedback {
  margin-top: var(--space-md);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  color: var(--color-success);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  background: rgba(0, 184, 148, 0.1);
}

.feedback.error {
  color: var(--color-error);
  background: rgba(255, 107, 107, 0.1);
}

.slide-in {
  animation: slideInUp 0.6s ease-out both;
}

@keyframes slideInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .friends-scroll {
    width: 95%;
    padding: var(--space-md) 0;
  }

  .friends-container,
  .friends-section {
    padding: var(--space-lg);
  }

  .search-section {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .search-section input {
    max-width: 100%;
  }

  .search-section button {
    width: 100%;
  }

  .results li,
  .friends-section li {
    flex-direction: column;
    gap: var(--space-sm);
    text-align: center;
  }
}
</style>
