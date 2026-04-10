<template>
  <div id="bgimg">
    <el-form class="forgot-container" label-position="left" label-width="0px">
      <h3 class="forgot_title">Forgot Password</h3>

      <el-form-item>
        <el-input
          type="email"
          v-model="email"
          autocomplete="off"
          placeholder="Enter your registered email"
        >
          <template #prefix>
            <i class="el-icon-message"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item style="width: 100%;">
        <el-button class="forgot-btn" @click="sendResetEmail">Send Reset Link</el-button>
      </el-form-item>

      <div class="forgot-footer">
        <el-button type="text" @click="backToLogin">Back to Login</el-button>
      </div>

      <p v-if="message" class="info-message">{{ message }}</p>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      message: "",
    };
  },
  methods: {
    async sendResetEmail() {
      try {
        const response = await axios.post("https://api.hope52411.tech/auth/forgot-password", { email: this.email });
        this.message = "If this email is registered, you will receive a reset link.";
      } catch (error) {
        this.message = "Error sending reset email. Please try again.";
      }
    },
    backToLogin() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
/* Fullscreen background */
#bgimg {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/bgimg.png") no-repeat center center/cover;
}

/* Form container */
.forgot-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 80%;
  max-width: 300px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

/* Title style */
.forgot_title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

/* Button style */
.forgot-btn {
  width: 100%;
  background: linear-gradient(45deg, #45484d, #8e9398);
  border: none;
  font-size: 16px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s;
  color: white;
}

.forgot-btn:hover {
  background: linear-gradient(45deg, #8e9398, #45484d);
  transform: scale(1.05);
}

/* Footer style */
.forgot-footer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

/* Info message style */
.info-message {
  text-align: center;
  color: #606266;
  margin-top: 10px;
  font-size: 14px;
}

/* Input field style */
.el-input__inner {
  border-radius: 8px;
  height: 40px;
  font-size: 14px;
}
</style>
