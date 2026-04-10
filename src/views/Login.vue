<template>
  <div id="bgimg">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">Login</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.loginName" autocomplete="off" placeholder="Username">
          <template #prefix>
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="Password">
          <template #prefix>
            <i class="el-icon-lock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="loginForm.identity" placeholder="Please select identity">
          <el-option label="Ordinary user" value="User"></el-option>
          <el-option label="Administrator" value="Admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-button class="login-btn" @click="Login">Login</el-button>
      </el-form-item>
      <div class="login-footer">
        <el-button type="text" @click="toRegister">Click me to register</el-button>
        <el-button type="text" @click="toForgotPassword">Forgot Password?</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginName: "",
        password: "",
        identity: "",
      },
    };
  },
  methods: {
    Login() {
      // Send login request to backend API
      this.axios.post("https://api.hope52411.tech/sys-user/login", this.loginForm, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((resp) => {
          let data = resp.data;
          if (data.success) {
            // Save user session info to localStorage
            localStorage.setItem("userRole", this.loginForm.loginName === "Admin" ? "Admin" : "User");
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("loginName", this.loginForm.loginName);

            console.log("✅ Login successful, current user:", this.loginForm.loginName);

            this.$message({
              message: `Welcome to home page, ${this.loginForm.loginName}!`,
              type: "success",
              duration: 1500
            });

            // Redirect to different pages based on role
            this.$router.push({ path: this.loginForm.loginName === "Admin" ? "/admin" : "/home" });

          } else {
            this.$message({
              message: data.message || "Login failed, please try again.",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("❌ Login request error:", error);
          this.$message({
            message: "Server error, please try again later.",
            type: "error",
          });
        });
    },
    // Navigate to register page
    toRegister() {
      this.$router.push({ path: "/Register" });
    },
    // Navigate to forgot password page
    toForgotPassword() {
      this.$router.push({ path: "/forgot-password" });
    },
  },
};
</script>

<style scoped>
/* Full screen background with image */
#bgimg {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/bgimg.png") no-repeat center center/cover;
}

/* Login form container styling */
.login-container {
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

/* Login title */
.login_title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

/* Login button */
.login-btn {
  width: 100%;
  background: linear-gradient(45deg, #45484d, #8e9398);
  border: none;
  font-size: 16px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s;
  color: white;
}

.login-btn:hover {
  background: linear-gradient(45deg, #8e9398, #45484d);
  transform: scale(1.05);
}

/* Footer buttons */
.login-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

/* Input field style */
.el-input__inner {
  border-radius: 8px;
  height: 40px;
  font-size: 14px;
}

/* Select box */
.el-select {
  width: 100%;
}

.el-select-dropdown {
  border-radius: 8px;
}
</style>
