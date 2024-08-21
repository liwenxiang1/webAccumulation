"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[858],{1534:(i,n,d)=>{d.r(n),d.d(n,{comp:()=>s,data:()=>o});var e=d(641);const a=(0,e.Fv)('<h1 id="cordova文档" tabindex="-1"><a class="header-anchor" href="#cordova文档"><span>Cordova文档</span></a></h1><h3 id="一、常用命令" tabindex="-1"><a class="header-anchor" href="#一、常用命令"><span>一、常用命令</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>npm install -g cordova                 // 安装 cordova\n \nnpm update -g cordova                  // 更新 cordova\n \nnpm info cordova                       // 查看 cordova 信息\n \ncordova platform [ls | list]           // 查询工程支持哪些平台\n \ncordova platform update android        // 更新 android 项目\n \ncordova platform update ios            // 更新 ios 项目\n \ncordova create myapp                   // 创建一个 Cordova 项目\n \ncordova requirements                   // 查看安装 cordova 所需要的配置\n \ncordova help create                    // cordova 帮助命令\n \ncordova platform add browser           // 创建浏览器文件\n \ncordova platform add ios               // 创建 ios 版本\n \ncordova platform add android           // 创建安卓版本\n \ncordova build android --release --prod // 打包出 APK 文件 \n \ncordova platform rm android            // 删除 android 平台支持\n \ncordova platform rm ios                // 删除 ios 平台支持\n \ncordova platform up android            // 更新 android 平台版本\n \ncordova platform up ios                // 更新 ios 平台版本\n \n \ncordova plugin [ls | list]             // 查询工程包含的插件列表\n \n// 为工程添加一个或者多个插件\ncordova plugin add &lt;path-to-plugin&gt; [&lt;path-to-plugin&gt;...]\ncordova plugin add cordova-plugin-device\ncordova plugin add https://github.com/apache/cordova-plugin-console.git\n \n// 从该工程中删除某个插件\ncordova plugin [rm | remove] &lt;path-to-plugin&gt; [&lt;path-to-plugin&gt;...]\ncordova plugin rm cordova-plugin-device\ncordova plugin remove cordova-plugin-device\n \n// 根据关键字搜索插件\ncordova plugin search [&lt;keyword1&gt; &lt;keyword2&gt; ...]\ncordova plugin search camera\n \n \n// 编译指定平台的 app 包\ncordova build [platform...]\ncordova build ios\ncordova build android   相当于  cordova prepare android | cordova compile android\ncordova build browser\n \n// 启动模拟器运行应用\ncordova emulate [&lt;platform&gt; [&lt;platform&gt; [...]]]\ncordova emulate android\n \n// 在移动设备上运行应用\ncordova run [&lt;platform&gt; [&lt;platform&gt; [...]]]\ncordova run android\ncordova run ios\n \n// 启动本地 web 服务来访问\ncordova serve [port]\ncordova serve 或 cordova serve 8080\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、常用网址" tabindex="-1"><a class="header-anchor" href="#二、常用网址"><span>二、常用网址</span></a></h3>',4),l={href:"https://ionicframework.com/docs",target:"_blank",rel:"noopener noreferrer"},r={href:"https://cordova.apache.org/",target:"_blank",rel:"noopener noreferrer"},v={},s=(0,d(6262).A)(v,[["render",function(i,n){const d=(0,e.g2)("ExternalLinkIcon");return(0,e.uX)(),(0,e.CE)("div",null,[a,(0,e.Lk)("p",null,[(0,e.Lk)("a",l,[(0,e.eW)("ionic官网"),(0,e.bF)(d)])]),(0,e.Lk)("p",null,[(0,e.Lk)("a",r,[(0,e.eW)("cordova官网"),(0,e.bF)(d)])])])}]]),o=JSON.parse('{"path":"/markdown/%E5%89%8D%E7%AB%AF/%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93/Cordova.html","title":"Cordova文档","lang":"zh-CN","frontmatter":{},"headers":[{"level":3,"title":"一、常用命令","slug":"一、常用命令","link":"#一、常用命令","children":[]},{"level":3,"title":"二、常用网址","slug":"二、常用网址","link":"#二、常用网址","children":[]}],"git":{},"filePathRelative":"markdown/前端/第三方库/Cordova.md"}')}}]);