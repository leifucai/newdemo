<template>
  <div class="bg">
    <div class="login">
      <h2>LOGIN</h2>
      <div class="inputBox">
        <i class="el-icon-user icon"></i>
        <input type="text" required="required" v-model="username" />
        <span>username</span>
      </div>
      <div class="inputBox">
        <i class="el-icon-lock icon"></i>
        <input type="password" required="required" v-model="password" />
        <span>password</span>
      </div>
      <button @click="login">登录</button>
      <b @click="toregister">前往注册</b>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username == "") {
        this.$message.error("用户名不能为空");
      } else if (this.password == "") {
        this.$message.error("密码不能为空");
      } else {
        axios
          .post("http://127.0.0.1/login", {
            params: {
              username: this.username,
              password: this.password,
            },
          })
          .then((res) => {
            if (res.data.status == 200) {
              // sessionStorage.setItem('username', this.username)
              this.$store.commit('getusername',this.username)
              sessionStorage.setItem("token", this.token);
              this.$router.push("/main");
            } else {
              this.$alert("用户名或密码错误", "登录失败", {
                confirmButtonText: "确定",
                callback: (action) => {
                  (this.username = ""), (this.password = "");
                },
              });
            }
          })
          .catch((err) => {
            console.log("登录失败" + err);
          });
      }
    },
    toregister() {
      this.$router.push("./register");
    },
  },
};
</script>
<style lang="css" scoped>
.bg {
  height: 100vh;
  width: 100vw;
  background: url("../../assets/img/login.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
}
.login {
  height: 350px;
  width: 500px;
  background: rgba(0, 0, 0, 0.6);
  /* border: 1px solid skyblue; */
  position: absolute;
  top: 20vh;
  left: 32vw;
  border-radius: 20px;
  /* backdrop-filter: blur(10px);  */
  /* border:1px solid rgba(255, 255, 255, 0.3) */
}
h2 {
  color: white;
  margin-left: 220px;
}
.inputBox {
  display: flex;
  position: relative;
  width: 300px;
  margin-left: 100px;
  margin-bottom: 20px;
}
.inputBox .icon {
  line-height: 50px;
  color: white;
  font-size: 20px;
  margin-right: 10px;
}
.inputBox input {
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  border-top: none;
  border-left: none;
  border-right: none;
  /* border: none; */
  background: rgba(5, 73, 100, 0);
  /* border-radius: 5px; */
  outline: none;
  color: white;
  font-size: 1em;
  transition: 0.3s;
}
.inputBox span {
  position: absolute;
  left: 35px;
  top: 15px;
  pointer-events: none;
  font-size: 1em;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  transition: 0.3s;
}
.inputBox input:valid ~ span,
.inputBox input:focus ~ span {
  color: #50c9c3;
  transform: translateX(15px) translateY(-21px);
  font-size: 0.65em;
  padding: 0 5px;
  background: rgba(5, 73, 100, 0);
  letter-spacing: 0.1em;
}
.inputBox input:valid,
.inputBox input:focus {
  border-bottom: 1px solid #50c9c3;
}
button {
  margin-top: 20px;
  margin-left: 120px;
  width: 50%;
  height: 30px;
  border-radius: 20px;
  border: 0;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  background: linear-gradient(to right, #30cfd0, #330867);
  cursor: pointer;
}
b {
  color: white;
  font-weight: 100;
  position: absolute;
  top: 310px;
  left: 410px;
  cursor: pointer;
}
</style>