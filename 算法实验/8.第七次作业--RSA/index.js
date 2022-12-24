//创建范围内的素数数组
function create_prime_arr(border){
    let arr = []
    for (let i = 2;i<=border;i++){
        if (isPrime(i)) arr.push(i)
    }
    return arr
}
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
//判断是否为素数
function isPrime(num){
    let i = 2
    for (;i<num;i++){
        if (num%i===0) break
    }
    if (i === num) return true
    else return false
}
//主函数
function start(){
    let answer = personal_key(31,3599)
    console.log('私有公钥为：'+answer)
}
start()