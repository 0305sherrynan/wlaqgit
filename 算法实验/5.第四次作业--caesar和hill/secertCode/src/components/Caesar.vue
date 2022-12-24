<template>
    <div class="middle">
        <div>
            明文 <input type="text" v-model="mingwen" >
        </div>
        <div>
            密文 <input type="text" v-model="miwen">
        </div>
        <div>
         移动位数 <input type="text" v-model="weishu">
        </div>
        <div>
            执行的操作
                <label><input v-model="radioVal" type="radio" value="加密" >加密</label>
                <label><input v-model="radioVal" type="radio" value="解密" >解密</label>

        </div>
        <div>
            执行结果 <input type="text" v-model="result">
        </div>
        <div id="main" style="width: 600px;height:429px;"></div>
        <div id="ope_result"  style="width: 600px;height:400px;"></div>
        <button @click="start" >开始执行</button>
        
    </div>
</template>

<script>
import {onMounted, reactive, ref } from 'vue'
// import { it } from 'element-plus/es/locale'
import * as echarts from "echarts"
export default {
        name:'Caesar',
        setup(){
            let radioVal = ref()
            let mingwen = ref()
            let miwen = ref()
            let weishu = ref()
            let result = ref()
            let num = reactive([])
            

            //开始判断加密还是解密
            function start(){
                //先将表格数据清空
                num = []
                //将数据填充零
                for (let i=0;i<26;i++){    
                    num.push(0)
                }
                if (radioVal.value == '加密')    jiami()
                else jiemi()
                //先将表格数据清空
                num = []
                //将数据填充零
                for (let i=0;i<26;i++){    
                    num.push(0)
                }
                //表格数据填充
                getDataAndCalculate(3)
                //刷新表格数据
                change1()
            }

            //加密
            function jiami(){
                //存放结果，先清空
                result.value = ''
                //遍历字符串，将结果存放到result
                for (let item of mingwen.value){
                    //只针对字母
                    if (item >='a'&&item<='z' || item>='A'&&item<='Z'){
                        //转大写
                        item = item.toUpperCase()
                        //获得ASCII码
                        let item_asc = item.charCodeAt()  
                        //ASCII码加上位数，并取模判断
                        item = String.fromCharCode(((item_asc+parseInt(weishu.value))%90) >= 65?(item_asc+parseInt(weishu.value)):((item_asc+parseInt(weishu.value))%90+65))
                    }
                     result.value+=item
                   
                }
                console.log(result.value)
                //表格数据填充
                getDataAndCalculate(1)
                //刷新表格数据
                change()
            }
            //解密
            function jiemi(){
                //结果清零
                result.value = ''
                //遍历字符串
                for (let item of miwen.value){
                    if (item>='A'&&item<='Z'){
                        item = item.toLowerCase()
                        let item_asc = item.charCodeAt()
                        item = String.fromCharCode((item_asc-parseInt(weishu.value)) >= 97?(item_asc-parseInt(weishu.value)):(122-parseInt(weishu.value)))
                    }
                    result.value+=item
                }
                //表格数据填充
                getDataAndCalculate(2)
                //刷新表格数据
                change()
            }
            
            //表格数据填充
            function getDataAndCalculate(choice){
                if (choice == 1){
                    for (let item of mingwen.value){
                        num[(item.toUpperCase()).charCodeAt()-65]++
                        console.log((item.toUpperCase()).charCodeAt()-65)
                    }
                }
                else if (choice == 2){
                    for (let item of miwen.value){
                        num[(item.toUpperCase()).charCodeAt()-65]++
                        console.log((item.toUpperCase()).charCodeAt()-65)
                    }
                }
                else {
                    for (let item of result.value){
                        num[(item.toUpperCase()).charCodeAt()-65]++
                        console.log((item.toUpperCase()).charCodeAt()-65)
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
                        chartBox = echarts.init(document.getElementById("main")) // 主要
                        chartBox.setOption(option)
 
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

                    chartBox1 = echarts.init(document.getElementById("ope_result"))
                        chartBox1.setOption(option)
                
                // 根据页面大小自动响应图表大小
                // window.addEventListener("resize", function () {
                //     chartBox.resize();
                // });
                }
            return {
                mingwen,
                miwen,
                weishu,
                result,
                radioVal,
                num,
                start,


            }
}
}
</script>

<style>
.middle{
text-align: center;
}
.middle>div{
    margin-bottom: .5rem;
}
#main{
    display: inline-block;

}
#ope_result{
    display: inline-block;

}
#main>div{
           position: flex !important;;
}
#ope_result>div{
           position: flex !important;;
}
</style>