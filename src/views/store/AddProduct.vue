<template>
  <div class="content">
    <Bar :listData="listData"></Bar>
    <div class="fl-content">
      <div style="padding:30px;">
      <div class="layout-inform-box" style="display:flex;flex-direction:row;justify-content: center;gap: 100px;">
        <div style="display:flex;flex-direction:column;gap:30px;">
          <div class="goods_title">
              <span>商品图片：</span>
              <div class="add_input" >
                <el-upload
                class="avatar-uploader"
                action="http://101.33.228.113:3000/common/upload/img"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageURL!=''" :src="imageURL" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
          </div>
          <div class="goods_title">
              <span>商品名称：</span>
              <div class="add_input" ><el-input v-model="good.name" size="large" placeholder="请输入商品名称"></el-input></div>
          </div>
          <div class="goods_title">
              <span>商品描述：</span>
              <div class="add_input" ><el-input v-model="good.desc" size="large" placeholder="请输入商品描述"></el-input></div>
          </div>
          <div class="goods_title">
              <span>商品价格：</span>
              <div class="add_input" ><el-input v-model="good.price" size="large" placeholder="请输入商品价格"></el-input></div>
          </div>
          <div class="goods_title">
              <span>商品库存：</span>
              <div class="add_input" ><el-input v-model="good.stock" size="large" placeholder="请输入商品库存"></el-input></div>
          </div>
      
        </div>

        </div>
          <div style="display:flex;justify-content:center;width:100%;margin-top:50px;">
              <el-button @click="reset" type="warning" style="width:120px;font-size:18px;" size="large">重置</el-button>
              <el-button @click="submit" type="primary" style="width:120px;font-size:18px;" size="large">提交</el-button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Bar from "@/components/Bar.vue";

export default {
  name: "HomeView",
  components: {
    Bar,
  },
  data() {
    return {
      listData: [
        { name: "首页", url: "/home" },
        { name: "积分商城", url: "/content" },
        { name: "添加商品", url: "/home" },
      ],
      good: {
        name: '',
        cover: '',
        desc: '',
        price: '',
        stock: ''
      }, 
      imageURL:'',
      value: "",
      tableData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
    },
    handelConfirm(index, row) {
      console.log(row.materialId);
      this.$apiFun.content.check(row.materialId).then((res) => {
        this.tableData[index].status = 1;
      });
    },
    handleAvatarSuccess(res, file) {
      this.good.cover = "http://" + res;
      this.imageURL = URL.createObjectURL(file.raw);
    },
    reset() {
      this.good = {
        name: '',
        cover: '',
        desc: '',
        price: '',
        stock: ''
      },
        this.imageURL = '';
    },
    submit() {
      this.$apiFun.product.add(this.good).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.reset();
      }) 
    }
  },
};
</script>

<style lang="less" scoped>
// 通用样式

// 通用样式END

//组件样式

// 布局样式
.fl-content {
  box-sizing: border-box;
  background: white;
  margin: 0.8rem;
  padding: 3rem;
  border-radius: 0.4rem;
}

.goods_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 18px;
  }
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
.avatar-uploader:hover {
    border-color: #409EFF;
  }
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
    object-fit: cover;
  }
</style>
