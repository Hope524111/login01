<template>
  <div class="ai-chat-wrapper">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ 'mobile-open': sidebarOpen }">
      <div class="sidebar-header">
        <h3>Fitness AI</h3>
        <button class="new-chat-btn" @click="createNewChat">+ New Chat</button>
      </div>
      <div class="chat-history">
        <div v-if="chatHistory.length === 0" class="no-history">
          No conversation history
        </div>
        <div v-else v-for="chat in chatHistory" :key="chat.id"
          class="chat-item" :class="{ active: chat.id === currentChatId }">
          <span class="chat-title" @click="loadChat(chat)">{{ chat.title }}</span>
          <button class="delete-btn" @click.stop="deleteChat(chat.id)">×</button>
        </div>
      </div>
    </aside>

    <!-- 移动端遮罩 -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>

    <!-- 聊天主区域 -->
    <main class="chat-main">
      <!-- 移动端顶部栏 -->
      <div class="mobile-header">
        <button class="menu-btn" @click="sidebarOpen = true">☰</button>
        <h3>Fitness AI</h3>
      </div>

      <!-- 消息容器 -->
      <div class="messages-container" ref="messagesContainer">
        <!-- 欢迎消息 -->
        <div v-if="messages.length === 0" class="welcome-message">
          <div class="welcome-icon">🤖</div>
          <h2>Fitness AI Assistant</h2>
          <p>Hello! I'm your fitness AI assistant. I can help you with:</p>
          <ul>
            <li>Creating personalized workout plans</li>
            <li>Providing diet and nutrition advice</li>
            <li>Answering fitness-related questions</li>
          </ul>
          <p class="hint">How can I help you today?</p>
        </div>

        <!-- 消息列表 -->
        <div v-for="(msg, index) in messages" :key="index"
          class="message-wrapper" :class="msg.role">
          <div v-if="msg.role === 'assistant'" class="message-avatar">🤖</div>
          <div class="message-bubble">
            <div v-if="msg.role === 'assistant'" class="message-label">AI Assistant</div>
            <div class="message-content" v-html="formatMarkdown(msg.content)"></div>
          </div>
        </div>

        <!-- 打字指示器 -->
        <div v-if="isTyping" class="message-wrapper assistant">
          <div class="message-avatar">🤖</div>
          <div class="message-bubble">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <!-- 表情选择器 -->
        <div v-if="showEmojiPicker" class="emoji-picker">
          <div class="emoji-grid">
            <button v-for="emoji in emojis" :key="emoji" class="emoji-btn"
              @click="insertEmoji(emoji)">{{ emoji }}</button>
          </div>
        </div>

        <div class="input-row">
          <button class="emoji-toggle" @click="showEmojiPicker = !showEmojiPicker"
            :class="{ active: showEmojiPicker }">😀</button>
          <textarea
            v-model="userMessage"
            @keydown.enter.exact.prevent="sendMessage"
            placeholder="Type a message..."
            class="chat-input"
            rows="1"
          ></textarea>
          <button class="send-btn" @click="sendMessage" :disabled="!userMessage.trim()">➤</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FitnessPlanner',
  data() {
    return {
      loginName: localStorage.getItem("loginName") || "",
      userMessage: "",
      messages: [],
      isTyping: false,
      sidebarOpen: false,
      chatHistory: [],
      currentChatId: null,
      showEmojiPicker: false,
      emojis: [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
        '🙂', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘',
        '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭',
        '💪', '👍', '👏', '🙌', '🙏', '❤️', '🧡', '💛',
        '💚', '💙', '💜', '🔥', '⭐', '✨', '💥', '🎉'
      ],
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userMessage.trim() || this.isTyping) return;

      const userMsg = { role: "user", content: this.userMessage };
      this.messages.push(userMsg);
      this.saveCurrentChat();
      this.scrollToBottom();

      const tempMessage = this.userMessage;
      this.userMessage = "";
      this.showEmojiPicker = false;

      this.isTyping = true;

      try {
        const response = await axios.post("https://api.hooopex.com/api/chat", {
          loginName: this.loginName,
          userMessage: tempMessage
        }, {
          headers: { "Content-Type": "application/json" }
        });

        const assistantMsg = { role: "assistant", content: response.data.content };
        this.messages.push(assistantMsg);
        this.saveCurrentChat();
        this.$nextTick(() => this.scrollToBottom());

      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again."
        });
      } finally {
        this.isTyping = false;
      }
    },

    formatMarkdown(text) {
      if (!text) return '';
      let html = text
        // 代码块
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // 行内代码
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // 粗体
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // 斜体
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // 标题 (h3)
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        // 标题 (h2)
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        // 列表项
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        // 换行
        .replace(/\n/g, '<br>');

      // 包裹列表项
      if (html.includes('<li>')) {
        html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
      }

      return html;
    },

    insertEmoji(emoji) {
      this.userMessage += emoji;
      this.showEmojiPicker = false;
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    createNewChat() {
      this.messages = [];
      this.currentChatId = null;
      this.sidebarOpen = false;
    },

    loadChat(chat) {
      this.currentChatId = chat.id;
      this.messages = chat.messages || [];
      this.sidebarOpen = false;
      this.$nextTick(() => this.scrollToBottom());
    },

    saveCurrentChat() {
      if (this.messages.length > 0) {
        const existingIndex = this.chatHistory.findIndex(c => c.id === this.currentChatId);
        if (existingIndex >= 0) {
          this.chatHistory[existingIndex].messages = [...this.messages];
        } else {
          const newChat = {
            id: 'chat_' + Date.now(),
            title: this.messages[0]?.content?.substring(0, 30) + '...' || 'New Chat',
            messages: [...this.messages]
          };
          this.chatHistory.unshift(newChat);
          this.currentChatId = newChat.id;
        }
        this.saveChatHistory();
      }
    },

    deleteChat(chatId) {
      this.chatHistory = this.chatHistory.filter(c => c.id !== chatId);
      this.saveChatHistory();
      if (this.currentChatId === chatId) {
        this.createNewChat();
      }
    },

    saveChatHistory() {
      localStorage.setItem('aiChatHistory', JSON.stringify(this.chatHistory));
    },

    loadChatHistory() {
      const saved = localStorage.getItem('aiChatHistory');
      if (saved) {
        this.chatHistory = JSON.parse(saved);
        if (this.chatHistory.length > 0) {
          this.messages = this.chatHistory[0].messages || [];
          this.currentChatId = this.chatHistory[0].id;
        }
      }
    }
  },
  mounted() {
    this.loadChatHistory();
  },
};
</script>

<style scoped>
/* === Variables === */
.ai-chat-wrapper {
  --sidebar-width: 280px;
  --color-sidebar: #0D0D0D;
  --color-bg: #1A1A2E;
  --color-primary: #FF6B35;
  --color-primary-dark: #E55A2B;
  --color-secondary: #FF9F1C;
  --color-text: #FFFFFF;
  --color-text-secondary: #B2BEC3;
  --color-border: rgba(255, 255, 255, 0.1);
  --gradient-primary: linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%);
  --color-ai-msg: rgba(255, 255, 255, 0.08);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --shadow-glow: 0 4px 20px rgba(255, 107, 53, 0.4);
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
}

/* === Wrapper === */
.ai-chat-wrapper {
  display: flex;
  height: calc(100vh - 60px);
  background: var(--color-bg);
  font-family: 'Inter', 'PingFang SC', sans-serif;
}

/* === Sidebar === */
.sidebar {
  width: var(--sidebar-width);
  background: var(--color-sidebar);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.sidebar-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-md);
}

.new-chat-btn {
  width: 100%;
  padding: 12px 16px;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-glow);
}

.new-chat-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255, 107, 53, 0.5);
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-sm);
}

.no-history {
  text-align: center;
  color: var(--color-text-secondary);
  padding: var(--space-xl);
  font-size: 14px;
}

.chat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: 4px;
  border-left: 3px solid transparent;
}

.chat-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.chat-item.active {
  background: rgba(255, 107, 53, 0.15);
  border-left-color: var(--color-primary);
}

.chat-title {
  flex: 1;
  color: var(--color-text-secondary);
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-btn {
  opacity: 0;
  background: transparent;
  border: none;
  color: #ff6b6b;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.chat-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: rgba(255, 107, 107, 0.2);
}

/* === Sidebar Overlay (Mobile) === */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
}

/* === Chat Main === */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  position: relative;
}

/* === Mobile Header === */
.mobile-header {
  display: none;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.menu-btn {
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
}

.menu-btn:hover {
  color: var(--color-primary);
}

/* === Messages Container === */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* === Welcome Message === */
.welcome-message {
  text-align: center;
  padding: var(--space-2xl);
  color: var(--color-text);
  animation: fadeIn 0.5s ease;
}

.welcome-icon {
  font-size: 64px;
  margin-bottom: var(--space-lg);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.welcome-message h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: var(--space-lg);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-message p {
  color: var(--color-text-secondary);
  font-size: 16px;
  margin-bottom: var(--space-md);
}

.welcome-message ul {
  text-align: left;
  max-width: 400px;
  margin: 0 auto var(--space-lg);
  padding-left: var(--space-xl);
}

.welcome-message li {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-sm);
}

.welcome-message .hint {
  color: var(--color-primary);
  font-weight: 500;
  margin-top: var(--space-lg);
}

/* === Message Wrapper === */
.message-wrapper {
  display: flex;
  gap: var(--space-md);
  max-width: 85%;
  animation: messageIn 0.3s ease;
}

.message-wrapper.user {
  align-self: flex-end;
  flex-direction: row-reverse;
  margin-left: auto;
}

.message-wrapper.assistant {
  align-self: flex-start;
}

@keyframes messageIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === Message Avatar === */
.message-avatar {
  width: 36px;
  height: 36px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

/* === Message Bubble === */
.message-bubble {
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  max-width: 100%;
  min-width: 120px;
  text-align: left;
}

.message-wrapper.user .message-bubble {
  background: var(--gradient-primary);
  color: white;
  border-bottom-right-radius: var(--radius-xs);
  box-shadow: var(--shadow-glow);
}

.message-wrapper.assistant .message-bubble {
  background: var(--color-ai-msg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-bottom-left-radius: var(--radius-xs);
}

.message-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
}

.message-content {
  line-height: 1.6;
  word-wrap: break-word;
  text-align: left;
}

.message-content >>> * {
  text-align: left;
}

.message-content >>> code {
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'SF Mono', monospace;
  font-size: 14px;
  display: inline;
}

.message-content >>> pre {
  background: rgba(0, 0, 0, 0.3);
  padding: var(--space-md);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  margin: var(--space-sm) 0;
  text-align: left;
}

.message-content >>> pre code {
  background: transparent;
  padding: 0;
  display: block;
}

.message-content >>> h2,
.message-content >>> h3 {
  margin: var(--space-md) 0 var(--space-sm);
  font-weight: 600;
  text-align: left;
}

.message-content >>> h2 { font-size: 18px; }
.message-content >>> h3 { font-size: 16px; }

.message-content >>> ul,
.message-content >>> ol {
  margin: var(--space-sm) 0;
  padding-left: var(--space-lg);
  text-align: left;
}

.message-content >>> li {
  margin-bottom: var(--space-xs);
  text-align: left;
}

.message-content >>> p {
  margin: 0 0 var(--space-sm) 0;
  text-align: left;
}

.message-content >>> p:last-child {
  margin-bottom: 0;
}

/* === Typing Indicator === */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: var(--space-sm);
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: var(--color-text-secondary);
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

/* === Input Area === */
.input-area {
  padding: var(--space-md) var(--space-xl);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
  position: relative;
}

.input-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-sm);
  transition: all var(--transition-normal);
}

.input-row:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
}

.emoji-toggle {
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-toggle:hover,
.emoji-toggle.active {
  background: rgba(255, 107, 53, 0.2);
}

.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 15px;
  padding: var(--space-sm) var(--space-md);
  resize: none;
  outline: none;
  max-height: 120px;
  line-height: 1.5;
  font-family: inherit;
}

.chat-input::placeholder {
  color: var(--color-text-secondary);
}

.send-btn {
  width: 40px;
  height: 40px;
  background: var(--gradient-primary);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-glow);
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(255, 107, 53, 0.5);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* === Emoji Picker === */
.emoji-picker {
  position: absolute;
  bottom: 100%;
  left: var(--space-xl);
  background: var(--color-sidebar);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-sm);
  margin-bottom: var(--space-sm);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  animation: emojiSlide 0.2s ease;
}

@keyframes emojiSlide {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
  max-width: 320px;
}

.emoji-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  padding: 6px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.emoji-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  transform: scale(1.2);
}

/* === Responsive === */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform var(--transition-normal);
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
  }

  .mobile-header {
    display: flex;
  }

  .messages-container {
    padding: var(--space-lg);
  }

  .message-wrapper {
    max-width: 90%;
  }

  .welcome-icon {
    font-size: 48px;
  }

  .welcome-message h2 {
    font-size: 22px;
  }

  .emoji-grid {
    grid-template-columns: repeat(6, 1fr);
    max-width: 280px;
  }

  .input-area {
    padding: var(--space-sm) var(--space-md);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
