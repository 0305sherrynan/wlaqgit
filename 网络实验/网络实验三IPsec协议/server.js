//创建基本的web服务器
const http = require('http')
const app = http.createServer()
const fs = require('fs')
const path = require('path')



app.on('request',(req,res)=>{
	const url = req.url
	const fpath = path.join(__dirname,url)
	fs.readFile("./index.html",(err,data)=>{
		res.setHeader("Content-Type","text/html;charset=utf-8")
		res.end(data)
		})
   // res.write('hello world')
	//res.end()
})



//监听接口
app.listen(8888,'192.168.1.13')