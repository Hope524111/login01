<template>
  <div class="chat-popup" ref="popup" :style="popupStyle">
    <div class="chat-header" @mousedown="startDrag">
      <span>Chat with {{ friendUsername }}</span>
      <button class="close-btn" @click="closePopup">×</button>
    </div>

    <div class="chat-messages" ref="chatBox">
      <div v-for="(msg, index) in messages" :key="index"
        :class="['message', msg.sender === currentUser ? 'sent' : 'received']">
        {{ msg.content }}
      </div>
    </div>

    <div class="chat-input-area">
      <!-- Emoji Picker -->
      <div v-if="showEmojiPicker" class="emoji-picker">
        <div class="emoji-grid">
          <button v-for="emoji in emojis" :key="emoji" class="emoji-btn" @click="selectEmoji(emoji)">
            {{ emoji }}
          </button>
        </div>
      </div>

      <div class="chat-input-box">
        <button class="emoji-toggle" @click="showEmojiPicker = !showEmojiPicker" :class="{ active: showEmojiPicker }">
          😄
        </button>
        <input v-model="messageText" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button class="send-btn" @click="sendMessage">➤</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatPopup",
  props: ["friendId", "friendUsername"],
  data() {
    return {
      messageText: "",
      messages: [],
      currentUser: localStorage.getItem("loginName"),
      dragging: false,
      popupPosition: { top: 100, left: window.innerWidth - 400 },
      offset: { x: 0, y: 0 },
      showEmojiPicker: false,
      emojis: [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
        '🙂', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘',
        '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭',
        '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒',
        '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴',
        '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶',
        '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐',
        '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳',
        '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱',
        '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤',
        '💪', '👍', '👎', '👏', '🙌', '🤝', '🙏', '💪',
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
        '💯', '🔥', '⭐', '✨', '💥', '💫', '🎉', '🎊'
      ],
    };
  },
  computed: {
    popupStyle() {
      return {
        top: this.popupPosition.top + "px",
        left: this.popupPosition.left + "px",
        position: "fixed",
      };
    },
  },
  methods: {
    async fetchMessages() {
      try {
        const res = await axios.get("https://api.hooopex.com/api/messages", {
          params: {
            sender: this.currentUser,
            receiverId: this.friendUsername,
          },
        });
        this.messages = res.data;
        this.scrollToBottom();
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    },
    async sendMessage() {
      if (!this.messageText.trim()) return;

      const newMsg = {
        sender: this.currentUser,
        receiver: this.friendUsername,
        content: this.messageText,
      };

      try {
        await axios.post("https://api.hooopex.com/api/messages", newMsg);
        this.messages.push(newMsg);
        this.messageText = "";
        this.showEmojiPicker = false;
        this.scrollToBottom();
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    },
    selectEmoji(emoji) {
      this.messageText += emoji;
      this.showEmojiPicker = false;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const box = this.$refs.chatBox;
        if (box) box.scrollTop = box.scrollHeight;
      });
    },
    closePopup() {
      this.$emit("close");
    },
    startDrag(e) {
      if (e.target.closest('.chat-input-box') || e.target.closest('.emoji-picker')) return;
      this.dragging = true;
      this.offset.x = e.clientX - this.$refs.popup.offsetLeft;
      this.offset.y = e.clientY - this.$refs.popup.offsetTop;
      window.addEventListener("mousemove", this.onDrag);
      window.addEventListener("mouseup", this.stopDrag);
    },
    onDrag(e) {
      if (!this.dragging) return;
      this.popupPosition.left = Math.max(0, e.clientX - this.offset.x);
      this.popupPosition.top = Math.max(0, e.clientY - this.offset.y);
    },
    stopDrag() {
      this.dragging = false;
      window.removeEventListener("mousemove", this.onDrag);
      window.removeEventListener("mouseup", this.stopDrag);
    },
  },
  mounted() {
    this.fetchMessages();
    this.pollingInterval = setInterval(this.fetchMessages, 3000);
  },
  beforeDestroy() {
    clearInterval(this.pollingInterval);
  }
};
</script>

<style scoped>
.chat-popup {
  width: 360px;
  height: 520px;
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg), 0 0 40px rgba(255, 107, 53, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  overflow: hidden;
}

.chat-header {
  padding: var(--space-md) var(--space-lg);
  background: var(--gradient-primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  border-top-left-radius: var(--radius-xl);
  border-top-right-radius: var(--radius-xl);
  cursor: move;
  user-select: none;
  box-shadow: 0 2px 10px rgba(255, 107, 53, 0.3);
}

.chat-header span {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.chat-header span::before {
  content: '';
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 18px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.chat-messages {
  flex: 1;
  padding: var(--space-md);
  overflow-y: auto;
  background: rgba(26, 26, 46, 0.5);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: var(--radius-full);
}

/* Message bubbles */
.message {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-lg);
  max-width: 75%;
  word-wrap: break-word;
  font-size: var(--font-size-sm);
  line-height: 1.5;
  display: inline-block;
  animation: messageIn 0.3s ease;
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

/* Sent messages (right side, orange gradient) */
.sent {
  background: var(--gradient-primary);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: var(--radius-xs);
  box-shadow: var(--shadow-glow);
}

/* Received messages (left side, dark glass) */
.received {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  align-self: flex-start;
  border-bottom-left-radius: var(--radius-xs);
}

/* Emoji Picker */
.emoji-picker {
  background: var(--color-dark);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-sm);
  margin-bottom: var(--space-sm);
  box-shadow: var(--shadow-lg);
  animation: emojiSlide 0.2s ease;
}

@keyframes emojiSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
  max-height: 150px;
  overflow-y: auto;
}

.emoji-grid::-webkit-scrollbar {
  width: 4px;
}

.emoji-grid::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: var(--radius-full);
}

.emoji-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  padding: 4px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.emoji-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  transform: scale(1.2);
}

/* Chat Input Area */
.chat-input-area {
  padding: var(--space-sm) var(--space-md) var(--space-md);
  background: rgba(26, 26, 46, 0.8);
  border-top: 1px solid var(--color-border);
}

.chat-input-box {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.emoji-toggle {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-toggle:hover,
.emoji-toggle.active {
  background: rgba(255, 107, 53, 0.2);
  border-color: var(--color-primary);
  transform: scale(1.1);
}

.chat-input-box input {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  transition: all var(--transition-normal);
  outline: none;
}

.chat-input-box input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
  background: rgba(255, 255, 255, 0.08);
}

.chat-input-box input::placeholder {
  color: var(--color-text-muted);
}

.send-btn {
  width: 36px;
  height: 36px;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-glow);
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-glow-lg);
}

.send-btn:active {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 480px) {
  .chat-popup {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }

  .chat-header {
    border-radius: 0;
  }

  .emoji-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
