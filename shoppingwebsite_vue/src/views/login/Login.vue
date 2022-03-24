<template>
  <div class="login-box">
    <h2 class="login-title">欢迎登陆</h2>
    <el-form :model="form" ref="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click.native="loginClick('form')">立即登陆</el-button>
        <el-button @click.native="registerClick">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        phone: "",
        password: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "手机号需为 11 位",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    loginClick(form) {
      this.$refs[form].validate((valid) => {
        var vm = this
        if(valid) {
          const {phone, password} = vm.form
          vm.$store.dispatch('userLogin', { phone, password })
          .then(res => {
            this.$message.success('登录成功')
            this.$router.push('/home')
          }).catch((res) => {
            console.log(res)
            this.$message.error(res.message)
          })
        }
      })
    },
    registerClick() {
      this.$router.push('/register')
    }
  },
};
</script>

<style scoped>
.login-box {
  width: 360px;
  height: 300px;
  border: 1px solid #dcdfe6;
  margin: 80px auto;
  padding: 20px 50px 20px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.1);
}
.login-title {
  text-align: center;
  color: #303133;
  margin-bottom: 40px;
}
</style>