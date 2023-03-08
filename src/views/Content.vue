<template>
  <div class="content">
    <Bar :listData = listData></Bar>
    <div class="fl-content">
      <!-- 数据操作区域 -->
      <div class="fl-tool">
        <div class="fl-search">
          <el-input placeholder="标题" v-model="searchData.text"></el-input>
          <el-select v-model="searchData.status" style="margin-left:1rem" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="fl-search-button" type="success" @click="searchChange"><i class="el-icon-search"></i> 查找</el-button>
        </div>
      </div>
      <!-- 数据操作区域END -->

      <!-- 表格区域 -->
      <div class="fl-table" v-if="tableData.length!=0">
        <el-table
          :data="tableData"
          style="width: 100%"
          :stripe=true>
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="文章 ID">
                  <span>{{ props.row.materialId }}</span>
                </el-form-item>
                <el-form-item label="文章标题">
                  <span>{{ props.row.title }}</span>
                </el-form-item>
                <el-form-item label="文章摘要">
                  <span>{{ props.row.digest }}</span>
                </el-form-item>
                <el-form-item label="创建日期">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="文章 ID" width="100">
            <template slot-scope="props">
              <span class="fl-table-title">{{props.row.materialId}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="文章名称"
           align="center">
           <template slot-scope="props">
              <span class="fl-article-desc">{{props.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="文章类型"
            align="center">
            <template slot-scope="props">
              <div class="fl-article-state">
                <el-tag v-if="props.row.typeName=='全部'">{{'全部'}}</el-tag>
                <el-tag type="warning" v-else-if="props.row.typeName=='模板'">{{'模板'}}</el-tag>
                <el-tag type="success" v-else-if="props.row.typeName=='段落'">{{'段落'}}</el-tag>
                <el-tag type="danger" v-else-if="props.row.typeName=='句子'">{{'句子'}}</el-tag>
                <el-tag type="info" v-else>{{'词语'}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="文章状态"
            align="center">
            <template slot-scope="props">
              <div class="fl-article-state">
                <el-tag v-if="props.row.status==0">{{'未审核'}}</el-tag>
                <el-tag type="success" v-else-if="props.row.status==1">{{'通过审核'}}</el-tag>
                <el-tag type="danger" v-else>{{'未通过审核'}}</el-tag>
              </div>
            </template>
          </el-table-column>
           <el-table-column
            label="发布时间"
           align="center">
           <template slot-scope="props">
              <span class="fl-article-desc">{{props.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="handleView(scope.$index, scope.row)">查看</el-button>
               <el-popconfirm
                  v-if="scope.row.status == 1"
                  confirm-button-text='确定'
                  cancel-button-text='取消'
                  cancel-button-type='info'
                  icon="el-icon-info"
                  icon-color="red"
                  title="是否下架？"
                  placement="top"
                  @confirm="del(scope.$index, scope.row)"
                >
                  <el-button style="margin-left:1rem" size="mini" type="danger" slot="reference">下架</el-button>
                </el-popconfirm>
               <el-popconfirm
                v-else
                confirm-button-text='确定'
                cancel-button-text='取消'
                cancel-button-type='info'
                icon="el-icon-info"
                icon-color="red"
                title="是否通过审核？"
                placement="top"
                @confirm="handleConfirm(scope.$index, scope.row)"
              >
                <el-button style="margin-left:1rem" size="mini" type="primary" slot="reference">审核</el-button>
              </el-popconfirm>
              
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表格区域END -->

      <!-- 空状态 -->
      <el-empty v-else :image-size="200"></el-empty>
      <!-- 空状态END -->

      <!-- 分页 -->
      <div class="fl-pag">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="searchData.currentPage"
          :page-size="searchData.pageSize"
          :hide-on-single-page=true
          @current-change="currentChange"
          @prev-click="currentChange"
          @next-click="currentChange"
          :total="18123">
        </el-pagination>
      </div>
      <!-- 分页END -->
    </div>

    <!-- 查看文章 -->
    <el-dialog title="查看文章" :visible.sync="show_dialog" width="150rem">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="文章标题">
          <span>{{ showArticle.title }}</span>
        </el-form-item>
        <el-form-item label="文章摘要">
          <span>{{ showArticle.digest}}</span>
        </el-form-item>
        <el-form-item label="文章内容">
          <div style="box-sizing: border-box;padding: 0 10rem 0 0;font-size: 1.6rem;" v-html="showArticle.html"></div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看文章END -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Bar from '@/components/Bar.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Bar,
  },
  data() {
    var checkDesc = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('描述不能为空'));
      } else {
        if(value.length>200) {
          callback(new Error('描述不能超过200个字符'))
        } else {
          callback();
        }
      }
    };
    var checkName = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('昵称不能为空'));
      } else {
        if(value.length>50) {
          callback(new Error('昵称不能超过50个字符'))
        } else {
          callback();
        }
      }
    };
    return {
      listData: [
        { name: '首页', url: '/home' },
        { name: '内容管理', url: '/content' },
        { name:'查看内容',url:'/home'}
      ],
      dialog: false,
      show_dialog: false,
      direction: 'rtl',
      showArticle: '',
      totalSize: '',
      totalPage: '',
      searchData: {text:'',status:'',pageNum:1,pageSize:8},
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        desc: [
          { validator: checkDesc, trigger: 'blur' }
        ],
      },
      options: [
        {
          value: '0',
          label: '未审核'
        },
        {
          value: '1',
          label: '通过审核'
        },
        {
          value: '2',
          label: '审核未通过'
        },
      ],
      value: '',
      tableData: [],
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$apiFun.content.list({
        keyword:this.searchData.text,
        status:this.searchData.status,
        pageNum:this.searchData.pageNum,
        pageSize:this.searchData.pageSize
        }).then(res => {
          this.totalSize = res.data.totalSize;
          this.totalPage = res.data.totalPageNum;
          this.tableData = res.data.materialList;
          console.log(this.tableData)
      });
    },
    del(index,arr) {
      this.tableData[index].status = 0;
    },
    handelConfirm(index, row) {
      console.log(row.materialId)
      this.$apiFun.content.check(row.materialId).then(res => {
        this.tableData[index].status = 1;
      });
    },
    handleView(index, article) {
      this.show_dialog = true;      
      this.showArticle = article;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    searchChange() {
      this.$apiFun.getarticleList(this.$Qs.stringify(this.searchData));
    },
    currentChange(currentPage) {
      this.searchData.pageNum = currentPage;
      this.init();
    },
  }
}
</script>

<style lang="less" scoped>
  // 通用样式

  // 通用样式END

  //组件样式
  /deep/ .el-breadcrumb__inner {
    font-size: 1.6rem;
  }
  .fl-input .el-input__inner {
    width: 22rem;
  }
  .el-dialog__body .el-input__inner, .el-dialog__body .el-textarea__inner, .el-dialog__body .el-input{
    width: 30rem;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-left: 4.8rem;
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .el-drawer__header {
    font-size: 1.8rem;
    color: #565656;
  }
  .el-dialog {
    width: 50rem;
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  // 组件样式END

  // 布局样式
  .fl-content {
    box-sizing: border-box;
    background: white;
    margin: .8rem;
    padding: 3rem;
    border-radius: .4rem;
  }
  .fl-tool {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .fl-search {
    display: flex;
    flex-flow: row nowrap;
  }
  .fl-pag {
    display: flex;
    justify-content: center;
    margin-top:5rem;
  }
  .fl-table {
    margin-top: 2rem;
  }
  // 布局样式END

  // 内容样式
  .fl-search-button {
    margin-left: 1rem;
    font-size: 1.4rem;
  }
  .fl-article-desc {
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
  }
  .fl-article-status {
    display: flex;
    justify-content: center;
  }
  .fl-table-title {
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
  }
  // 内容样式END
</style>
