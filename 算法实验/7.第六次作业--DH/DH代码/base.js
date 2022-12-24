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
// 计算 b^n mod m 
function ExpMod(b,n,m){
   
    return  (((Math.pow(b,n)%m) % m) + m) % m
}
//随机生成一个3-30的素数
function random_prime(){
    let num = 0
    do{
         num = Math.floor(Math.random()*30+0.5)
    }while(isPrime(num) === false || num == 2)
    return num
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
//暴露
export default{
    searchPToG,
    isPrimeRoot,
    ExpMod,
    random_prime,
    isPrime,
    bigIntPow
}

