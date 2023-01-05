<template>
  <div>
    <transition>
      <div class="user" v-show="usertable">
        <!-- 表头按钮区域 -->
        <h2>用户管理</h2>
        <button style="width: 150px; margin-left: 50px" @click="all">
          展示全部用户
        </button>
        <input type="text" class="search" v-model="username" />
        <button style="margin-left: 10px" @click="get">查询</button>
        <button style="margin-left: 10px" @click="open">新增</button>
        <button style="margin-left: 10px" @click="back">退出</button>
        <!-- 表格区域 -->
        <el-table
          :data="user"
          size="mini"
          stripe
          style="
            width: 750px;
            margin-left: 20px;
            margin-top: 20px;
            border-radius: 50px;
          "
          height="400px"
          :header-cell-style="{ background: '#30cfd0', color: 'white' }"
        >
          <el-table-column prop="id" label="ID" width="50"> </el-table-column>
          <el-table-column prop="username" label="用户名" width="60">
          </el-table-column>
          <el-table-column prop="password" label="密码" width="120">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="40">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="40">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="150">
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="110">
          </el-table-column>
          <el-table-column prop="jur" label="用户权限" width="80">
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button
                style="width: 20px; line-height: 20px; text-align: left"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="update(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                style="width: 20px; line-height: 20px"
                @click="del(scope.$index, scope.row)"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </transition>
    <!-- 弹出窗 -->
    <el-dialog
      :title="title ? '添加用户' : '编辑用户'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div class="inputBox">
        <i class="icon">用户名</i>
        <input type="text" required="required" v-model="username" />
        <span>username</span>
      </div>
      <div class="inputBox">
        <i class="icon">密码</i>
        <input type="text" required="required" v-model="password" />
        <span>password</span>
      </div>
      <div class="inputBox">
        <i class="icon">用户权限</i>
        <el-radio
          v-model="jur"
          label="普通用户"
          class="select"
          style="margin-left: -40px"
          >普通用户</el-radio
        >
        <el-radio v-model="jur" label="管理员" class="select">管理员</el-radio>
      </div>
      <div class="inputBox">
        <i class="icon">性别</i>
        <el-radio
          v-model="sex"
          label="男"
          class="select"
          style="margin-left: -40px"
          >男</el-radio
        >
        <el-radio v-model="sex" label="女" class="select">女</el-radio>
      </div>
      <div class="inputBox">
        <i class="icon">年龄</i>
        <input type="text" required="required" v-model="age" />
        <span>age</span>
      </div>
      <div class="inputBox">
        <i class="icon">邮箱</i>
        <input type="text" required="required" v-model="email" />
        <span>email</span>
      </div>
      <div class="inputBox">
        <i class="icon">联系电话</i>
        <input type="text" required="required" v-model="phone" />
        <span>phone</span>
      </div>

      <span slot="footer" class="dialog-footer">
        <button
          @click="dialogVisible = false"
          style="line-height: 10px; margin-right: 5px"
        >
          取 消
        </button>
        <button type="primary" style="line-height: 10px" @click="add">
          确 定
        </button>
      </span>
    </el-dialog>
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
      jur: "",
      user: [],
      dialogVisible: false,
      title: true,
    };
  },
  mounted() {
    //获取数据库全部用户信息
    axios
      .get("http://127.0.0.1/list/all")
      .then((res) => {
        // console.log(res.data);
        this.user = res.data;
      })
      .catch((err) => {
        console.log("获取数据失败" + err);
      });
  },
  computed: {
    usertable() {
      return this.$store.state.person.usertable;
    },
  },
  methods: {
    all() {
      //查找user表全部数据
      axios
        .get("http://127.0.0.1/list/all")
        .then((res) => {
          // console.log(res.data);
          this.user = res.data;
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
    },
    get() {
      //查询操作
      axios
        .get("http://127.0.0.1/list/get", {
          params: {
            username: this.username,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.user = res.data;
          this.username = "";
        })
        .catch((err) => {
          console.log("操作失败" + err);
        });
    },
    open() {
      //打开弹出窗口
      (this.dialogVisible = true), (this.title = true);
      this.username = "";
      this.password = "";
      this.sex = "男";
      this.age = "";
      (this.email = ""), (this.phone = ""), (this.jur = "普通用户");
    },
    add() {
      //增加或更改用户信息
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
      } else if (this.title == true) {
        //添加操作
        axios
          .get("http://127.0.0.1/list/add", {
            params: {
              username: this.username,
              password: this.password,
              sex: this.sex,
              age: this.age,
              email: this.email,
              phone: this.phone,
              jur: this.jur,
            },
          })
          .then((res) => {
            if (res.data.status == 200) {
              this.dialogVisible = false;
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.all();
            } else {
              this.$message({
                message: "添加失败",
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log("操作失败" + err);
          });
      } else if (this.title == false) {
        //更新用户
        axios
          .get("http://127.0.0.1/jur", {
            params: {
              id: this.id,
              username: this.username,
              password: this.password,
              sex: this.sex,
              age: this.age,
              email: this.email,
              phone: this.phone,
              jur: this.jur,
            },
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.status == 200) {
              this.dialogVisible = false;
              this.all();
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
    del(index, row) {
      //删除用户
      console.log("delet", index, row);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .get("http://127.0.0.1/list/del", {
              params: {
                id: row.id,
              },
            })
            .then((res) => {
              // console.log(res.data);
              if (res.data.status == 200) {
                this.all();
              } else {
                this.$message({
                  message: "删除失败",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log("操作失败" + err);
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    update(index, row) {
      //打开用户弹窗并赋值
      (this.dialogVisible = true),
        (this.title = false),
        (this.id = { ...row }.id);
      this.username = { ...row }.username;
      this.password = { ...row }.password;
      this.age = { ...row }.age;
      this.sex = { ...row }.sex;
      this.jur = { ...row }.jur;
      this.email = { ...row }.email;
      this.phone = { ...row }.phone;
    },
    back() {
      this.$store.commit("changeusertable");
    },
  },
};
</script>
<style lang="css" scoped>
.user {
  height: 550px;
  width: 800px;
  position: absolute;
  left: 130px;
  top: 50px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50px;
}
@keyframes user {
  from {
    transform: translateY(-600px);
  }
  to {
    transform: translateY(0px);
  }
}
.v-enter-active {
  animation: user 1s;
}
.v-leave-active {
  animation: user 1s reverse;
}
h2 {
  color: white;
  margin-left: 350px;
}
button {
  width: 60px;
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
.search {
  width: 100px;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  margin-left: 230px;
  border-radius: 30px;
  /* border: none; */
  background: rgba(5, 73, 100, 0);
  /* border-radius: 5px; */
  outline: none;
  color: white;
  font-size: 1em;
}
.inputBox {
  display: flex;
  position: relative;
  width: 300px;
  margin-left: 80px;
  margin-bottom: 12px;
}
.inputBox .icon {
  width: 100px;
  line-height: 50px;
  color: white;
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
  left: 70px;
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
.select {
  color: rgba(255, 255, 255, 0.5);
  margin-top: 20px;
}
</style>
<style>
.el-dialog {
  background: rgba(0, 0, 0, 0.9) !important;
}
.el-dialog__title {
  color: white !important;
}
.el-icon-edit:before{
  margin-left: -6px !important;
}
.el-icon-delete:before{
  margin-left: -7px !important;
}
</style>


