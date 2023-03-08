<template>
  <div class="aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo">
      <router-link to="/home"><el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item></router-link>
      <router-link to="/data"><el-menu-item index="2">
        <i class="el-icon-odometer"></i>
        <span slot="title">数据看板</span>
      </el-menu-item></router-link>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/user"><el-menu-item index="3-1"><i class="el-icon-s-order"></i>查看用户</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/content"><el-menu-item index="4-1"><i class="el-icon-s-management"></i>查看内容</el-menu-item></router-link>
          <router-link to="/sensitive"><el-menu-item index="4-2"><i class="el-icon-tickets"></i>敏感词管理</el-menu-item></router-link>
          <!-- <el-menu-item index="4-2"><i class="el-icon-s-check"></i>内容审核</el-menu-item> -->
        </el-menu-item-group>
       </el-submenu>
      <!-- <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>积分商城</span>
        </template>
        <el-menu-item-group>
          <router-link to="/showProduct"><el-menu-item index="5-1"><i class="el-icon-s-management"></i>查看商品</el-menu-item></router-link>
          <router-link to="/addProduct"><el-menu-item index="5-2"><i class="el-icon-tickets"></i>添加商品</el-menu-item></router-link>
         
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>     
  </div>
</template>

<script>
export default {
  name: 'Aside',
  props: {
    msg: String
  },
  methods: {
    
  },
}
</script>

<style lang="less">

  .aside .el-menu-item-group__title {
    padding: 0;
  }
</style>
