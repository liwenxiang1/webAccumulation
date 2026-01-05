# 虚拟机docker使用

* docker命令行启动redis镜像

```
docker run --name redis -p 6379:6379 -v /D/Program Files/docker/redis/conf/redis_6379.conf:/etc/redis/redis_6379.conf -v /D/Program Files/docker/redis/data:/data/ -d redis:latest redis-server /etc/redis/redis_6379.conf
```

### 一、docker配置

* 1.docker-desktop配置阿里云镜像：
    ```
    "registry-mirrors":["https://odbi33ip.mirror.aliyuncs.com"]
    ```
* 2.docker进入redis容器：
    ```
    docker exec -it redis redis-cli
    ```

### 二、redis配置

* 1.设置密码：
    ```
    config set requirepass lhm123
    ```
* 2.查询密码：
    ```
    redis 127.0.0.1:6379> config get requirepass
    ```
* 3.密码验证：
    ````
    redis 127.0.0.1:6379> auth lhm123
    ````
* 4.再次查询：
    ```
    redis 127.0.0.1:6379> config get requirepass
    
    "requirepass"
     
    "lhm123"
    ```

### 三、redis命令

* 1.登陆有密码的Redis：
  ```
  redis-cli -p 6379 -a lhm123
  ```
* 2.先登陆后验证
  ```
  redis-cli -p 6379
  redis 127.0.0.1:6379> auth lhm123
  OK
  ```
