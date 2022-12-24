<template>
      <div class="hill">
        <div>
            明文 <input type="text" v-model="mingwen" >
        </div>

        <div>
            密钥  <input type="text" v-model="juzheng">
        </div>
        <div>
            填充的字母 <input type="text" v-model="tianchong">
        </div>
        <div>
            执行的操作
                <label><input v-model="radioVal" type="radio" value="加密" @change="getRadioVal">加密</label>
               

        </div>
        <div>
            执行结果 <input type="text" v-model="result">
        </div>
        <div id="smg" style="width: 600px;height:400px;"></div>
        <div id="zwz" style="width: 600px;height:400px;"></div>
        <button @click="start">开始执行</button>
    </div>
</template>

<script>
import {reactive, ref,onMounted} from 'vue'
import * as echarts from "echarts"
export default {
    name:'Hill',
    setup(){
            let radioVal = ref()
            let mingwen = ref('')
           
            let juzheng = ref()
            let juzheng_ming = reactive([])
            let tianchong = ref()
            let result = ref('')
            let num = reactive([])
            let new_ju = reactive([])
            //开始
            function start(){
                result.value = ""
                if (radioVal.value == '加密')    jiami()
                 num = []
                for (let i=0;i<26;i++){
                        num.push(0)
                }
                getDataAndCalculate(1)
                change()
                getDataAndCalculate(2)
                change1()
            }

            //加密
             function  jiami(){
                //补充的字符对应的数字
                let extra_num = ((tianchong.value.toUpperCase()).charCodeAt()-65)

                //正则将不是英文的去除
                let isDuan = /[^A-z]/g
                mingwen.value = mingwen.value.replace(isDuan,'')
                //获得明文矩阵--英文
                 juzheng_ming = mingwen.value.split("")
                //获得明文矩阵--数字
                for (let key in juzheng_ming){
                    juzheng_ming[key] = (juzheng_ming[key].toUpperCase()).charCodeAt()-65
                }
                //获得明文矩阵--数字--补充版
                if (juzheng_ming.length%3 != 0 ){
                let ming_length = (3-juzheng_ming.length%3)
                 for (let i = 0;i<ming_length;i++){
                    juzheng_ming.push(extra_num)
                    }
               
                }

              
               

                //获得密钥矩阵--数字
                let juzheng1 = juzheng.value.split(',')

                // 矩阵相乘
                 new_ju = []  //结果矩阵
                for (let i = 0 ;i<juzheng_ming.length/3;i++){
                    let k = i*3
                    for (let j = 0;j<3;j++){
                        new_ju.push((juzheng_ming[k]*juzheng1[j]+juzheng_ming[k+1]*juzheng1[j+3]+juzheng_ming[k+2]*juzheng1[j+6])%26)
                    }
                }

                //结果矩阵--字母
                for (let item of new_ju){
                    result.value += String.fromCharCode(item+65)
                }
               
                
            }

            //表格数据填充
            function getDataAndCalculate(choice){
                    num = []
                    for (let i=0;i<26;i++){
                        num.push(0)
                    }
                    if (choice == 1){
                        for (let item of juzheng_ming){
                            num[item]++
                        }
                    }
                    else{
                            for (let item of new_ju){
                            num[item]++
                        }
                    }

            }

            onMounted(()=>{
                
                change()
                change1()
            })

            const change = () => {
                let chartBox

                const option = {
                 xAxis: {
                    data: ["A", "B", "C", "D", "E", "F", "G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
                    },
                    yAxis: {},
                    series: [
                    {
                        type: "bar",
                        data: num
                    },
                    ],
                };
                        chartBox = echarts.init(document.getElementById("smg")) // 主要
                        chartBox.setOption(option)
                console.log(11)
                // 根据页面大小自动响应图表大小
                // window.addEventListener("resize", function () {
                //     chartBox.resize();
                // });
        }

            const change1 = () => {
                
                let chartBox1
                const option = {
                    xAxis: {
                    data: ["A", "B", "C", "D", "E", "F", "G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
                    },
                    yAxis: {},
                    series: [
                    {
                        type: "bar",
                        data: num
                    },
                    ],
                };

                    chartBox1 = echarts.init(document.getElementById("zwz"))
                        chartBox1.setOption(option)
                
                // 根据页面大小自动响应图表大小
                // window.addEventListener("resize", function () {
                //     chartBox.resize();
                // });
                }
            return{
                mingwen,
               juzheng_ming,
                juzheng,
                result,
                radioVal,
                tianchong,
                start,
                jiami
            }
    }
}
</script>

<style>
.hill{
    text-align: center;
}
.hill>div{
    margin-bottom: .5rem;
}
#smg{
    display: inline-block;
}
#smg>div{
           position: flex !important;;
}
#zwz{
    display: inline-block;
}
#zwz>div{
           position: flex !important;;
}
</style>