# 第七次作业RSA算法
## 要求：计算 ：在一个RSA系统中，一个给定用户的公钥 e = 31, n = 3599.求这个用户的私有密钥。 
## 使用语言 ：javascript
## 运行环境：nodejs
## 使用说明
- 1.安装nodejs
- 2.在终端运行如下代码
 ![Alt](./img/%E8%BF%90%E8%A1%8C.png)
- 3.运行结果：3599确实是由质数59和61相乘得到;再得到T；最后通过条件得到私钥
 ![Alt](./img/%E8%BF%90%E8%A1%8C%E7%BB%93%E6%9E%9C.png)
 ## 具体功能函数实现
```javascript
 //创建范围内的素数数组
 //params：border为素数的范围
function create_prime_arr(border){
    let arr = []
    for (let i = 2;i<=border;i++){
        if (isPrime(i)) arr.push(i)
    }
    return arr
}
```
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
```javascript
//寻找数N所组成的两个素数
//params:N(质数相乘)
function search_two_primes(arr,N){
    let prime_arr = []
    for (let item of arr){
        for (let item2 of arr){
            if (item*item2===N) {
                prime_arr.push(item)
                prime_arr.push(item2)
                return prime_arr
            }
        }
    }
}
```
```javascript
//计算私钥
//params:E(公钥)；N(质数相乘)
function personal_key(E,N){
    //创建97以内的素数数组
    let prime_arr = create_prime_arr(97)
    //找到对应的两个素数
    let primes_arr = search_two_primes(prime_arr,N)
    console.log('N:'+N+' 由这两素数相乘得到：'+primes_arr)
    //计算欧拉函数
    let T = (primes_arr[0]-1)*(primes_arr[1]-1)
    console.log(`欧拉函数 T = (${primes_arr[0]}-1)*(${primes_arr[1]}-1) = ${T}`)
    for (let i = 1;;i++){
        if ((i*E)%T === 1) {
            console.log(`私有公钥D满足条件：(D*${E})%${T} = 1`)
            return i
        }
    } 
}
```
