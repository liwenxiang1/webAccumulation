<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-10-09 10:33:43
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2024-10-09 10:51:22
 * @FilePath: \webAccumulation\docs\mianshi\Nginx配置.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

## Nginx 常见配置

```
    server {
        listen       9000;
        server_name  192.168.4.32;   #监听地址

        location  ~ /example1/ {
           proxy_pass http://127.0.0.1:5000;
        }

        location  ~ /example2/ {
           proxy_pass http://127.0.0.1:8080;
        }
    }
```

location 指令用于匹配 URL，proxy_pass 指令用于反向代理，将请求转发到指定的地址。

_location 指令说明：_

```
~ : 表示 uri 包含正则表达式，且区分大小写。
~* : 表示 uri 包含正则表达式，且不区分大小写。
= : 表示 uri 不含正则表达式，要求严格匹配。
```

## Nginx 配置 gzip 压缩

```
    server {
        listen       9000;
        server_name  192.168.4.32;   #监听地址

        gzip on; //启用gzip压缩。
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; //指定哪些MIME类型的响应内容需要压缩。
        gzip_min_length 1024; //设置启用压缩的最小响应内容长度。
        gzip_comp_level 6; //设置压缩级别，级别越高，压缩率越高，但CPU消耗也越高。
        gzip_proxied any; //设置代理服务器是否启用压缩。
        gzip_vary on; //设置是否在响应头中添加 Vary: Accept-Encoding 字段，以告知客户端是否启用压缩。
        gzip_disable "MSIE [1-6]\."; //设置哪些客户端禁用压缩。

```

## Nginx 配置负载均衡

```
    upstream backend {
        server 127.0.0.1:5000;
        server 127.0.0.1:8080;
    }

    server {
        listen       9000;
        server_name  192.168.4.32;   #监听地址

        location  ~ /example1/ {
           proxy_pass http://backend;
        }
    }
```

upstream 指令用于定义一组后端服务器，proxy_pass 指令用于将请求转发到后端服务器。

## Nginx 配置缓存

```
    server {
        listen       9000;
        server_name  192.168.4.32;   #监听地址

        location  ~ /example1/ {
            proxy_pass http://192.168.4.32:5000；#如果没有缓存则转向请求
            proxy_redirect off;
            proxy_cache cache_one;
            proxy_cache_valid 200 1h;            #对不同的 HTTP 状态码设置不同的缓存时间
            proxy_cache_valid 500 1d;
            proxy_cache_valid any 1m;
            expires 1d;  #设置缓存时间为1天
        }
    }
```

`expires` 指令用于设置缓存时间。通过 expires 参数设置，可以使浏览器缓存过期时间之前的内容，减少与服务器之间的请求和流量。也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可，所以不会产生额外的流量。此种方法非常适合不经常变动的资源。

**nginx 分配服务器策略:**

**- 轮询(默认)**

按请求的时间顺序依次逐一分配，如果服务器 down 掉，能自动剔除。

**- 权重**

`weight` 越高被分配的客户端越多，默认为 1

```
upstream backend {
    server 127.0.0.1:5000 weight=1;
    server 127.0.0.1:8080 weight=2;
}
```

**- ip_hash**

每个请求按访问 `ip` 的` hash` 结果分配，这样每个访客固定访问一个后端服务器

```
upstream backend {
    ip_hash;
    server 127.0.0.1:5000;
    server 127.0.0.1:8080;
}
```

**- fair**

按后端服务器的响应时间来分配请求，响应时间短的优先分配。

```
upstream backend {
    fair;
    server 127.0.0.1:5000;
    server 127.0.0.1:8080;
}
```

**- url_hash**

按访问 url 的 hash 结果来分配请求，使每个 url 定向到同一个后端服务器，后端服务器为缓存时比较有效。

```
upstream backend {
    hash $request_uri;
    server 127.0.0.1:5000;
    server 127.0.0.1:8080;
}
```

## Nginx 动静分离

```
upstream static {
    server 192.167.4.31:80;
}

upstream dynamic {
    server 192.167.4.32:8080;
}

server {
    listen       80;   #监听端口
    server_name  www.abc.com; 监听地址

    # 拦截动态资源
    location ~ .*\.(php|jsp)$ {
       proxy_pass http://dynamic;
    }

    # 拦截静态资源
    location ~ .*\.(jpg|png|htm|html|css|js)$ {
       root /data/;  #html目录
       proxy_pass http://static;
       autoindex on;;  #自动打开文件列表
    }
}
```
