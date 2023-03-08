<template>
  <div class="login">
    <div class="shade"></div>
    <div class="fl-main">
      <div class="fl-content">
        <div class="fl-form">
          <div class="fl-header">
            <div class="fl-logo"></div>
          </div>
          <span class="fl-title">后台管理系统</span>
          <el-form
            :model="loginData"
            status-icon
            :rules="rules"
            ref="loginData"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label-width="0" prop="account">
              <el-input
                v-model="loginData.account"
                placeholder="请输入账号"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="password">
              <el-input
                type="password"
                v-model="loginData.password"
                placeholder="请输入密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="fl-image"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import store from "@/store";
import throttle from "@/util/util";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    var checkAccount = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginData: { account: "admin", password: "admin" },
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$store.state.user.history) {
      this.loginData.account = this.$store.state.user.account;
      this.loginData.password = this.$store.state.user.password;
    }
  },
  mounted() {
    window.addEventListener("load", () => {
      if (this.$store.state.user.history) {
        this.loginData.account = this.$store.state.user.account;
        this.loginData.password = this.$store.state.user.password;
      }
    });
  },
  watch: {
    $route() {
      this.$router.go(0);
    },
  },
  methods: {
    submitForm(formName) {
      this.$message({
        message: "登录成功",
        type: "success",
      });
      this.$store.state.isLogin = true;
      this.$router.replace("/home");
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$apiFun.login({phone:this.loginData.account,password:this.loginData.password}).then( res => {
      //       if(res.data.code == 200) {

      //       } else {
      //         this.$message.error(res.data.message)
      //       }
      //     });

      //   } else {
      //     this.$message.error('表单信息未填写完整');
      //     return false;
      //   }
      // });
    },
    login() {
      throttle(this.submitForm("loginData"), 1000);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
/** css变量 */

/** 默认标签样式 */
html,
body {
  height: 100%;
}

/** 组件样式 */
.demo-ruleForm {
  position: relative;
  top: -1rem;
  margin: 0 auto;
  width: 80%;
}
.el-button,
.el-button:focus {
  width: 100%;
  background: #0eb0c9;
  color: #fff;
  font-size: 1.6rem;
  border: 0;
}
.el-button:hover {
  background: #0eb0c9bf;
  color: #fff;
}

/** 布局样式 */
#app {
  height: 100%;
}
.login {
  position: absolute;
  height: 100%;
  width: 100%;
}
.fl-main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("https://volit.oss-cn-guangzhou.aliyuncs.com/image/202212202354828.webp") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.shade {
  position: absolute;
  background: #ffffff1f;
  width: 100%;
  height: 100%;
}
.fl-content {
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: space-between;
  align-items: center;
  width: 76rem;
  height: 40rem;
  background: #fff;
  border: 0.8rem solid #f3f5f4;
  border-radius: 1.2rem;
  text-align: center;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.fl-form {
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 50%;
  padding: 0 2.2rem;
}
.fl-header {
  display: flex;
  flex-flow: row;
  justify-content: center;
}

/** 属性样式 */
.fl-image {
  width: 50%;
  height: 100%;
  background: url("https://volit.oss-cn-guangzhou.aliyuncs.com/image/202212202354828.webp") no-repeat;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
}
.fl-logo {
  box-sizing: border-box;
  width: 8rem;
  height: 8rem;
  background: url("http://volit.top/image/717a81d0-9b5a-47f2-a392-7d028d3d3a69.png");
  background-size: cover;
  background-position: center;
}
.fl-title {
  position: relative;
  top: -2rem;
  line-height: 8rem;
  font-size: 2rem;
  font-weight: 600;
  color: #565656;
}
</style>
