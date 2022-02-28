<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!--表单区域-->

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-jurassic_user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-mima"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitLogin">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { postRequest } from "../utils/api";

export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      // 表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    submitLogin() {
      postRequest("/login", this.loginForm).then((resp) => {
        if (resp.data.code === 1000000) {
          // 登录接口成功
          this.$message.success(resp.data.msg);
          var pageUrl = window.location.href;
          var param = pageUrl.split("?")[1];
          window.location.href = "http://auth.sso.com/auth/oauth/authorize?" + param;
        } else {
          this.$message.error(resp.data.msg);
        }
      });
    },

    // 点击重置按钮 重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};

</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: #537081;
  position: fixed;
  top: 0px;
  left: 0px;
}
.login_box {
  width: 450px;
  height: 300px;
  background: rgb(241, 243, 242);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    padding: 10px;
    width: 130px;
    height: 130;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(235, 228, 204);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
