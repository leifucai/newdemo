<template>
  <div class="list">
    <!-- 头像 -->
    <img src="../assets/img/user.png" @click="isShow = !isShow" />
    <transition>
      <div class="select" v-show="isShow">
        <div class="el-icon-user selecter" @click="person"></div>
        <div
          class="el-icon-switch-button selecter"
          style="margin-left: 5px"
          @click="exit"
        ></div>
      </div>
    </transition>
    <!-- 列表 -->
    <ul>
      <li style="margin-left: -20px" @click="layer">图层控制</li>
      <li style="margin-left: -20px" @click="print">打印信息</li>
      <li style="margin-left: -20px" @click="legend">图例显示</li>
      <li
        style="width: 100px; margin-left: -20px"
        @click="user"
        v-show="normal"
      >
        用户管理
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  props: {},
  data() {
    return {
      isShow: false,
      normal: "",
      username: "",
    };
  },
  mounted() {
    //判断是否是管理员
    this.username = this.$store.state.user.username;
    axios
      .get("http://127.0.0.1/list/get", {
        params: {
          username: this.username,
        },
      })
      .then((res) => {
        // console.log(res.data[0].jur);
        if (res.data[0].jur == "管理员") {
          this.normal = true;
        } else {
          this.normal = false;
        }
      })
      .catch((err) => {
        console.log("操作失败" + err);
      });
  },
  methods: {
    //退回登录界面
    exit() {
      this.$router.push("/login");
      sessionStorage.clear("token");
      this.$store.commit("closeall");
    },
    //打开个人中心
    person() {
      this.$store.commit("changedialog");
      console.log(this.$store.state.person.person);
    },
    //打开用户列表
    user() {
      this.$store.commit("changeusertable");
    },
    //打开打印信息功能
    print() {
      this.$store.commit("changeprint");
    },
    //打开图层控制功能
    layer() {
      this.$store.commit("changelayer");
    },
    legend() {
      this.$store.commit("changelegend")
    }
  },
};
</script>
<style lang="css" scoped>
@keyframes come {
  from {
    transform: translateX(-100px);
  }
  to {
    transform: translateX(0px);
  }
}
.v-enter-active {
  animation: come 1s;
}
.v-leave-active {
  animation: come 1s reverse;
}
#content {
  height: 100vh;
  margin: 0;
  padding: 0;
}
.list {
  /* box-shadow: 10px 10px 10px 30px rgba(0, 0, 0, 0.5); */
  /* opacity: 0.5; */
  position: absolute;
  height: 100vh;
  width: 120px;
  top: 0;
  left: 0;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}
.list img {
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-left: 25px;
  margin-top: 10px;
  transition: 1s;
  cursor: pointer;
}
.list img:hover {
  transform: scale(1.2);
}
.list .select {
  display: flex;
  height: 60px;
  width: 85px;
  margin-top: 5px;
  margin-left: 12px;
}
.list .select .selecter {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0);
  line-height: 40px;
  text-align: center;
  color: skyblue;
  font-size: 20px;
  border: 1px solid skyblue;
  cursor: pointer;
}
.list .select .selecter:hover {
  background-color: skyblue;
  color: black;
  box-shadow: 0px 0px 2px 2px skyblue;
}
.list ul {
  position: absolute;
  top: 200px;
}
.list ul li {
  margin-bottom: 10px;
  color: skyblue;
  list-style: none;
  cursor: pointer;
  width: 70px;
  padding-bottom: 15px;
  font-size: 15px;
}
.list ul li:hover{
  font-size: 17px;
}
</style>