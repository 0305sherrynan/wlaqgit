# 编程实现DH密钥协商协议 
## 使用语言 ：javascript
## 运行环境：nodejs
## 使用说明
- 1.安装nodejs
- 2.在终端运行如下代码
![Alt](./img/%E8%BF%90%E8%A1%8C%E4%BB%A3%E7%A0%81.png)
- 3.运行结果：最终两处密钥应该是一样的，符合算法
![Alt](./img/%E8%BF%90%E8%A1%8C%E7%BB%93%E6%9E%9C.png)
## 文件说明
- index.js -- 包含运行的主函数文件
- base.js -- 封装好各种功能函数，index.js从中引入，使用其中函数
- package.json -- 配置运行选项。如此次用到ES6模块，故填入 "type": "module"
## 具体功能函数实现
### base.js
- 判断是否为素数（质数）：让i从2遍历到num，中间的数不会让for循环提前结束，即不会被整除，则为素数
```javascript
//判断是否为素数
function isPrime(num){
    let i = 2
    for (;i<num;i++){
        if (num%i===0) break
    }
    if (i === num) return true
    else return false
}
```
- 封装的支持BigInt数据类型的pow函数：由于随机出来的数进行幂运算会导致正常的number类型数据溢出，所以我们需要用到支持更大范围的BigInt类型。但由于Math.pow函数不支持BigInt类型，所以我们需要封装一个支持该类型的pow方法。
```javascript
//封装的BigInt pow函数
function bigIntPow(x, y) {
    if(y === 0n){
      return 1n;
    }
    let result = x;
    for(let i = 1n; i < y; i++){
      result *= x;
    }
    return result;
  }
```
- 计算b^n mod m 
```javascript
// 计算 b^n mod m 
function ExpMod(b,n,m){
   
    return  (((Math.pow(b,n)%m) % m) + m) % m
}
```
- 随机生成一个3-30的素数:利用Math.random生成0到1（不包括1）的值，然后乘以右边界30，加上0.5，然后向下取整使用Math.floor，即可实现
```javascript
//随机生成一个3-30的素数
function random_prime(){
    let num = 0
    do{
         num = Math.floor(Math.random()*30+0.5)
    }while(isPrime(num) === false || num == 2)
    return num
}
```
- 寻找p的生成元：满足条件：从 g 从2，3等较小的数开始进行穷举。 计算 g^n mod p ， 1<=n < p-1 的到的数据不同，g即为生成元。在isPrimeRoot实现的逻辑是计算n从1到p-2时的g^n mod p的结果，存入一个数组，然后我们通过Set数据类型进行去重，再转换为数组，如果数组的长度不变（或者长度等于p-2），则g是p的生成元
```javascript
//判断g是模p乘的生成元
function isPrimeRoot(p,g){
    //存放每次运算的结果
    let arr = []
    // 计算g^n mod p
    for (let n = 1;n<p-1;n++){
        arr.push(ExpMod(g,n,p))
    }
    //去除重复
    let s1 = new Set(arr)
    //转换为数组
    let new_arr = Array.from(s1)
    //没有重复的，符合条件
    if (new_arr.length === p-2) return true
    else return false
}
//寻找p的生成元
function searchPToG(p){
    for (let g = 2;;g++){
        if (isPrimeRoot(p,g)) return g
    }
}
```