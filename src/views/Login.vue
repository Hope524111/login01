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
      this.axios.post("https://api.hooopex.com/sys-user/login", this.loginForm, {
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
/* Full screen background */
#bgimg {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      135deg,
      rgba(26, 26, 46, 0.85) 0%,
      rgba(37, 37, 58, 0.85) 50%,
      rgba(26, 26, 46, 0.9) 100%
    ),
    url("~@/assets/bgimg.png") no-repeat center center/cover;
}

/* Login form container */
.login-container {
  width: 90%;
  max-width: 380px;
  padding: 40px 35px;
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.login-container:hover {
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-glow-lg);
}

/* Login title */
.login_title {
  text-align: center;
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-xl);
  letter-spacing: -0.5px;
}

/* Form items spacing */
.login-container .el-form-item {
  margin-bottom: var(--space-lg);
}

/* Login button */
.login-btn {
  width: 100%;
  background: var(--gradient-primary);
  border: none;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  padding: 14px;
  border-radius: var(--radius-sm);
  color: white;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-glow);
  margin-top: var(--space-sm);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-lg);
}

.login-btn:active {
  transform: translateY(0) scale(0.98);
}

/* Footer links */
.login-footer {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-lg);
}

.login-footer .el-button {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
}

.login-footer .el-button:hover {
  color: var(--color-primary);
}

/* Input icon colors */
.el-icon-user,
.el-icon-lock {
  color: var(--color-primary);
}

/* Responsive */
@media (max-width: 480px) {
  .login-container {
    padding: 30px 25px;
    margin: 20px;
  }

  .login_title {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-lg);
  }

  .login-btn {
    padding: 12px;
  }
}
</style>
