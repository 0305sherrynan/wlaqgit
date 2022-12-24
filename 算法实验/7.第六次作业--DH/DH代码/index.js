//引入
import DH from './base.js'
function start(){
    //参数p的生成
    let p = DH.random_prime()
    //参数g的生成
    let g =DH.searchPToG(p)
    console.log('p (素数) is '+p)
    console.log('g (生成元) is '+g)
    //获取两个随机数
    let a = 1+Math.floor(Math.random()*(p-2)+0.5)
    let b = 1+Math.floor(Math.random()*(p-2)+0.5)
    //用BigInt 数据类型解决数据溢出问题
    let X = BigInt(Math.pow(g,a))%BigInt(p)
    let Y = BigInt(Math.pow(g,b))%BigInt(p)
    let last1 = BigInt(DH.bigIntPow(Y,a))%BigInt(p)
    let last2 = BigInt(DH.bigIntPow(X,b))%BigInt(p)
    console.log('a (随机数a) is '+a)
    console.log('b (随机数b) is '+b)
    console.log('X  is '+X)
    console.log('Y is '+Y)
    console.log('密钥 (在A处生成)'+Number(last1))
    console.log('密钥 (在B处生成)'+Number(last2))
}
//由于pow不支持BigInt类型，所以自己封装一个

start()