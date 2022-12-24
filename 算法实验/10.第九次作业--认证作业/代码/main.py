
import os  # 应用文件操作
import hashlib  # 文件对比操作
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import MD5
from Crypto.PublicKey import RSA
# hash值读取
def hash_read():
    diretory = '.\data.txt'
    if  os.path.isfile(diretory):
        md5_1 = hashlib.md5()  # 创建一个md5算法对象
        with open(diretory, 'rb') as f:  # 打开一个文件，必须是'rb'模式打开
            while 1:
                data = f.read(1024)  # 由于是一个文件，每次只读取固定字节
                if data:
                    md5_1.update(data)   # 当读取内容不为空时对读取内容进行update
                else:
                    break
        ret = md5_1.hexdigest()        # 获取这个文件的MD5值
        print(ret)
    else:
        print('对应文件路径不存在！')
# 私钥签名
def signature(privatekey,data):
    # 获取data的HASH值
    digest = MD5.new(data.encode('utf-8'))
    # 使用私钥对HASH值进行签名
    signature = pkcs1_15.new(privatekey).sign(digest)
    # 将签名结果写入文件
    sig_results = open("sig_results.txt", "wb")
    sig_results.write(signature)
    sig_results.close()
    # return sig_results


# 公钥验证
def verifier(public_key, data, signature):
    digest = MD5.new(data.encode('utf-8'))
    try:
        pkcs1_15.new(public_key).verify(digest, signature)
        print("验证成功！！！")
    except:
        print("签名无效！！！")

if __name__ == '__main__':
    import os
    import inspect

    hash_read()
    # print(inspect.getfile(os))
    #随机生成一个key
    key = RSA.generate(2048)
    #私钥
    private_key = key.export_key()
    #密钥
    public_key = key.publickey().export_key()
    # print(key)
    # print(public_key)
    # print(private_key)
    # 打开文件，写入私钥、密钥
    with open("privatekey.txt", "wb") as prifile, \
    open("publickey.txt", "wb") as pubfile, \
    open("data.txt", "a") as datafile:
        prifile.write(private_key)
        pubfile.write(public_key)
    # 读取私钥和数据
    with open('privatekey.txt') as prifile, \
    open('data.txt') as datafile:
        private_key = RSA.import_key(prifile.read())
        data = datafile.read()
        signature(private_key,data)
    # 读取公钥和数据，并进行验算
    with open('publickey.txt') as pubfile, \
    open('data.txt') as datafile, \
    open('sig_results.txt', 'rb') as sigfile:
        public_key = RSA.import_key(pubfile.read())
        data = datafile.read()
        signature = sigfile.read()
        verifier(public_key, data, signature)


