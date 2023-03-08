<template>
  <div class="home">
    <div class="fl-home">
      <div class="fl-content">
        <div class="fl-data">
          <el-card class="fl-card" v-for="(item,index) in iconData" :key="index" shadow="hover">
            <div class="fl-card-desc">
              <i :class="item.icon"/>
              <div class="fl-card-name">
                <span class="fl-card-title">{{item.title}}</span>
                <span class="fl-card-title-en">{{item.titleEn}}</span>
              </div>
            </div>
            <div class="fl-num">
              <span class="fl-num-total">{{numData[index].num}}</span>
              <span :class="{'fl-num-term':true,'fl-num-term-plus':numData[index].term>0,'fl-num-term-minus':numData[index].term<0}">
                {{numData[index].term>0?'+'+numData[index].term:''+numData[index].term}}
                <i v-if="numData[index].term>0" class="el-icon-caret-top"/>
                <i v-else class="el-icon-caret-bottom"/>
              </span>
            </div>
          </el-card>
        </div>
        <div class="fl-container" style="margin-top: .8rem">
          <div style="font-size:2.2rem;font-weight:600;padding: 1rem 0 2rem 0;text-align: center;width: 100%; ">网站日访问量</div>
          <div style="overflow: hidden;"><div id="main2"></div></div>
        </div> 
      </div>
      <div class="fl-extra">
        <div class="fl-container" >
          <div style="font-size:2.2rem;font-weight:600;padding: 1rem 0 2rem 0;text-align: center;width: 100%; ">昨日24小时总流量</div>
          <div id="main1"></div>
        </div>
        
        <div class="fl-user-list">
          <div style="font-size:2.2rem;font-weight:600;padding: 1rem 0 2rem 0;text-align: center;width: 100%; ">最近注册的用户</div>
          <el-table
            :data="userData"
            style="width: 100%">
            <el-table-column
              align="center"
              label="头像">
              <template slot-scope="props">
                <el-image class="fl-user-avatar" :src="props.row.avatar"></el-image>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="昵称">
              <template slot-scope="props">
                <span class="fl-user-name">{{props.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="创建时间">
              <template slot-scope="props">
                <span class="fl-user-create">{{props.row.create}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Bar from '@/components/Bar.vue'
import * as echarts from 'echarts';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Bar
  },
  data() {
    return {
      listData: [
        {name:'首页',url:'/home'}
      ],
      option : {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
            dataView: {},
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['7/16','7/17','7/18','7/19','7/20','7/21','7/22']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          
          {
            // name: 'Search Engine',
            type: 'line',
            smooth: true,
            stack: 'Total',
            areaStyle: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#a1c4fd'
                },
                {
                  offset: 1,
                  color: '#c2e9fb'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [8202, 2322, 4014, 2344, 12901, 10305, 6202]
          }
        ]
      },
      option2: {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '标题接口', '摘要接口', '纠错接口'],
            ['6月', 43.3, 85.8, 93.7],
            ['7月', 83.1, 73.4, 43.3],
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      },
      iconData: [
        {title:'用户数量',titleEn:'Number Of Users',icon:'el-icon-user-solid'},
        {title:'文章数量',titleEn:'Number Of Article',icon:'el-icon-s-management'},
        {title:'月访问量',titleEn:'Number Of Monthly Visits',icon:'el-icon-s-marketing'},
        {title:'网站访问量',titleEn:'Number Of Website Visit ',icon:'el-icon-s-promotion'}
      ],
      numData: [
        {num:19854,term:23},
        {num:18123,term:2143},
        {num:123915,term:-1232},
        {num:398244,term:-1232},
      ],
      userData: [
        {avatar: require('../assets/avatar/1.jpg'),name:'REWIND_STUDIO',create:'2022-07-02 19:35'},
        {avatar: require('../assets/avatar/2.jpg'),name:'菘禾',create:'2022-07-02 19:30'},
        {avatar: require('../assets/avatar/3.jpg'),name:'天上的singsing不说话',create:'2022-07-02 18:58'},
      ]
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main2'));
    // 绘制图表
    myChart.setOption(this.option);
    var myChart1 = echarts.init(document.getElementById('main1'));
    // 绘制图表
    // prettier-ignore
    let dataAxis = ['0点', '', '2点', '', '4点', '', '6点', '', '8点',
    '', '10点', '', '12点', '', '14点', '', '16点', '', '18点', '', '20点', '', '22点', ''];
    // prettier-ignore
    let data = [20, 42, 51, 34, 60, 70, 90, 123, 142, 121, 90, 49, 110, 122, 133, 134, 98, 123, 25, 80,111,97,88,56];
    let yMax = 500;
    let dataShadow = [];
    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    var option = {
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: false,
          color: '#1772b4',
          fontWeight: 600
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: true
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          color: '#999'
        }
      },
      toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
            dataView: {},
          }
        },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',

          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: data
        }
      ]
    };
    // Enable data zoom when user click bar.
    const zoomSize = 6;
    myChart.on('click', function (params) {
      console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
      myChart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue:
          dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
      });
    });
    myChart1.setOption(option);
  }
}
</script>

<style lang="less" scoped>
  /** css变量 */

  /** 默认标签样式 */

  /** 组件样式 */
  /deep/.el-table td.el-table__cell,/deep/.el-table th.el-table__cell.is-leaf, /deep/.el-table tr {
    border-bottom: 0;
  }
  /deep/.el-table--border::after, .el-table--group::after, .el-table::before {
    background: #fff;
  }
  /deep/.el-table .cell {
    font-size: 2rem;
  }
 
  /** 布局样式 */
  .fl-home {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row nowrap;
    width: 100%;
    padding:.8rem 0;
  }
   .fl-content {
    box-sizing: border-box;
    width: 65%;
    margin: .8rem;
  }
  .fl-extra {
    padding-right: .8rem;
    box-sizing: border-box;
    width: 35%; 
  }
  .fl-data {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .fl-card {
    width: 24%;
    height: 12rem;
    border-radius: 1.6rem;
    border: 0;
  } 
  .fl-user-list {
    box-sizing: border-box;
    width:100%;
    margin-top: 1rem;
    background: #fff;
    padding: 2rem;
    border-radius: 1.6rem;
  }
  .fl-container {
    padding: 1rem 1.5rem;
    background: #fff;
    border-radius: 16px;
  }
  #main2 {
    box-sizing: border-box;
    width:100%;
    height: 62rem;
    border-radius: 1.6rem;
  }
  #main1 {
    box-sizing: border-box;
    width:580px;
    height: 360px;
  }
 
  /** 属性样式 */
  .fl-card-desc {
    display: flex;
    align-items: center;
    i {
      color:#1781b5;
      font-size: 4.6rem;
    }
    .fl-card-name {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      margin-left: .5rem;
      font-size: 1.5rem;
      color: #67696D;
      .fl-card-title {
        font-weight: 600;
      }
      .fl-card-title-en {
        margin-top: .28rem;
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }
  .fl-num {
    margin-left: .2rem;
    margin-top: .5rem;
    color: #565656;
    .fl-num-total{
      font-size: 2.6rem;
      font-weight: 600;
    }
    .fl-num-term {
      font-size: 1.5rem;
      margin-left: .4rem;
    }
    .fl-num-term-plus {
      color:#FF2F56;
    }
    .fl-num-term-minus {
      color:#31C355;
    }
  }
  .fl-user-avatar {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
  }
  .fl-user-name {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .fl-user-create {
    font-size: 1.6rem;
  }
</style>
