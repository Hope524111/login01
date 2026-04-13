<template>
  <div id="bgimg">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="register-container" label-position="left"
      label-width="0px">

      <h3 class="register_title">Register</h3>

      <el-form-item prop="loginName">
        <el-input v-model="ruleForm.loginName" autocomplete="off" placeholder="Username">
          <template #prefix>
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" type="email" autocomplete="off" placeholder="Email">
          <template #prefix>
            <i class="el-icon-message"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="Password">
          <template #prefix>
            <i class="el-icon-lock"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="Confirm Password">
          <template #prefix>
            <i class="el-icon-lock"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item style="width: 100%;">
        <el-button class="register-btn" @click="submitForm">Register</el-button>
      </el-form-item>

      <div class="register-footer">
        <el-button type="text" @click="toLogin">Already have an account? Login</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        loginName: "",
        password: "",
        email: "",
        checkPass: "",
      },
      rules: {
        loginName: [{ required: true, message: "Please enter a username", trigger: "blur" }],
        email: [
          { required: true, message: "Please enter your Email", trigger: "blur" },
          { type: "email", message: "Please enter a valid Email", trigger: ["blur", "change"] },
        ],
        password: [
          { required: true, message: "Please enter a password", trigger: "blur" },
          { min: 6, max: 12, message: "Length should be between 6 and 12 characters", trigger: "blur" },
        ],
        checkPass: [
          { required: true, message: "Please confirm your password", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.password) {
                callback(new Error("Passwords do not match!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.$refs.ruleForm) {
        console.error("ruleForm is undefined!");
        return;
      }

      // Validate the form before submitting
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // Send registration request to backend API
          this.axios.post("https://api.hooopex.com/sys-user/register", this.ruleForm)
            .then((resp) => {
              let data = resp.data;
              if (data.success) {
                this.$message({ message: "Registration successful!", type: "success" });
                this.$refs.ruleForm.resetFields(); // Reset form fields
              } else {
                this.$message({ message: "The username is already taken, please try again", type: "error" });
              }
            })
            .catch(() => {
              this.$message({ message: "Registration failed, please check your input", type: "error" });
            });
        }
      });
    },
    // Navigate to login page
    toLogin() {
      this.$router.push({ path: "/" });
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

/* Register form container */
.register-container {
  width: 90%;
  max-width: 380px;
  padding: 40px 35px 20px;
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.register-container:hover {
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-glow-lg);
}

/* Register title */
.register_title {
  text-align: center;
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-xl);
  letter-spacing: -0.5px;
}

/* Form items spacing */
.register-container .el-form-item {
  margin-bottom: var(--space-lg);
}

/* Register button */
.register-btn {
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

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-lg);
}

.register-btn:active {
  transform: translateY(0) scale(0.98);
}

/* Footer section */
.register-footer {
  display: flex;
  justify-content: center;
  margin-top: var(--space-lg);
}

.register-footer .el-button {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
}

.register-footer .el-button:hover {
  color: var(--color-primary);
}

/* Input icon colors */
.el-icon-user,
.el-icon-message,
.el-icon-lock {
  color: var(--color-primary);
}

/* Responsive */
@media (max-width: 480px) {
  .register-container {
    padding: 30px 25px 15px;
    margin: 20px;
  }

  .register_title {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-lg);
  }

  .register-btn {
    padding: 12px;
  }
}
</style>
