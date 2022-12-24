      import {change_number_arr} from './index2.js'
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '明文不变，密钥依次变化'
        },
        tooltip: {},
        xAxis: {
            name:'密钥改变位数个数',
            type: 'category',
            data: Object.keys(change_number_arr)
          },
          yAxis: {
            name:'密文改变位数个数',
            type: 'value'
          },
          series: [
            {
            //   label:{show:true},
              data: change_number_arr,
              type: 'line'
            }
          ]

      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);