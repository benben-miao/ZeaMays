<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avater_box">
        <img src="https://pic.downk.cc/item/5e833ab3504f4bcb043cd472.png" />
      </div>

      <el-form
        label-width="80px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <el-form-item label="UserName" prop="username">
          <el-input suffix-icon="el-icon-user" placeholder="Name" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Passwords" prop="password">
          <el-input show-password placeholder="Password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">Login</el-button>
          <el-button type="info" @click="resetLoginForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: 'Please input username',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '5-20 characters',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '5-20 numeric or characters'
          }
        ]
      },
      token: 'tokentokentoken'
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      if (this.loginForm.username === 'admin' && this.loginForm.password === 'admin') {
        this.$message.success('Successful')
        window.sessionStorage.setItem('token', this.token)
        this.$router.push('/home')
      } else {
        this.$message.error('Error')
      }
    }
  }
}
</script>

<style scoped>
.login_container {
  background-color: #fff;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 20px #ddd;
}
.avater_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0px 0px 10px #eee;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
