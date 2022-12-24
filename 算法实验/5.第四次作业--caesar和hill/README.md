
# 1、使用语言与工具
## vue3+echarts.js、vscode
# 2、项目启动
## 2.1、方法一：直接项目启动
### 2.1.1、安装依赖
- npm install 
### 2.1.1、启动
- npm run serve
## 2.2、方法二：使用打包好的资源（在dist文件下的index.html;但需要开启临时服务器）
### 这里推荐用vscode里的open with live server插件
### 插件安装
![Alt](./img/%E6%8F%92%E4%BB%B6.png)
### 运行
![Alt](./img/%E6%89%93%E5%8C%85.png)
# 3、使用
## 3.1、用户界面
打开启动后项目所在地址，可以看到最上面的Caesar和Hill按钮是用于切换算法界面；最下面的开始执行是启动按钮；两个坐标轴是用于统计执行前和执行后的字符统计。
![Alt](./img/%E7%95%8C%E9%9D%A2.png)
## 3.2、Caesar算法演示
### 3.2.1、加密
- 输入明文：abcdefghijklmnopq rst UVW `大写小写、加入空格数字都可以`
- 输入移动位数 `只能是数字`
- 选择加密操作
####        结果如下：CDEFGHIJKLMNOPQRSC TUV WXY
![Alt](./img/%E6%98%8E%E6%96%87%E7%BB%93%E6%9E%9C.png)
### 3.2.2、解密
- 输入密文：CDEFGHIJKLMNOPQRSC TUV WXY 
- 输入移动位数 
- 选择解密操作
#### 结果如下：abcdefghijklmnopqa rst uvw `与原结果一致，只是大小写全为小写`
![Alt](./img/%E8%A7%A3%E5%AF%86%E7%BB%93%E6%9E%9C.png)
## 3.3、Hill算法演示
### 3.3.1、加密演示   `由于能力原因，尚未完成解密操作`
-  输入明文：参考博客例子：[博客参考](https://blog.csdn.net/qq_25968195/article/details/70343972)，我们输入明文：Pay more money `大写小写、加入空格都可以，会自动过滤和转换`
- 输入密钥：题目要求是3x3矩阵，这里规定以英文`,`相隔，我们输入：17,17,5,21,18,21,2,2,19
- 输入填充字母 :这里任意，因为明文是12个字母，是3的倍数，无需填充
- 选择加密操作
#### 结果如下： 与博客结果一致
![Alt](./img/hill%E7%BB%93%E6%9E%9C.png)
