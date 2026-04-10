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

    <div class="chat-input-box">
      <input v-model="messageText" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
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
        const res = await axios.get("https://api.hope52411.tech/api/messages", {
          params: {
            sender: this.currentUser,
            receiverId: this.friendUsername, // ✅ 用 loginName 查
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
        receiver: this.friendUsername, // ✅ 用 loginName 发
        content: this.messageText,
      };

      console.log("🚀 正在发送消息:", newMsg);
      try {
        await axios.post("https://api.hope52411.tech/api/messages", newMsg);
        console.log("✅ 消息发送成功");
        this.messages.push(newMsg);
        this.messageText = "";
        this.scrollToBottom();
      } catch (err) {
        console.error("❌ 发送消息失败:", err);
      }
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
    this.pollingInterval = setInterval(this.fetchMessages, 3000); // 每3秒刷新一次
  },
  beforeDestroy() {
    clearInterval(this.pollingInterval); // 清除定时器
  }
};
</script>

<style scoped>
.chat-popup {
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  transition: none;
}

.chat-header {
  padding: 15px;
  background: #667eea;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  cursor: move;
  user-select: none;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* ✅ 每条消息通用样式 */
.message {
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 15px;
  line-height: 1.4;
  display: inline-block;
}

/* ✅ 本人消息靠右 */
.sent {
  background: #667eea;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 0;
  margin-left: auto;
}

/* ✅ 对方消息靠左 */
.received {
  background: #e0e0e0;
  color: #333;
  align-self: flex-start;
  border-bottom-left-radius: 0;
  margin-right: auto;
}

.chat-input-box {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  gap: 10px;
}

.chat-input-box input {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.chat-input-box button {
  padding: 8px 14px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
