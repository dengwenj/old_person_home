## 《社区养老院管理系统的设计与实现》

### 连接到数据库

* SQL 文件目录有 -> oldpersonhome.sql
* 在当前目录下新建 `.env`文件，写入：

```ts
APP_PORT='你的端口'

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=oldpersonhome
MYSQL_USER=root
MYSQL_PASSWORD='你的数据库密码'
```
