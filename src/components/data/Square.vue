<template>
  <div class="square">
    <div class="fl-content">
      <div>
        <div style="width:100%;text-align: center;font-weight: 600;font-size: 2.4rem;margin:2rem 0;">新老用户访问频率</div>
        <div id="chart1"></div>
      </div>
      <div style="width:100%">
        <div style="width:100%;text-align: center;font-weight: 600;font-size: 2.4rem;margin:2rem 0;">社区文章分类占比</div>
        <div id="chart2"></div>
      </div>
      <div style="width:100%">
        <div style="width:100%;text-align: center;font-weight: 600;font-size: 2.4rem;margin:2rem 0;">今日热度前五文章数据</div>
        <div id="chart3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  
  data() {
    return {

    }
  },
  mounted() {
    this.initChart1();
    this.initChart2();
    this.initChart3();
  },
  methods: {
    initChart1() {
      let option = {
        xAxis: {
          type: 'category',
          data: ['7/11', '7/12', '7/13','7/14','7/15','7/16','7/18','7/19','7/20','7/21','7/22']
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['老用户访问频率', '新用户访问频率'],
          // icon: 'rect',
          // ...
        },
        series: [
         
          {
            data: [2504, 1401, 2307, 3503, 1007, 3304, 4202, 6802, 1903, 2704, 5301],
            name:"新用户访问频率",
            type: 'line',
            smooth: true,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#a8edea'
                },
                {
                  offset: 1,
                  color: '#fed6e3'
                }
              ])
            },
          },
           {
            data: [1053, 2231, 2851, 2331, 4973, 3241, 3933, 4281, 3623, 4931, 2521],
            name:"老用户访问频率",
            type: 'line',
            smooth: true,
            areaStyle: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#4facfe'
                },
                {
                  offset: 0.6,
                  color: '#00f2fe'
                },
                {
                  offset: 1,
                  color: '#4facfe'
                },
              ])
            },
          },
        ]
      };
      var myChart = echarts.init(document.getElementById('chart1'));
      // 绘制图表
      window.onresize = function() {
        myChart.resize();
      };
      myChart.setOption(option);
    },
    initChart2() {
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '模板' },
              { value: 735, name: '段落' },
              { value: 580, name: '句子' },
              { value: 300, name: '词语' },
            ]
          }
        ]
      };
      var myChart = echarts.init(document.getElementById('chart2'));
      window.onresize = function() {
        myChart.resize();
      };
      // 绘制图表
      myChart.setOption(option);
    },
    initChart3() {
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['product', '阅读量','点赞', '评论', '收藏'],
          source: [
            { product: '国际锐评：被“禁言”的莫里森...','阅读量':1623, '点赞': 1233, '评论': 1858, '收藏': 937 },
            { product: '在加快构建新发展格局中...', '阅读量':2223,'点赞': 831, '评论': 734, '收藏': 951 },
            { product: '教育兴则国家兴', '阅读量':1823,'点赞': 864, '评论': 652, '收藏': 825 },
            { product: '把握信息革命历史机遇','阅读量':1323, '点赞': 724, '评论': 539,'收藏': 591 },
            { product: '培厚工匠精神的土壤','阅读量':2023, '点赞': 924, '评论': 539, '收藏': 391 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' },{ type: 'bar' }, { type: 'bar' }]
      };

      var myChart = echarts.init(document.getElementById('chart3'));
      window.onresize = function() {
        myChart.resize();
      };
      // 绘制图表
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>

#chart1 {
  margin: 0 auto;
  width: 100%;
  height: 550px;
}
#chart2 {
  margin: 0 auto;
  width: 100%;
  height: 450px;
}
#chart3 {
  margin: 0 auto;
  width: 100%;
  height: 550px;
}

</style>