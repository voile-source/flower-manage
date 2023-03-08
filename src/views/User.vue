<template>
  <div class="home">
    <Bar :listData = "listData"></Bar>
    <div class="fl-content">
      <!-- 数据操作区域 -->
      <div class="fl-tool">
        <div class="fl-search">
          <el-input placeholder="昵称" v-model="searchData.text"></el-input>
          <el-select style="margin-left:1rem" v-model="edit_user.role" placeholder="请选择">
            <el-option
              v-for="item in roleOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="fl-search-button" type="success" @click="searchChange"><i class="el-icon-search"></i> 查找</el-button>
          <!-- <el-button type="primary" @click="addDialog = true">添加</el-button> -->
        </div>
        <div class="fl-option">
          <el-button type="danger" @click="deleteSelectItem">批量删除</el-button>
        </div>
      </div>
      <!-- 数据操作区域END -->

      <!-- 表格区域 -->
      <div class="fl-table" v-if="tableData.length!=0">
        <el-table
          :data="tableData"
          style="width: 100%"
          :stripe="true"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                 <el-form-item label="用户头像">
                  <el-image class="--circle" :src="props.row.avatar"/>
                </el-form-item>
                <el-form-item label="用户名称">
                  <span>{{ props.row.username }}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="用户描述">
                  <div class="--omit">{{ props.row.desc }}</div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="用户 ID">
            <template slot-scope="props">
              {{props.row.id}}
            </template>
          </el-table-column>
          <el-table-column
            label="用户头像"
            align="center">
            <template slot-scope="props">
              <el-image class="--circle" size="mini" :src="props.row.avatar"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="用户名称"
           align="center">
           <template slot-scope="props">
              <span class="fl-user-desc">{{props.row.username}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户描述"
           align="center">
           <template slot-scope="props">
              <span class="fl-user-desc">{{props.row.desc}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
           align="center">
           <template slot-scope="props">
              <span class="fl-user-desc">{{props.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
           align="center">
           <template slot-scope="props">
              <span class="fl-user-desc">{{props.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="修改时间"
           align="center">
           <template slot-scope="props">
              <span class="fl-user-desc">{{props.row.updateTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='取消'
                cancel-button-type='info'
                icon="el-icon-info"
                icon-color="red"
                title="确认删除？"
                placement="top"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <el-button style="margin-left:1rem" size="mini" type="danger" slot="reference">删除</el-button>
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
          :total="854">
        </el-pagination>
      </div>
      <!-- 分页END -->
    </div>
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
    Bar
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
        if(value.length>20) {
          callback(new Error('昵称不能超过20个字符'))
        } else {
          callback();
        }
      }
    };
    return {
      listData: [
        { name: '首页', url: '/home' },
        { name: '用户管理', url: '/content' },
        { name:'查看用户',url:'/home'}
      ],
      multipleSelection: '',
      dialog: false,
      addDialog: false,
      direction: 'rtl',
      totalSize: '',
      totalPage: '',
      searchData: {text:'',status:'',pageNum:1,pageSize:8},
      edit_user: {index:'',avatar:'',name:'',desc:'',role:''},
      add_user: {index:'',name:'',desc:'',status:''},
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        desc: [
          { validator: checkDesc, trigger: 'blur' }
        ],
      },
      tableData: [],
      roleOption: [
        {label:'用户',value:1},
        {label:'管理员',value:2}
      ]
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$apiFun.user.list({
        keyword:this.searchData.text,
        status:this.searchData.status,
        pageNum:this.searchData.pageNum,
        pageSize:this.searchData.pageSize
        }).then(res => {
          this.totalSize = res.data.totalSize;
          this.totalPage = res.data.totalPageNum;
          this.tableData = res.data.userList;
      });
    },
    //获取多选的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;//存储选中的数据
      console.log(val);
    },
    deleteSelectItem() {
          //遍历获得多选选中的index值
          this.multipleSelection.forEach((value, index) => {
            //遍历多选框获取的数据
            this.tableData.forEach((v, i) => {
              //遍历数据表，任意一个属性值相同，则说明该数据被选中，其i则为索引值
              if (value.id == v.id) {
                this.tableData.splice(i, 1);
              }
            });
          });
    },
    handleDelete(index, row) {
      this.tableData.splice(index,1);
      this.$apiFun.user.delete(row.id).then(res => {
        this.$message( {
          type:'success',
          message:'删除成功'
        })
        // this.init();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    statusChange(index,row) {
      row.status = !row.status;
    },
    searchChange() {
      this.$apiFun.getUserList(this.$Qs.stringify(this.searchData));
    },
    currentChange(currentPage) {
      this.searchData.pageNum = currentPage;
      this.init();
    },
  }
}
</script>

<style lang="less" scoped>
  /deep/ .el-breadcrumb__inner {
  font-size: 1.6rem;
}
  // 通用样式
  .--omit {
    max-width: 120rem;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
  }
  .--circle {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    object-fit: cover;
  }
  .--center {
    display: flex;
    align-items: center;
  }
  // 通用样式END

  //组件样式
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
  .user {
    height: 100%;
    overflow: auto;
  }
  .fl-content {
    // box-sizing: border-box;
    height: 100%;
    overflow: auto;
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
  .fl-user-avatar {
    border-radius: 50%;
  }
  .fl-user-desc {
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
  }
  .fl-user-status {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: .5rem;
  }
  // 内容样式END
</style>
