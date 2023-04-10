<template>
  <!-- 登录页面+注册页面 -->
  <div class="loginVue">
    <div class="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div class="login">
        <div class="form">
          <label for="chk" aria-hidden="true">登录</label>
          <input
            class="input"
            type="text"
            name="text"
            placeholder="用户账号"
            required=""
            v-model="username"
          />
          <input
            class="input"
            type="password"
            name="pswd"
            placeholder="用户密码"
            required=""
            v-model="password"
          />
          <button @click="loginEvent">登录</button>
        </div>
      </div>

      <div class="register">
        <form class="form">
          <label for="chk" aria-hidden="true">注册</label>
          <input
            class="input"
            type="text"
            name="txt"
            placeholder="匿称"
            required=""
          />
          <input
            class="input"
            type="text"
            name="text"
            placeholder="用户账号"
            required=""
            v-model="username"
          />
          <input
            class="input"
            type="password"
            name="pswd"
            placeholder="用户密码"
            required=""
            v-model="password"
          />
          <button @click.prevent="registEvent">注册</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import store from "@/store";
export default {
  name: "loginVue",
  data() {
    return {
      //收集账号与密码
      username: "",
      password: "",
    };
  },
  components: {},
  methods: {
    // 登录事件
    async loginEvent() {
      //整理参数
      const { username, password } = this;
      let data = { username, password };
      //在发登录请求
      try {
        //登录成功
        let meg = await store.dispatch("user/login", data);
        let goPath = this.$route.query.redirect || "/home";
        //跳转到被拦截页面
        // localStorage.setItem("TOKEN", new Date().toISOString());
        Toast(meg);
        this.$router.push(goPath);
      } catch (error) {
        //登录失败
        Toast(error.message);
        console.log(error.message);
      }
    },
    // 注册事件
    async registEvent() {
      //整理参数
      const { username, password } = this;
      let data = { username, password };
      //再发注册请求
      try {
        //注册成功
        let meg = await store.dispatch("user/register", data);
        // localStorage.setItem("TOKEN", new Date().toISOString());
        await Toast(meg);
        // 清空账号和密码填写
        this.clear();
        //跳转到登录页面
        // this.$router.go(0);
      } catch (error) {
        // 注册失败
        Toast(error.message);
        console.log(error.message);
      }
    },
    //清空登录时候的账号名和密码
    clear() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>
<style scoped>
.loginVue {
  height: 100%;
  background-color: #240046;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #240046;
  max-height: 520px;
  overflow: hidden;
  border-radius: 12px;
  -webkit-box-shadow: 7px 7px 10px 3px #24004628;
  box-shadow: 7px 7px 10px 3px #24004628;
}
.form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
}

/*checkbox to switch from sign up to login*/
#chk {
  display: none;
}

/*Login*/
.login {
  position: relative;
  width: 100%;
  height: 100%;
}
.login label {
  margin: 25% 0 5%;
}
label {
  color: #fff;
  font-size: 2rem;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-weight: bold;
  cursor: pointer;
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}
.input {
  /* width: 100%; */
  height: 40px;
  background: #e0dede;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 4px;
}

/*Register*/
.register {
  background: #eee;
  border-radius: 60% / 10%;
  -webkit-transform: translateY(5%);
  -ms-transform: translateY(5%);
  transform: translateY(5%);
  -webkit-transition: 0.8s ease-in-out;
  transition: 0.8s ease-in-out;
}
.register label {
  color: #573b8a;
  -webkit-transform: scale(0.6);
  -ms-transform: scale(0.6);
  transform: scale(0.6);
}
#chk:checked ~ .register {
  -webkit-transform: translateY(-60%);
  -ms-transform: translateY(-60%);
  transform: translateY(-60%);
}
#chk:checked ~ .register label {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  margin: 10% 0 5%;
}
#chk:checked ~ .login label {
  -webkit-transform: scale(0.6);
  -ms-transform: scale(0.6);
  transform: scale(0.6);
  margin: 5% 0 5%;
}
/*Button*/
.form button {
  width: 85%;
  height: 40px;
  margin: 12px auto 10%;
  color: #fff;
  background: #573b8a;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  -webkit-transition: 0.2s ease-in;
  transition: 0.2s ease-in;
}
.form button:hover {
  background-color: #6d44b8;
}
</style>
