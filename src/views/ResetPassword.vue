<template>
  <div id="bgimg">
    <div id="poster">
      <el-form class="reset-container" label-position="left" label-width="0px">
        <h3 class="reset-title">Reset Password</h3>

        <el-form-item>
          <el-input
            v-model="newPassword"
            type="password"
            autocomplete="off"
            placeholder="Enter new password"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="confirmPassword"
            type="password"
            autocomplete="off"
            placeholder="Confirm new password"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            class="reset-btn"
            type="primary"
            :loading="loading"
            @click="resetPassword"
          >
            Reset Password
          </el-button>
        </el-form-item>

        <div class="reset-footer">
          <el-button type="text" @click="backToLogin">Back to Login</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      token: "",
      loading: false,
    };
  },
  mounted() {
    const token = new URLSearchParams(window.location.search).get("token");
    this.token = token;
    console.log("✅ Extracted token:", this.token);
  },
  methods: {
    async resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.$message.error("Passwords do not match!");
        return;
      }

      this.loading = true;

      try {
        const response = await axios.post(
          "https://api.hope52411.tech/auth/reset-password",
          {
            token: this.token,
            newPassword: this.newPassword,
          }
        );

        this.$message({
          message: "🎉 Password reset successful! Redirecting to login...",
          type: "success",
        });

        setTimeout(() => {
          this.backToLogin();
        }, 2000);
      } catch (error) {
        console.error("❌ Reset Password Error:", error.response);
        let errorMsg =
          error.response?.data?.message || "Failed to reset password. Please try again.";

        this.$message.error(errorMsg);
      } finally {
        this.loading = false;
      }
    },
    backToLogin() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
#bgimg {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/bgimg.png") no-repeat center center/cover;
}

#poster {
  background-position: center;
  width: 100%;
  max-width: 350px;
  padding: 35px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 0 25px #cac6c6;
}

.reset-container {
  width: 100%;
}

.reset-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

.reset-btn {
  width: 100%;
  background: linear-gradient(45deg, #45484d, #8e9398);
  border: none;
  font-size: 16px;
  padding: 12px;
  border-radius: 8px;
  color: white;
  transition: all 0.3s;
}

.reset-btn:hover {
  background: linear-gradient(45deg, #8e9398, #45484d);
  transform: scale(1.05);
}

.reset-footer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>