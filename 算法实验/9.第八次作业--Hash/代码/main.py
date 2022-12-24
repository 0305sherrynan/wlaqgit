
import os  # 应用文件操作
import hashlib  # 文件对比操作
import logging  # 日志函数操作
import sys  # 系统应用操作
def print_md5(md):
    print(md)
def print_hi():
    logger = logging.getLogger('系统文件去重')
    logging.basicConfig(format='%(asctime)s %(levelname)-8s: %(message)s')
    logger.setLevel(logging.DEBUG)
    diretory = input('请输入需要整理的文件目录: \n')  # 去重的文件夹路径

    if os.path.isdir(diretory):
        logger.info('当前目录[' + diretory + ']校验成功！')
        md5s = []
        for file_path, dir_names, file_names in os.walk(r'' + diretory):
            for file_name in file_names:
                try:
                    file_name_path = os.path.join(file_path, file_name)

                    logger.info('当前比对路径: ' + file_name_path)
                    md5 = hashlib.md5()

                    file = open(file_name_path, "rb")
                    md5.update(file.read())
                    file.close()
                    md5_value = md5.hexdigest()
                    if md5_value in md5s:
                        md5s.append(md5_value)
                        print_md5(md5s)
                        os.remove(file_name_path)
                        logger.info('[' + file_name_path + ']出现重复已经移除！')
                    else:
                        md5s.append(md5_value)
                        print_md5(md5s)
                except:
                    logger.error('[' + file_name_path + ']对比发生异常，执行下一个！')

    else:
        logger.error('输入的文件夹或者目录不存在！')


if __name__ == '__main__':
   print_hi()

