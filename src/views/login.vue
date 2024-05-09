<template>
  <div class="login">
    <el-form
      ref="loginRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title"><i class="icon-logo"></i>互联网医院管理系统</h3>
      <div class="form-item-box">
        <h5 class="sub_title">账号登录</h5>
        <el-form-item prop="username" class="input-item">
          <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            auto-complete="off"
            clearable
            placeholder="账号"
          >
            <template #prefix
              ><svg-icon icon-class="user" class="el-input__icon input-icon"
            /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="input-item">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="密码"
            show-password
            @keyup.enter="handleLogin"
          >
            <template #prefix
              ><svg-icon
                icon-class="password"
                class="el-input__icon input-icon"
            /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaEnabled">
          <el-input
            v-model="loginForm.code"
            size="large"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter="handleLogin"
          >
            <template #prefix
              ><svg-icon
                icon-class="validCode"
                class="el-input__icon input-icon"
            /></template>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item>
        <el-checkbox
          v-model="loginForm.rememberMe"
          style="margin: 0px 0px 25px 0px"
          >下次自动登录</el-checkbox
        >
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            size="large"
            class="liner-btn"
            style="width: 100%; height: 66px;font-size:16px;"
            @click.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div style="float: right" v-if="register">
            <router-link class="link-type" :to="'/register'"
              >立即注册</router-link
            >
          </div>
        </el-form-item>
      </div>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2024 All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUserStore from "@/store/modules/user";
import usePermissionStore from '@/store/modules/permission'

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const loginForm = ref({
  username: "admin",
  password: "111111",
  rememberMe: false,
  code: "",
  uuid: "",
});

const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }],
};

const codeUrl = ref("");
const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(false);
// 注册开关
const register = ref(false);
const redirect = ref(undefined);
watch(
  route,
  (newRoute) => {
    // redirect.value = newRoute.query && newRoute.query.redirect;
    redirect.value = "/doctor/mytask";
  },
  { immediate: true }
);
function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 });
        Cookies.set("password", encrypt(loginForm.value.password), {
          expires: 30,
        });
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
      } else {
        // 否则移除
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {

          setTimeout(() => {
            useUserStore()
              .getInfo()
              .then(() => {
                // router.push({ path: "/doctor/mytask" });
                usePermissionStore().generateRoutes().then(accessRoutes => {
                  // 根据roles权限生成可访问的路由表
                  accessRoutes.forEach(route => {
                    if (!isHttp(route.path)) {
                      router.addRoute(route) // 动态添加可访问路由表
                    }
                  })
                })
          router.push({ path: redirect.value || "/" });
              });
          }, 500);
        })
        .catch(() => {
          loading.value = false;
          // 重新获取验证码
          if (captchaEnabled.value) {
            getCode();
          }
        });
    }
  });
}

function getCode() {
  getCodeImg().then((res) => {
    captchaEnabled.value =
      res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.value.uuid = res.uuid;
    }
  });
}

function getCookie() {
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  const rememberMe = Cookies.get("rememberMe");
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password:
      password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
  };
}

// getCode();
getCookie();
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/images/login-bg.png");
  background-size: cover;
}
.title {
  display: flex;
  color: #121212;
  line-height: 40px;
  text-align: center;
  font-size: 28px;
  margin: 0px auto;
  padding: 40px 0;
  justify-content: center;
  border-bottom: 1px solid #dddddd;
  .icon-logo {
    display: block;
    width: 40px;
    height: 40px;
    background: url("../assets/images/logo.png");
    background-size: cover;
  }
}

.login-form {
  border-radius: 24px;
  background: #ffffff;
  width: 556px;
  height: 526px;
  padding: 0;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
.form-item-box {
  padding: 0 30px;
}
.sub_title {
  margin-top: 30px;
  font-weight: bold;
  font-size: 18px;
  color: #121212;
}
.input-item {
  padding: 12px 0;
  background: #f9f9f9;
  border-radius: 8px;
}
:deep(.el-input__wrapper) {
  background: transparent;
  box-shadow: none;
}
:deep(.el-input__wrapper input) {
  border: 0;
  outline: none;
}
</style>
