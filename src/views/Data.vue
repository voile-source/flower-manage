<template>
  <div class="data">
    <Bar :listData = "listData"></Bar>
    <div class="fl-data">
      <div class="fl-nav">
        <el-tabs v-model="activeName">
          <el-tab-pane label="社区数据" name="first"><Square></Square></el-tab-pane>
        </el-tabs>
      </div>
      <div class="fl-content">

      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Bar from '@/components/Bar.vue'
import Square from '@/components/data/Square.vue'
import UserData from '@/components/data/UserData.vue'


export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Bar,
    Square,
    UserData
},
  data() {
    return {
      listData: [
        { name: '首页', url: '/home' },
        { name: '数据看板', url: '/home' }
      ],
      activeName: 'first',
    }
  },
  
    
}
</script>

<style lang="less" scoped>

/deep/ .el-tabs__item {
  font-size: 1.6rem;
  color: #9197A0;
}
/deep/ .is-active {
  font-size: 1.8rem;
}
/deep/ .el-breadcrumb__inner {
  font-size: 1.6rem;
}

.fl-data {
  display: flex;
  flex-flow: column nowrap;
  background: #fff;
  margin: .8rem;
}
.fl-nav {
  padding: 1.2rem;
  
}

</style>
