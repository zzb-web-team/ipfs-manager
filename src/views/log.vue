<template>
  <div class="Login">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <div class="title">IPFS后台管理系统</div>
      <p style="text-align: left;margin: -10px 0 30px 0;color: #A9A9A9;">
        Welcome欢迎登录
      </p>
      <div style="border-bottom: 2px solid #ccc;padding: 10px 0;margin:20px 0;">
        <el-form-item
          prop="account"
          style="display:flex; margin-bottom: 0;"
          class="log_input"
        >
          <img
            src="../assets/img/user.png"
            alt
            style="width:10%;display: inline-block; vertical-align: middle;"
          />
          <el-input
            type="text"
            v-model="ruleForm2.account"
            auto-complete="off"
            placeholder="请输入账号"
            class="login-form-input"
          ></el-input>
        </el-form-item>
      </div>
      <div style="border-bottom: 2px solid #ccc;padding: 10px 0;margin:20px 0;">
        <el-form-item
          prop="checkPass"
          style="display:flex; margin-bottom: 0;"
          class="log_input"
        >
          <img
            src="../assets/img/pwd.png"
            alt
            style="width:10%;display: inline-block; vertical-align: middle;"
          />
          <el-input
            type="password"
            v-model="ruleForm2.checkPass"
            auto-complete="off"
            placeholder="请输入密码"
            class="login-form-input"
          ></el-input>
        </el-form-item>
      </div>

      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          round
          style="width:100%;margin-top:50px;"
          size="medium"
          @click.native.prevent="handleSubmit2"
          :loading="logining"
          >登录</el-button
        >
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../servers/api";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
          //{ validator: validaePass }
        ],
        checkPass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  mounted() {
    if (this.$cookies.get("ipfs_id")) {
      this.$router.push({
        path: "/userli"
      });
    }
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          };
          // this.$router.push({
          //   path: "/user"
          // });
          login(loginParams).then(data => {
            this.logining = false;
            if (data.status == 0) {
              sessionStorage.setItem("ipfs_id", JSON.stringify(data.msg.id));
              sessionStorage.setItem(
                "ipfs_user",
                JSON.stringify(data.msg.username)
              );
              this.$cookies.set(
                "ipfs_user",
                data.msg.username,
                7 * 24 * 60 * 60
              );
              this.$cookies.set("ipfs_id", data.msg.id, 7 * 24 * 60 * 60);
              this.$router.push({
                path: "/userli"
              });
            }else if(data.status == -900){} else {
              this.$message({
                message: data.err_msg,
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.Login {
  background: url(../assets/img/login.png);
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  .el-form {
    .el-form-item {
      .el-form-item__content {
        width: 100%;
      }
    }
  }
}

.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  background-clip: padding-box;
  margin: auto;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  position: fixed;
  top: 50%;
  margin-top: -242px;
  right: 15%;
  width: 394px;
  height: 484px;

  .title {
    width: 394px;
    text-align: left;
    height: 92px;
    font-size: 34px;
    font-family: Alibaba PuHuiTi;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 92px;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
