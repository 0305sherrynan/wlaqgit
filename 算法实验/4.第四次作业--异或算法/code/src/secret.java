import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
public class secret {


    public static char[] secret_key;
    public static  String input_file;
    public static  String output_file;
    public static void main(String[] args) {
        //密钥
        secret_key = args[0].toCharArray();
        //输入文件
        input_file = args[1];
        //输出文件
        output_file = args[2];
        //
        try {
            read_file(input_file,output_file);
        }catch (IOException e){};
    };



    // 文件读取
    public static void read_file(String file_name_input,String file_name_output) throws IOException {
        String each_line = "";
        String result_info = "";
        //输入文件路径
        String file_path_input = ".\\src\\file_Box\\"+file_name_input;
        String file_path_output = ".\\src\\file_Box\\"+file_name_output;

        //输入文件打开读操作
        File file = new File(file_path_input);
        InputStreamReader streamReader = new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8);
        BufferedReader bufferedReader = new BufferedReader(streamReader);

        //输出文件打开写操作
        File file2 = new File(file_path_output);
        FileWriter fileWriter = new FileWriter(file2);
        //输出文件内容清空
        fileWriter.write("");
        fileWriter.close();

        FileWriter fw = new FileWriter(file_path_output, true);
        BufferedWriter bw = new BufferedWriter(fw);
//        char [] str = [];
        each_line =bufferedReader.readLine() ;
        char [] str = each_line.toCharArray();
        //读取单行内容
        while (each_line != null){

            //将字符串转为字符数组

            //用于保存是否为最后一个密钥
            char  last_key = 'a';
            for (int i =0;i<str.length;i++){
                if (i >= secret_key.length){
                    str[i] = (char) (str[i]^last_key);
                }
                else {
                    last_key = secret_key[i];
                    str[i] = (char) (str[i]^secret_key[i]);
                }
            }
            String str1 = new String(str);
            bw.write(str1+"\n");
            each_line =bufferedReader.readLine() ;
            if (each_line != null)
            str = each_line.toCharArray();
        }


        //继续打开读操作，读入

        bw.close();
        fw.close();



    }
}
