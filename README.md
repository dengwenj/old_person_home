## 《社区养老院管理系统的设计与实现》

### 连接到数据库

* SQL 文件目录有 -> oldpersonhome.sql
* 在当前目录下新建 `.env`文件，写入：

```ts
APP_PORT=你的端口

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=oldpersonhome
MYSQL_USER=root
MYSQL_PASSWORD=你的数据库密码
```

### src 文件夹下 app 文件下新增 keys 文件夹(src -> app -> keys) 添加私钥

```ts
进入到 keys 文件下进行如下操作：
mac 系统直接终端输入 openssl。然后输入：
genrsa -out private.key 2048
rsa -in private.key -pubout -out public.key
会生成`private.key` 和 `public.key` 文件

windows 系统打开 git bash，输入 openssl。然后输入：
genrsa -out private.key 2048
rsa -in private.key -pubout -out public.key
会生成`private.key` 和 `public.key` 文件
```
### 用户名：admin 密码：000000
### 前端地址：https://github.com/dengwenj/old_person_home_web