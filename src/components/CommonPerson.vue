<template>
  <div>
    <transition>
      <div class="person" v-show="person">
        <h2>个人信息</h2>
        <img src="../assets/img/user.png" />
        <div class="inputBox">
          <i class="icon">用户名</i>
          <input type="text" required="required" v-model="username" />
        </div>
        <div class="inputBox">
          <i class="icon">密码</i>
          <input type="text" required="required" v-model="password" />
        </div>
        <div class="inputBox">
          <i class="icon">性别</i>
          <el-radio
            v-model="sex"
            label="男"
            class="select"
            style="margin-left: -30px"
            >男</el-radio
          >
          <el-radio v-model="sex" label="女" class="select">女</el-radio>
        </div>
        <div class="inputBox" style="float: left; width: 200px">
          <i class="icon">年龄</i>
          <input type="text" required="required" v-model="age" />
        </div>
        <div
          class="inputBox"
          style="float: left; width: 250px; margin-left: 20px"
        >
          <i class="icon">邮箱</i>
          <input type="text" required="required" v-model="email" />
        </div>
        <div class="inputBox" style="float: left; width: 220px">
          <i class="icon">电话</i>
          <input type="text" required="required" v-model="phone" />
        </div>
        <button @click="closeperson">取消</button>
        <button style="margin-left: 20px" @click="updateperson">修改</button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  props: {},
  data() {
    return {
      id: "",
      username: "",
      password: "",
      sex: "",
      age: "",
      email: "",
      phone: "",
    };
  },
  computed: {
    person() {
      return this.$store.state.person.person;
    },
  },
  methods: {
    closeperson() {
      this.$store.commit("changedialog");
    },
    updateperson() {
      var phonereg = /^1[3456789]\d{9}$/;
      var emailreg =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var passwordreg = /(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)/;
      var numReg = /^[0-9]*$/;
      var numRe = new RegExp(numReg);
      if (this.username == "") {
        this.$message.error("用户名不能为空");
      } else if (this.username.length < 3 || this.username.length > 7) {
        this.$message.error("用户名为3~7个字符");
      } else if (this.password == "") {
        this.$message.error("密码不能为空");
      } else if (this.password.length < 8 || this.password.length > 30) {
        this.$message.error("密码长度应为8~30位字符");
      } else if (!passwordreg.test(this.password)) {
        this.$message.error("密码至少包含两种字符");
      } else if (this.age == "") {
        this.$message.error("年龄不能为空");
      } else if (!numRe.test(this.age)) {
        this.$message.error("请输入数字");
      } else if (this.age.length > 3) {
        this.$message.error("年龄不能超过三位数");
      } else if (this.email == "") {
        this.$message.error("邮箱不能为空");
      } else if (!emailreg.test(this.email)) {
        this.$message.error("请输入正确邮箱格式");
      } else if (this.phone == "") {
        this.$message.error("电话号码不能为空");
      } else if (!phonereg.test(this.phone)) {
        this.$message.error("电话号码格式错误");
      } else {
        axios
          .get("http://127.0.0.1/list/update", {
            params: {
              id: this.id,
              username: this.username,
              password: this.password,
              sex: this.sex,
              age: this.age,
              email: this.email,
              phone: this.phone,
            },
          })
          .then((res) => {
            if (res.data.status == 200) {
              this.$store.commit("changedialog");
            } else {
              this.$message({
                message: "修改失败",
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log("操作失败" + err);
          });
      }
    },
  },
  mounted() {
    this.username = this.$store.state.user.username;
    axios
      .get("http://127.0.0.1/list/get", {
        params: {
          username: this.username,
        },
      })
      .then((res) => {
        this.id = res.data[0].id;
        this.sex = res.data[0].sex;
        this.email = res.data[0].email;
        this.phone = res.data[0].phone;
        this.password = res.data[0].password;
        this.age = res.data[0].age;
      })
      .catch((err) => {
        console.log("操作失败" + err);
      });
  },
};
</script>
<style lang="css" scoped>
.person {
  border-radius: 50px;
  height: 450px;
  width: 600px;
  position: absolute;
  top: 50px;
  left: 200px;
  background: rgba(0, 0, 0, 0.7);
}
@keyframes come {
  from {
    transform: translateY(-600px);
  }
  to {
    transform: translateY(0px);
  }
}
.v-enter-active {
  animation: come 1s;
}
.v-leave-active {
  animation: come 1s reverse;
}
h2 {
  color: white;
  margin-left: 250px;
}
img {
  height: 150px;
  width: 150px;
  margin-left: 60px;
  float: left;
  border-radius: 50px;
  margin-right: 20px;
  margin-top: 10px;
}
.inputBox {
  display: flex;
  /* position: relative; */
  width: 300px;
  margin-left: 60px;
  margin-bottom: 8px;
}
.inputBox .icon {
  width: 80px;
  line-height: 50px;
  color: white;
  margin-right: 10px;
}
.inputBox input {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  border-top: none;
  border-left: none;
  border-right: none;
  /* border: none; */
  background: rgba(5, 73, 100, 0);
  /* border-radius: 5px; */
  outline: none;
  color: white;
  font-size: 20px;
  transition: 0.3s;
}
.inputBox input:valid,
.inputBox input:focus {
  border-bottom: 1px solid #50c9c3;
}
.select {
  color: rgba(255, 255, 255, 0.5);
  margin-top: 15px;
}
button {
  margin-top: 90px;
  margin-left: 70px;
  width: 100px;
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
</style>