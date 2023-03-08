<template>
    <div class="bar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in listData" :key="'bar'+index" :to="{ path: item.url }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>


<script>
export default {
  props: {
    listData:Array
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>
  .bar {
    background: white;
    margin: .8rem;
    padding: 3rem;
  }
  .el-breadcrumb__inner {
      font-size: 1.8rem;
  }
</style>