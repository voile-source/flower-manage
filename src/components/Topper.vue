<template>
  <div class="topper">
    <ul class="top-left">
      <li class="top-logo"></li>
      <li class="top-bar">
       
      </li>
    </ul>
    <ul class="top-right" v-if="$store.state.isLogin">
      <li class="top-username">{{$store.state.user.name}}</li>
      <li class="mk-li-user">
       <img class="mk-user-avatar" src="guangzhou.aliyuncs.com/image/202212171724987.webp">
        <ul class="mk-user-select">
          <li class="mk-select-item"><div><i class="el-icon-user-solid"></i><span class="select-item-title">个人中心</span></div><i class="el-icon-arrow-right"></i></li>
          <li class="mk-select-item" @click="logout"><div><i class="el-icon-switch-button"></i><span class="select-item-title">退出登录</span></div><i class="el-icon-arrow-right"></i></li>
        </ul>
      </li>
    </ul>
    <ul class="top-right" v-else>
      <li class="top-button-login"><router-link to="/"><el-button type="info" plain size="small">登录</el-button></router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Topper',
  props: {
    msg: String
  },
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$store.state.isLogin=false;
    }
  },
}
</script>

<style lang="less" scoped>
#app {
  height: 2000rem;
}
ul,li{
  list-style: none;
}
ul{
  margin:0;
  padding:0;
}
.topper {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  height: 6.4rem;
  background: #1781b5;
  padding: 0 5rem 0 2rem;
}
.top-left, .top-right{
  display: flex;
  flex-flow: row wrap;
  align-content: center;
}
.top-logo {
  position: relative;
  width: 6rem;
  height: 6rem;
  background: url('http://volit.top/image/717a81d0-9b5a-47f2-a392-7d028d3d3a69.png');
  background-size: cover;
  background-position: center;
  cursor: pointer;
}
.top-logo::after {
  content: '后台管理平台';
  position: absolute;
  top: .2rem;
  right: -11.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 5.8rem;
  color: #fff;
}
.top-bar{
  margin-left: 4rem;
}
.top-avatar {
  width: 4.8rem;
  height: 4.8rem;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}
.top-username {
  margin-right: -5rem;
  font-size: 1.8rem;
  line-height: 5rem;
  color: #fff;
}
.top-button-login {
  font-size: 1.8rem;
}
.mk-li-user {
  position: relative;
  display: flex;
  justify-content: center;
  flex-flow: column;
  width: 220px;
}
@keyframes init_avatar {
  0% { width: 96px;height: 96px;margin-top: 60px;}
  100% {width: 40px;height: 40px;margin-top:0;}
}
.mk-user-avatar {
  margin: 0 auto;
  left: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 8000;
}
@keyframes display {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
.mk-user-avatar:hover+.mk-user-select{
  animation: display .4s ease both;
}
.mk-user-avatar:hover+.mk-user-select,
.mk-user-select:hover{
  visibility: visible;
}
.mk-user-select {
  box-sizing: border-box;
  position: absolute;
  top:50px;
  width: 100%;
  visibility: hidden;
  transition: visibility .2s;
  padding: 15px 10px;
  background: white;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  z-index: 6000;
}
@keyframes unbg {
  0% {background: #F3F5F7;}
  100% {background: #fff;}
}
.mk-select-item {
  height: 42px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-radius: 8px;
  line-height: 42px;
  font-size: 16px;
  color: #61666D;
  cursor: pointer;
  animation: unbg .6s ease both;
}
@keyframes bg {
  0% {background: #fff;}
  100% {background: #F3F5F7;}
}
.mk-select-item:hover {
  background: #F3F5F7;
  animation: bg .4s ease both;
}
.select-item-title {
  margin-left: 12px;
}

</style>
