# Idea开发工具的插件及功能优化

其他Idea便捷使用

* [IntelliJ IDEA的terminal设置成和Linux的终端一样][IntelliJ IDEA的terminal设置成和Linux的终端一样]
* [使用IntelliJ IDEA开发工具编写Web项目并部署服务器][使用IntelliJ IDEA开发工具编写Web项目并部署服务器]

### 一、IDE识别webpack的别名alias

设置Idea的webpack路径即可
> `项目路径\node_modules\@vue\cli-service\webpack.config.js`

[参考文章](https://blog.csdn.net/z591102/article/details/107511690)

![idea-webpack.png](../image/idea-webpack.png)

### 二、IDE2019添加`git-push`按钮到工具栏

[参考:idea中使用Git在工具栏中添加push按钮](https://blog.csdn.net/qq_40852612/article/details/101060535)

![idea-git-push.jpg](../image/others/idea-git-push.jpg)

**这里不同的是：第三步的` Navigation Bar Toolbar `使用的是` Main Toolbar`**

### 三、IDE添加经常访问的文件到项目的`Favorites`里面

例如有一个操作是：我在开发前端Vue项目时经常需要访问之前记录的`Vue知识.md`文件查看里面的一些代码。

正常情况下，每次都需要打开`Knowledge`->`markdown`->`前端`文件夹，打开`vue知识.md`文件进行查看。

> 使用idea的`favorites`功能就可以将常用的文件放到`favorites`标签下，使用的时候直接打开就可以了。
>> 同理，如果项目中的经常访问的文件也可以放到该标签下面方便查找使用
![](../image/others/idea-favorite.png)

### 四、IDEA查看类中的方法快捷键

```
Ctrl + F12
```

> 使用方法就是将`vue知识.md`文件拖到`idea`开发工具中打开，右击标签栏在出现的选项中选择`Add to Favorites`，
> 之后就可以在`Favorites`标签下找到`vue知识.md`文件并可以直接打开了。

~~**这里唯一的缺点就是：Favorites功能都是针对项目来的，不同项目之间不能共享Favorite数据。~~

[IntelliJ IDEA的terminal设置成和Linux的终端一样]:https://juejin.cn/post/6869683920628580360

[使用IntelliJ IDEA开发工具编写Web项目并部署服务器]:https://juejin.cn/post/6872275904538771463
