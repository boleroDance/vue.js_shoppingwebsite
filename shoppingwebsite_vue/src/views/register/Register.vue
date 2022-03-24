<template>
  <div class="register-box">
    
    <!-- <div class="message">
      <el-alert
    title="注册成功"
    type="success"
    center="true"
    effect="light"
    v-if="isregistered"
    >
  </el-alert>

  <el-alert
    title="手机号已被注册"
    type="error"
    center="true"
    effect="light"
    v-else>
  </el-alert>
  </div> -->

    <h2 class="register-title">欢迎注册</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="sendCode()">获取验证码</el-button>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="userRegister('ruleForm')">注册</el-button>
       </el-form-item>
    </el-form>

  
  </div>
  
</template>

<script>
import { requestUserRegister } from '../../network/user'
export default {
  data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value*1)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value > 99999999999) {
              callback(new Error('请输入正确的电话号码'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkCode = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('验证码不能为空'));
        }
      }
      return {
        isregistered: false,
        ruleForm: {
          password: '',
          checkPass: '',
          phone: '',
          code: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ],
        }
      };
    },
    
    methods: {
      //发送验证码
      // sendCode(form) {
      //   this.$refs[form].validate((valid) => {
      //     const vm = this
      //     const phone = this.ruleForm.phone
      //     if(valid) {
      //       console.log('valid')
      //       vm.$store.dispatch('getCode', phone)
      //       // 这里因为后台没有真正发送给用户，所以直接把code自动填入，真实开发情况下不是这样的~
      //       vm.ruleF.orm.code = vm.$store.state.code
      //     }
      //   })
      // },
      
      // 发送验证码
      sendCode() {
        const phone = this.ruleForm.phone
        this.$store.dispatch('getCode', phone)
        this.ruleForm.code = this.$store.state.code
      },
      // 用户注册
      userRegister(form) {
        this.$refs[form].validate((valid) => {
          const vm = this
          const {phone, code, password} = this.ruleForm
          if(valid) {
            console.log(phone, code, password)
            vm.$store.dispatch('userRegister', {phone, code, password})
            .then(res => {
              // console.log(res)
              if(res.code == 200) {
                this.$message.success('注册成功')
                this.$router.push('/login')
              }else {
                this.$message.error(res.message)
              }
            })
            
          }
        })
      }
      
    }
}
</script>

<style scoped>
  .register-box {
    width: 360px;
    height: 490px;
    border: 1px solid #dcdfe6;
    margin: 60px auto;
    padding: 20px 50px 20px 30px;
    border-radius: 10px;
    box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.1);
  }
  .register-title {
  padding-top:30px;
  text-align: center;
  color: #303133;
  margin-bottom: 40px;
}
.message {
  position: absolute;
  left: 120px;
  top:20px
}
</style>