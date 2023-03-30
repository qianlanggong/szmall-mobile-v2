<template>
  <!-- 登录页面+注册页面 -->
  <div class="loginVue">
    <div class="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div class="login">
        <form class="form">
          <label for="chk" aria-hidden="true">登录</label>
          <input
            class="input"
            type="text"
            name="text"
            placeholder="用户账号"
            required=""
          />
          <input
            class="input"
            type="password"
            name="pswd"
            placeholder="用户密码"
            required=""
          />
          <button>登录</button>
        </form>
      </div>

      <div class="register">
        <form class="form">
          <label for="chk" aria-hidden="true">注册</label>
          <input
            class="input"
            type="text"
            name="txt"
            placeholder="用户名"
            required=""
          />
          <input
            class="input"
            type="text"
            name="text"
            placeholder="用户账号"
            required=""
          />
          <input
            class="input"
            type="password"
            name="pswd"
            placeholder="用户密码"
            required=""
          />
          <button>注册</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loginVue",
  data() {
    return {};
  },
  components: {},
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
  width: 100%;
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
