import DEC from './base.js'
//将十进制转为二进制六位
function getBoxBinary_64(i){
    var binary = "";
    switch (i) {
      case 0 :binary = "000000";break;
      case 1 :binary = "000001";break;
      case 2 :binary = "000010";break;
      case 3 :binary = "000011";break;
      case 4 :binary = "000100";break;
      case 5 :binary = "000101";break;
      case 6 :binary = "000110";break;
      case 7 :binary = "000111";break;
      case 8 :binary = "001000";break;
      case 9 :binary = "001001";break;
      case 10 :binary = "001010";break;
      case 11 :binary = "001011";break;
      case 12 :binary = "001100";break;
      case 13 :binary = "001101";break;
      case 14 :binary = "001110";break;
      case 15 :binary = "001111";break;
      case 16 :binary = "010000";break;
      case 17 :binary = "010001";break;
      case 18 :binary = "010010";break;
      case 19 :binary = "010011";break;
      case 20 :binary = "010100";break;
      case 21 :binary = "010101";break;
      case 22 :binary = "010110";break;
      case 23 :binary = "010111";break;
      case 24 :binary = "011000";break;
      case 25 :binary = "011001";break;
      case 26 :binary = "011010";break;
      case 27 :binary = "011011";break;
      case 28 :binary = "011100";break;
      case 29 :binary = "011101";break;
      case 30 :binary = "011110";break;
      case 31 :binary = "011111";break;
      case 32 :binary = "100000";break;
      case 33 :binary = "100001";break;
      case 34 :binary = "100010";break;
      case 35 :binary = "100011";break;
      case 36 :binary = "100100";break;
      case 37 :binary = "100101";break;
      case 38 :binary = "100110";break;
      case 39 :binary = "100111";break;
      case 40 :binary = "101000";break;
      case 41 :binary = "101001";break;
      case 42 :binary = "101010";break;
      case 43 :binary = "101011";break;
      case 44 :binary = "101100";break;
      case 45 :binary = "101101";break;
      case 46 :binary = "101110";break;
      case 47 :binary = "101111";break;
      case 48 :binary = "110000";break;
      case 49 :binary = "110001";break;
      case 50 :binary = "110010";break;
      case 51 :binary = "110011";break;
      case 52 :binary = "110100";break;
      case 53 :binary = "110101";break;
      case 54 :binary = "110110";break;
      case 55 :binary = "110111";break;
      case 56 :binary = "111000";break;
      case 57 :binary = "111001";break;
      case 58 :binary = "111010";break;
      case 59 :binary = "111011";break;
      case 60 :binary = "111100";break;
      case 61 :binary = "111101";break;
      case 62 :binary = "111110";break;
      case 63 :binary = "111111";break;
    }
    return binary;
   }
//主函数
function volume_up(){
    //声明一个差分
    let input_diff_value = "101000"
    //用于存放符合条件的内容
    let arr = []
    //初始输出差分
    let output_diff_value = 0
    //遍历每一个输出差分
    for (let i = 0 ; i < 16 ; i++ ){
        //输出差分转为二进制四位
        output_diff_value =  DEC.getBoxBinary(i)
        //遍历所有输出值--六位二进制
        for (let j = 0;j < 64;j++){
            //输入值（二进制六位）
            let input_value = getBoxBinary_64(j)
            //输入值和初始差分进行异或，再进行S盒运算得到结果：result_one
            let result_one = DEC.sBoxPermute(DEC.xor(input_diff_value,input_value))
            //arr用于存放由字符串类型的输入值input_value转化为数组类型（是由于S盒运算的是数组，需要这一步）
            let arr1 = []
            for (let item of input_value){
                arr1.push(parseInt(item))
            }
            //将正常的输入值进行S盒运算，然后与上方的result_one进行异或运算得到resulit_two
           //resulit_two为int数组再转字符串--为了后续与输出差分output_diff_value（字符串类型）比较
            let resulit_two = DEC.xor(DEC.sBoxPermute(arr1),result_one).join("")
            //resulit_two与输出差分output_diff_value一致，则输入值为有可能的值
            if (resulit_two === output_diff_value){
                arr.push(input_value)
            }
        }
        //浏览器输出
        console.log(`输出差分：${output_diff_value} 数量：${arr.length} 可能的输入：${arr.join("    ")}` )
    }
}
//主函数运行
volume_up()