import DES from './base2.js'
//遍历次数
const times = 10
//初始密文，后续按位改变
var keyB = [1,0,0,0,1,0,1,1,
    1,0,1,1,0,1,0,0,
    0,1,1,1,1,0,1,0,
    0,0,0,0,1,1,0,0,
    1,1,1,1,0,0,0,0,
    1,0,1,0,1,0,0,1,
    0,1,1,0,0,0,1,0,
    0,1,1,0,1,1,0,1]
    // var bt = [1,1,1,1,1,1,1,1,
    //     1,1,1,1,1,1,1,1,
    //     1,1,1,1,1,1,1,1,
    //     1,1,1,1,1,1,1,1,
    //     1,1,1,1,1,1,1,1,
    //     1,1,1,1,1,1,1,1,
    //     1,1,1,1,1,1,1,1,
    //     1,1,1,1,1,1,1,1]
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
    console.log("\n")
    return count
}
//随机生成明文
function random_bt(){
    let bt = []
    for (let i = 0;i<64;i++) bt.push(parseInt( Math.floor(Math.random()+0.5)))
    // console.log(bt)
    return bt
}
//随机改变i位密钥
function random_change_keyB(arr,i){
    //arr1用于存放改变的位数
    let arr1 = []
    for (let j=0;j<=i;j++){
        let num =random_num()
        if (j === 0){
            arr1.push(num)
            arr[num] = (arr[num] === 0?1:0)
        }else{
            for(let k = 0;k<arr1.length;k++){
                if (num === arr1[k]) {
                    num =random_num()
                    k = -1
                    continue
                }
            }
            arr1.push(num)
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

            //生成明文--调用random_bt()
            let bt = random_bt()
            //计算出初始密文--用于比较
            const init_secert_value = DES.test(bt,keyB)

            //64次，改变各位数
            for (let i = 0;i < 64;i++){
                //获得一个深拷贝密钥的数组
                let copy_key = deep_arr(bt)
                //改变一位，是1变0；是0变1
                // console.log(copy_bt)
                // copy_bt[i] = (copy_bt[i] === 0?1:0)
                //调用该函数，随机改变i位
                random_change_keyB(copy_key,i)
                // console.log(copy_bt)
                //再次调用DES，获得新的密文
                let new_secret_value = DES.test(copy_key,keyB)
                //将数据填入统计数组 第一次直接push就行；后面在第一次的基础上增加
                if (j===0)  change_number_arr.push(compare_arr(init_secert_value,new_secret_value))
                else change_number_arr[i] += compare_arr(init_secert_value,new_secret_value)
            }
            // console.log(change_number_arr)

           
            
    }
    for (let key in change_number_arr){
        change_number_arr[key] = parseFloat(change_number_arr[key])/times
    }
    console.log(change_number_arr)
}
start()

