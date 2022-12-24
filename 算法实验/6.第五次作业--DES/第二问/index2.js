import DES from './base2.js'
//遍历次数
const times = 10
//初始明文，后续按位改变
var bt = [1,0,0,0,1,0,1,1,
    1,0,1,1,0,1,0,0,
    0,1,1,1,1,0,1,0,
    0,0,0,0,1,1,0,0,
    1,1,1,1,0,0,0,0,
    1,0,1,0,1,0,0,1,
    0,1,1,0,0,0,1,0,
    0,1,1,0,1,1,0,1]
//存放变化位数的数组
export var change_number_arr = []
//最终结果
var final_num = 0
//自定义深拷贝数组
function deep_arr(arr){
    let copy_arr = []
    for (let item of arr){
        copy_arr.push(item)
    }
    return copy_arr
}
//比较两个密文数组，获得变化的个数
function compare_arr(arr,new_arr){
    let count = 0
    for (let key in arr){
        // console.log(arr[key],new_arr[key])
        if (arr[key] !== new_arr[key]) count++
    }
    // console.log("\n")
    return count
}
//随机生成密钥
function random_key(){
    let keyB = []
    for (let i = 0;i<64;i++) keyB.push(parseInt( Math.floor(Math.random()+0.5)))
    // console.log(bt)
    return keyB
}
//随机改变i位明文
function random_change_bt(arr,i){
    //arr1用于存放改变的位数--用于判断是否存在
    let arr1 = []
    for (let j=0;j<=i;j++){
        let num = random_num()
        //第一次的时候不用判断是否存在
        if (j === 0){
            arr1.push(num)
            //将1换成0；将0换成1
            arr[num] = (arr[num] === 0?1:0)
        }else{        //后续需要判断是否存在
            for(let k = 0;k<arr1.length;k++){
                //若存在，重新随机一个值，并重头开始判断是否存在（k = -1）
                if (num === arr1[k]) {
                    num = random_num()
                    k = -1
                    continue
                }
            }
            //将将要改变的位数索引号存入arr1
            arr1.push(num) 
            //将1换成0；将0换成1
            arr[num] = (arr[num] === 0?1:0)
        }

    }
    
}
//获得随机数
function random_num(){
    return Math.floor(Math.random()*63+0.5)
}
//用于将数组内的重复值去除
// function clean_repeat(arr){
//     let s1 = new Set(arr)
//     return Array.from(s1)
// }
//开始运行函数
function start(){
    for (let j = 0;j<times;j++){

            //生成密钥--调用random_key()
            let keyB = random_key()
            //计算出初始密文--用于比较
            const init_secert_value = DES.test(bt,keyB)

            //64次，改变各位数
            for (let i = 0;i < 64;i++){
                //获得一个深拷贝明文的数组
                let copy_bt = deep_arr(bt)
                //改变一位，是1变0；是0变1
                // console.log(copy_bt)
                // copy_bt[i] = (copy_bt[i] === 0?1:0)
                //调用该函数，随机改变i位
                random_change_bt(copy_bt,i)
                // console.log(copy_bt)
                //再次调用DES，获得新的密文
                let new_secret_value = DES.test(copy_bt,keyB)
                //将数据填入统计数组 第一次直接push就行；后面在第一次的基础上增加
                if (j===0)  change_number_arr.push(compare_arr(init_secert_value,new_secret_value))
                else change_number_arr[i] += compare_arr(init_secert_value,new_secret_value)
            }
            // console.log(change_number_arr)
    }
    //最后一步，统计出平均数据
    for (let key in change_number_arr){
        change_number_arr[key] = parseFloat(change_number_arr[key])/times
    }
    // console.log(change_number_arr)
}
start()

