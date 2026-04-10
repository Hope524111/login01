<template>
    <transition name="slide-up" mode="out-in">
      <div class="chat-container">
        <h1 class="section-title">Fitness Planner</h1>
        <div class="chat-box" ref="chatBox">
          <div v-for="(msg, index) in messages" :key="index"
            :class="['message', msg.role === 'user' ? 'user' : 'assistant']">
            <div v-if="msg.role === 'user'" class="message-user">
              <p>{{ msg.content }}</p>
            </div>
            <div v-else class="message-assistant">
              <p v-html="msg.content.replace(/\n/g, '<br>')"></p>
            </div>
          </div>
        </div>
        <div class="input-container">
          <input
            v-model="userMessage"
            placeholder="Type your message..."
            @keyup.enter="sendMessage"
            class="chat-input"
          />
          <button @click="sendMessage" class="send-button">Send</button>
        </div>
      </div>
    </transition>
  </template>

<script>
import axios from 'axios';

export default {
  name: 'FitnessPlanner',
  data() {
    return {
      loginName: localStorage.getItem("loginName") || "",
      userMessage: "",
      messages: []
    };
  },
  methods: {
    scrollToBottom() {
  this.$nextTick(() => {
    const container = this.$refs.chatBox;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
},
async sendMessage() {
  if (!this.userMessage.trim()) return;

  const userMsg = { role: "user", content: this.userMessage };
  this.messages.push(userMsg);
  this.scrollToBottom(); // ✅ 滚动用户消息

  const tempMessage = this.userMessage;
  this.userMessage = "";

  try {
    const response = await axios.post("https://api.hope52411.tech/api/chat", {
      loginName: this.loginName,
      userMessage: tempMessage
    }, {
      headers: { "Content-Type": "application/json" }
    });

    const structuredContent = this.formatResponse(response.data.content);
    this.messages.push({ role: "assistant", content: structuredContent });

    // ✅ DOM 更新后再滚动
    this.$nextTick(() => {
      this.scrollToBottom();
    });

  } catch (error) {
    console.error("Error:", error);
  }
},

    formatResponse(response) {
      const lines = response.split("\n").filter(line => line.trim() !== "");
      return lines.map(line => {
        if (/^[0-9]+\./.test(line)) {
          return `<h3 class="response-heading">${line.trim()}</h3>`;
        } else {
          return `<p class="response-body">${line.trim()}</p>`;
        }
      }).join("");
    },

    async loadChatHistory() {
      if (!this.loginName) return;
      try {
        const url = `https://api.hope52411.tech/api/chat/${encodeURIComponent(this.loginName)}`;
        const response = await axios.get(url);

        this.messages = [];
        this.$nextTick(() => {
          this.messages = response.data.map(msg => ({
            role: msg.role,
            content: msg.content
          }));
          this.scrollToBottom();
        });
      } catch (error) {
        console.error("❌ Error fetching chat history:", error);
      }
    }
  },
  mounted() {
    this.loadChatHistory();
  }
};
</script>

<style scoped>
.chat-container {
  background: rgba(255, 255, 255, 0.596);
  border-radius: 15px;
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  backdrop-filter: blur(10px);
}

.chat-box {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
  height: 500px;
  backdrop-filter: blur(5px);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
  color: #333;
}

.message {
  margin-bottom: 10px;
}

.message-user {
  align-self: flex-end;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.message-user p {
  background: rgba(0, 123, 255, 0.8);
  color: white;
  display: inline-block;
  padding: 12px 15px;
  border-radius: 15px 15px 0 15px;
  max-width: 60%;
  word-wrap: break-word;
  margin-right: 10px;
}

.message-assistant {
  align-self: flex-start;
  text-align: left;
  display: flex;
  justify-content: flex-start;
}

.message-assistant p {
  background: rgb(196, 196, 196);
  display: inline-block;
  padding: 12px 15px;
  border-radius: 15px 15px 15px 0;
  max-width: 60%;
  word-wrap: break-word;
  color: #333;
  margin-left: 10px;
}

.input-container {
  display: flex;
  gap: 10px;
}

.chat-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.send-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.send-button:hover {
  background: linear-gradient(45deg, #764ba2, #667eea);
  transform: scale(1.05);
}

.slide-up-enter-active {
  transition: transform 0.5s;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100px);
}

@media (max-width: 768px) {
  .chat-container {
    width: 95%;
    padding: 12px;
    max-height: 96vh; 
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .chat-box {
    height: 400px; 
    padding: 6px;
  }

  .message-user p,
  .message-assistant p {
    max-width: 90%;
    font-size: 14px;
    padding: 8px;
  }
}
</style>
