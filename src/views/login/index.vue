<template>
  <div class="login_wrapper h-screen r w-full">
    <div class="center">
      <div class="ear ear--left"></div>
      <div class="ear ear--right"></div>
      <div class="face" :style="{ '--rotate-head': rotateHead }">
        <div class="eyes">
          <div class="eye eye--left">
            <div class="glow"></div>
          </div>
          <div class="eye eye--right">
            <div class="glow"></div>
          </div>
        </div>
        <div class="nose">
          <svg width="38.161" height="22.03">
            <path
              d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
              fill="#243946"></path>
          </svg>
          <div class="glow"></div>
        </div>
        <div class="mouth">
          <svg class="smile" viewBox="-2 -2 84 23" width="84" height="23">
            <path d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
              fill="none" stroke-width="3" stroke-linecap="square" stroke-miterlimit="3"></path>
          </svg>
          <div class="mouth-hole"></div>
          <div class="tongue breath">
            <div class="tongue-top"></div>
            <div class="line"></div>
            <div class="median"></div>
          </div>
        </div>
      </div>
      <div class="hands">
        <div class="hand hand--left">
          <div class="finger">
            <div class="bone"></div>
            <div class="nail"></div>
          </div>
          <div class="finger">
            <div class="bone"></div>
            <div class="nail"></div>
          </div>
          <div class="finger">
            <div class="bone"></div>
            <div class="nail"></div>
          </div>
        </div>
        <div class="hand hand--right">
          <div class="finger">
            <div class="bone"></div>
            <div class="nail"></div>
          </div>
          <div class="finger">
            <div class="bone"></div>
            <div class="nail"></div>
          </div>
          <div class="finger">
            <div class="bone"></div>
            <div class="nail"></div>
          </div>
        </div>
      </div>
      <el-form ref="refForm" :model="loginForm" :rules="rules" status-icon>
        <el-form-item prop="username">
          <el-input v-model.trim="loginForm.username" class="w-full username" placeholder="用户名" @blur="usernameBlur"
            @focus="usernameFocus">
            <template #prefix>
              <el-icon class="text-lg">
                <span class="iconify el-icon" data-icon="ep:user"></span>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="loginForm.password" :type="isShowPassword ? 'text' : 'password'" class="w-full password"
            placeholder="密码" @focus="passwordFocus" @blur="passwordBlur">
            <template #prefix>
              <el-icon class="text-lg">
                <span class="iconify el-icon" data-icon="ep:lock" class-name="disable"></span>
              </el-icon>
            </template>
            <template #suffix>

              <svg-icon :icon-class="isShowPassword ? 'eye' : 'eye-open'" class-name="absolute right-2"
                @click="handleHiddenPassword" />

            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="sub-btn" type="primary" @click="submitForm(refForm)">登录</el-button>
          <el-button @click="resetForm(refForm)">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="social-buttons">
        <div class="social">
          <el-icon>
            <svg-icon icon-class="mdisinaweibo" class-name="disable"></svg-icon>
          </el-icon>
        </div>
        <div class="social">
          <el-icon>
            <svg-icon icon-class="wechat" class-name="disable"></svg-icon>
          </el-icon>
        </div>
        <div class="social">
          <el-icon>
            <svg-icon icon-class="mdipaw" class-name="disable"></svg-icon>
          </el-icon>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
// import { login } from "@/api/user";
import type { FormInstance, FormRules } from "element-plus";
import { useRoute, useRouter } from "vue-router";
// import { useUserStore } from "@/store/user";
import { useStore } from "@/store";

const $route = useRoute();
const $router = useRouter();
// const user = useUserStore();
const store = useStore()
const refForm = ref<FormInstance>();
const loginForm = reactive({
  username: "admin",
  password: "1111111",
});
const isShowPassword = ref(false);
const rotateHead = ref("0deg");

watch([() => loginForm.username], ([nw]) => {
  let length = Math.min(nw.length - 16, 19);
  rotateHead.value = `${-length}deg`;
});
onMounted(async () => { });

const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 13, message: "密码长度6-13位", trigger: "blur" },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // user
      store.user
        .login(loginForm)
        .then(() => {
          const query = $route.query;
          $router.push({ path: (query.redirect as string) || "/", query: getOtherQuery(query) });
        })
        .catch((err: any) => {
          alert(err || err.message);
        });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const passwordFocus = () => {
  document.querySelectorAll(".hand").forEach((hand) => {
    hand.classList.add("hide");
  });
  document.querySelector(".tongue")?.classList.remove("breath");
};

const passwordBlur = () => {
  document.querySelectorAll(".hand").forEach((hand) => {
    hand.classList.remove("hide");
    hand.classList.remove("peek");
  });
  document.querySelector(".tongue")?.classList.add("breath");
};
const usernameFocus = () => {
  document.querySelectorAll(".hand").forEach((hand) => {
    hand.classList.remove("hide");
    hand.classList.remove("peek");
  });
};
const usernameBlur = (event: Event) => {
  rotateHead.value = "0deg";
};
const handleHiddenPassword = () => {
  isShowPassword.value = !isShowPassword.value;
  if (isShowPassword.value) {
    document.querySelectorAll(".hand").forEach((hand) => {
      hand.classList.remove("hide");
      hand.classList.add("peek");
    });
  } else {
    document.querySelectorAll(".hand").forEach((hand) => {
      hand.classList.remove("peek");
      hand.classList.add("hide");
    });
  }
};
function getOtherQuery(query: { [key: string]: any }) {
  return Object.keys(query).reduce((acc: { [key: string]: any }, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}
</script>

<style lang="scss" scoped>
.login_wrapper {
  background: linear-gradient(45deg, #dcda35c4, #ed3232ba);
}

.el-form {
  margin-top: 20px;
  padding: 0 50px;
  width: 100%;

  :deep(.el-input__suffix) {
    color: #14cc4f;

    .el-input__validateIcon {
      margin-right: -29px;
    }
  }

  .el-form-item+.el-form-item {
    margin: 32px 0;
  }

  .sub-btn {
    background-color: #409eff;
    margin: 0 15%;
  }
}

////////////////////////////////////////////////////////////////
///
.inspiration {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-family: "Gill Sans", sans-serif;
  font-size: 12px;
  color: #969696;
}

.inspiration img {
  width: 60px;
}

.center {
  position: relative;
  top: 50%;
  left: 50%;
  // display: inline-block;
  width: 400px;

  // height: 490px;
  border-radius: 3px;

  transform: translate(-50%, -50%);
  overflow: hidden;
  background-image: linear-gradient(to top right, #f9a743, #f9db5f);
}

@media screen and (max-height: 500px) {
  .center {
    transition: transform 0.5s;
    transform: translate(-50%, -50%) scale(0.8);
  }
}

.center .ear {
  position: absolute;
  top: -90px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #243946;
}

.center .ear.ear--left {
  left: -120px;
}

.center .ear.ear--right {
  right: -120px;
}

.center .face {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 150px;
  margin: 80px auto 10px;
  --rotate-head: 0deg;
  transform: rotate(var(--rotate-head));
  transition: transform 0.2s;
  transform-origin: center 20px;
}

.center .eye {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #243946;
}

.center .eye.eye--left {
  margin-right: 40px;
}

.center .eye.eye--right {
  margin-left: 40px;
}

.center .eye .glow {
  position: relative;
  top: 3px;
  right: -12px;
  width: 12px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
  transform: rotate(38deg);
}

.center .nose {
  position: relative;
  top: 30px;
  transform: scale(1.1);
}

.center .nose .glow {
  position: absolute;
  top: 3px;
  left: 32%;
  width: 15px;
  height: 8px;
  border-radius: 50%;
  background-color: #476375;
}

.center .mouth {
  position: relative;
  margin-top: 45px;
}

.center svg.smile {
  position: absolute;
  left: -28px;
  top: -19px;
  transform: scaleX(1.1);
  stroke: #243946;
}

.center .mouth-hole {
  position: absolute;
  top: 0;
  left: -50%;
  width: 60px;
  height: 15px;
  border-radius: 50%/100% 100% 0% 0;
  transform: rotate(180deg);
  background-color: #243946;
  z-index: -1;
}

.center .tongue {
  position: relative;
  top: 5px;
  width: 30px;
  height: 20px;
  background-color: #ffd7dd;
  transform-origin: top;
  transform: rotateX(60deg);
}

.center .tongue.breath {
  -webkit-animation: breath 0.3s infinite linear;
  animation: breath 0.3s infinite linear;
}

.center .tongue-top {
  position: absolute;
  bottom: -15px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #ffd7dd;
}

.center .line {
  position: absolute;
  top: 0;
  width: 30px;
  height: 5px;
  background-color: #fcb7bf;
}

.center .median {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 25px;
  border-radius: 5px;
  background-color: #fcb7bf;
}

.center .hands {
  position: relative;
  margin-left: 61px;
}

.center .hands .hand {
  position: absolute;
  top: -6px;
  display: flex;
  transition: transform 0.5s ease-in-out;
  z-index: 1;
}

.center .hands .hand--left {
  left: 54px;
}

.center .hands .hand--left.hide {
  transform: translate(2px, -155px) rotate(-160deg);
}

.center .hands .hand--left.peek {
  transform: translate(0px, -120px) rotate(-160deg);
}

.center .hands .hand--right {
  left: 167px;
}

.center .hands .hand--right.hide {
  transform: translate(-6px, -155px) rotate(160deg);
}

.center .hands .hand--right.peek {
  transform: translate(-4px, -120px) rotate(160deg);
}

.center .hands .finger {
  position: relative;
  z-index: 0;
}

.center .hands .finger .bone {
  width: 20px;
  height: 25px;
  border: 2px solid #243946;
  border-bottom: none;
  border-top: none;
  background-color: #fac555;
}

.center .hands .finger .nail {
  position: absolute;
  left: 0;
  top: 15px;
  width: 20px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #243946;
  background-color: #fac555;
  z-index: -1;
}

.center .hands .finger:nth-child(1),
.center .hands .finger:nth-child(3) {
  left: 4px;
  z-index: 1;
}

.center .hands .finger:nth-child(1) .bone,
.center .hands .finger:nth-child(3) .bone {
  height: 10px;
}

.center .hands .finger:nth-child(3) {
  left: -4px;
}

.center .hands .finger:nth-child(2) {
  top: -5px;
  z-index: 2;
}

.center .hands .finger:nth-child(1) .nail,
.center .hands .finger:nth-child(3) .nail {
  top: 0px;
}

.center .login {
  position: relative;
  display: flex;
  flex-direction: column;
}

.center .login label {
  position: relative;
  padding: 0 20px;
}

.center .login label .fa {
  position: absolute;
  top: 40%;
  left: 35px;
  color: #bbb;
}

.center .login label .fa:before {
  position: relative;
  left: 1px;
}

.center .login input,
.center .login .login-button {
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 30px;
}

.center .login input {
  padding: 0 20px 0 40px;
  margin: 5px 0;
  box-shadow: none;
  outline: none;
}

.center .login input::-moz-placeholder {
  color: #ccc;
}

.center .login input:-ms-input-placeholder {
  color: #ccc;
}

.center .login input::placeholder {
  color: #ccc;
}

.center .login input.password {
  padding: 0 90px 0 40px;
}

.center .login .password-button {
  position: absolute;
  top: 9px;
  right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 27px;
  border-radius: 30px;
  border: none;
  outline: none;
  background-color: #243946;
  color: #fff;
}

.center .login .password-button:active {
  transform: scale(0.95);
}

.center .login .login-button {
  width: calc(100% - 40px);
  margin: 20px 20px 0;
  outline: none;
  background-color: #243946;
  color: #fff;
  transition: transform 0.1s;
}

.center .login .login-button:active {
  transform: scale(0.95);
}

.center .social-buttons {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.center .social-buttons .social {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  margin: 0 10px;
  border-radius: 50%;
  background-color: #243946;
  color: #fff;
  font-size: 24px;
}

.center .social-buttons .social:active {
  transform: scale(0.95);
}

.center .footer {
  text-align: center;
  margin-top: 15px;
}

@-webkit-keyframes breath {

  0%,
  100% {
    transform: rotateX(0deg);
  }

  50% {
    transform: rotateX(60deg);
  }
}

@keyframes breath {

  0%,
  100% {
    transform: rotateX(0deg);
  }

  50% {
    transform: rotateX(60deg);
  }
}
</style>
