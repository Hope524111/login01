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
          this.axios.post("https://api.hope52411.tech/sys-user/register", this.ruleForm)
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
/* Fullscreen background */
#bgimg {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/bgimg.png") no-repeat center center/cover;
}

/* Register form container styling */
.register-container {
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

/* Title styling */
.register_title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

/* Register button */
.register-btn {
  width: 100%;
  background: linear-gradient(45deg, #45484d, #8e9398);
  border: none;
  font-size: 16px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s;
  color: white;
}

.register-btn:hover {
  background: linear-gradient(45deg, #8e9398, #45484d);
  transform: scale(1.05);
}

/* Input field styling */
.el-input__inner {
  border-radius: 8px;
  height: 40px;
  font-size: 14px;
}

/* Select box styling */
.el-select {
  width: 100%;
}

/* Footer section */
.register-footer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
