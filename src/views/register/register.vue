<template>
 <div class="bg">
    <div class="register">
        <h2>REGISTER</h2>
        <div class="inputBox">
            <i class="icon">用户名</i>
            <input type="text" required="required" v-model="username">
            <span>username</span>
        </div>
        <div class="inputBox">
            <i class="icon">密码</i>
            <input type="password" required="required" v-model="password">
            <span>password</span>
        </div>
        <div class="inputBox">
            <i class="icon">确认密码</i>
            <input type="password" required="required" v-model="checkPass">
            <span>checkPass</span>
        </div>
        <div class="inputBox">
            <i class="icon">性别</i>
            <el-radio v-model="sex" label="男" class="select" style="margin-left: -40px;">男</el-radio>
            <el-radio v-model="sex" label="女" class="select">女</el-radio>
        </div>
        <div class="inputBox">
            <i class="icon">年龄</i>
            <input type="text" required="required" v-model="age">
            <span>age</span>
        </div>
        <div class="inputBox">
            <i class="icon">邮箱</i>
            <input type="text" required="required" v-model="email">
            <span>email</span>
        </div>
        <div class="inputBox">
            <i class="icon">联系电话</i>
            <input type="text" required="required" v-model="phone">
            <span>phone</span>
        </div>
        <button @click="register">注册</button>
        <b @click="back">已有账号</b>
    </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
 components:{},
 props:{},
 data(){
  return{
    username:'',
    password:'',
    checkPass:'',
    sex:'',
    age:'',
    email:'',
    phone:'',
    sex: '男'
  };
},
methods:{
    register(){
        var phonereg=/^1[3456789]\d{9}$/
        var emailreg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        var passwordreg = /(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)/
        var numReg = /^[0-9]*$/
        var numRe = new RegExp(numReg)
        if (this.username == "") {
        this.$message.error("用户名不能为空");
      } else if(this.username.length < 3 || this.username.length > 7){
        this.$message.error("用户名为3~7个字符");
      }else if (this.password == "") {
        this.$message.error("密码不能为空");
      } else if(this.password.length < 8 || this.password.length > 30){
        this.$message.error("密码长度应为8~30位字符");
      }else if(!passwordreg.test(this.password)){
        this.$message.error("密码至少包含两种字符");
      }else if(this.checkPass == ""){
        this.$message.error("请确认密码");
      }else if(this.checkPass !== this.password){
        this.$message.error("两次输入不相同");
      } else if(this.age == ""){
        this.$message.error("年龄不能为空");
      }else if(!numRe.test(this.age)){
        this.$message.error("请输入数字");
      }else if(this.age.length > 3){
        this.$message.error("年龄不能超过三位数");
      }else if(this.email == ""){
        this.$message.error("邮箱不能为空");
      }else if(!emailreg.test(this.email)){
        this.$message.error("请输入正确邮箱格式");
      }else if(this.phone == ""){
        this.$message.error("电话号码不能为空");
      }else if(!phonereg.test(this.phone)){
        this.$message.error("电话号码格式错误");
      }else{
        axios.post('http://127.0.0.1/register', {
          params: {
            username: this.username,
            password: this.password,
            sex:this.sex,
            age:this.age,
            email:this.email,
            phone:this.phone
          }
        }).then(res => {
          // console.log(res.data.message);
          if(res.data.status == 200) {
            this.$alert('是否返回登录页面', '注册成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/login')
              }
            })
          }else if(res.data.status == 202) {
            this.$alert('用户名已存在', '注册失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.username = '',
                this.password = '',
                this.checkPass = ''
              }
            })
          }else{
            console.log(res.message);
          }
        }).catch(err => {
          console.log('操作失败' + err);
        })
      }
    },
    back(){
        this.$router.push('/login')
    }
}
}
</script>
<style lang="css" scoped>
.bg{
  height: 100vh;
  width: 100vw;
  background: url('../../assets/img/login.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
}
.register{
  height: 95vh;
  width: 500px;
  background: rgba(0, 0, 0, 0.6);
  /* border: 1px solid skyblue; */
  position: absolute;
  top: 20px;
  left: 32vw;
  border-radius: 20px;
}
h2{
  color: white;
  margin-left: 200px;
}
.inputBox{
    display: flex;
    position: relative;
    width: 300px;
    margin-left: 80px;
    margin-bottom: 12px;
}
.inputBox .icon{
    width: 100px;
    line-height:50px;
    color: white;
    margin-right: 10px;
}
.inputBox input{
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);
    border-top: none;
    border-left: none;
    border-right: none;
    /* border: none; */
    background:rgba(5, 73, 100, 0) ;
    /* border-radius: 5px; */
    outline: none;
    color: white;
    font-size: 1em;
    transition: 0.3s;
}
.inputBox span{
    position: absolute;
    left: 70px;
    top: 15px;
    pointer-events: none;
    font-size: 1em;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    transition: 0.3s;
}
.inputBox input:valid~span,
.inputBox input:focus~span{
    color: #50c9c3;
    transform: translateX(15px) translateY(-21px);
    font-size: 0.65em;
    padding: 0 5px;
    background: rgba(5, 73, 100, 0);
    letter-spacing: 0.1em;
}
.inputBox input:valid,
.inputBox input:focus{
    border-bottom: 1px solid #50c9c3;
}
button{
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
b{
    color: white;
    font-weight: 100;
    position: absolute;
    top: 550px;
    left: 410px;
    cursor: pointer;
}
.select{
    color: rgba(255, 255, 255, 0.5);
    margin-top: 20px;
}
</style>