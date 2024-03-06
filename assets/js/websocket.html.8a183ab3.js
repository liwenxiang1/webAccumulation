"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[669],{724:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>o,data:()=>c});var t=a(641);const p=[(0,t.Fv)('<h1 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket"><span>websocket</span></a></h1><blockquote><p>websocket 是一种基于 TCP 协议的实时通讯协议，为前端应用提供了强大的双向通讯能力</p></blockquote><h2 id="wensocket-例子" tabindex="-1"><a class="header-anchor" href="#wensocket-例子"><span>wensocket 例子：</span></a></h2><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">socketConnect</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token comment">//客户端和服务器进行连接</span>\n    <span class="token keyword">let</span> ws <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span> <span class="token comment">//返回WebSocket对象，赋值给ws</span>\n    <span class="token comment">//连接成功的回调</span>\n    ws<span class="token punctuation">.</span><span class="token function-variable function">onopen</span> <span class="token operator">=</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span><span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;连接成功&#39;</span><span class="token punctuation">,</span>e<span class="token punctuation">)</span>\n        ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;发送消息给服务端&#39;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">//监听服务器返回消息</span>\n    ws<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span><span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;接收到服务器返回的值&#39;</span>e<span class="token punctuation">.</span>data<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> ws\n<span class="token punctuation">}</span>\n\n<span class="token keyword">let</span> wsValue <span class="token operator">=</span> <span class="token function">socketConnect</span><span class="token punctuation">(</span><span class="token string">&#39;ws://121.40.165.18:8800&#39;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>webSocket 的 class 类</strong></p><p>当项目中很多地方用到 websocket 时，把它封装成一个 class 类，是更好的选择</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">WebSocketClass</span> <span class="token punctuation">{</span>\n\t<span class="token doc-comment comment">/**\n\t * <span class="token keyword">@description</span>: 初始化实例属性，保存参数\n\t * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">url</span> ws的接口\n\t * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">msgCallback</span> 服务器信息的回调传数据给函数\n\t * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">name</span> 可选值 用于区分ws，用于debugger\n\t */</span>\n\t<span class="token function">constructor</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> msgCallback<span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>url <span class="token operator">=</span> url\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>msgCallback <span class="token operator">=</span> msgCallback\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>ws <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// websocket对象</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// websocket是否关闭</span>\n\t<span class="token punctuation">}</span>\n\t<span class="token doc-comment comment">/**\n\t * <span class="token keyword">@description</span>: 初始化 连接websocket或重连webSocket时调用\n\t * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">可选值</span> 要传的数据\n\t */</span>\n\t<span class="token function">connect</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token comment">// 新建 WebSocket 实例</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>ws <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>url<span class="token punctuation">)</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span><span class="token function-variable function">onopen</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\t\t\t<span class="token comment">// 连接ws成功回调</span>\n\t\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">&#39;open&#39;</span>\n\t\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">连接成功</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>\n\t\t\t<span class="token comment">// this.heartCheck();</span>\n\t\t\t<span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t\t<span class="token comment">// 有要传的数据,就发给后端</span>\n\t\t\t\t<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>\n\t\t\t<span class="token punctuation">}</span>\n\t\t<span class="token punctuation">}</span>\n\t\t<span class="token comment">// 监听服务器端返回的信息</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\t\t\t<span class="token comment">// 把数据传给回调函数，并执行回调</span>\n\t\t\t<span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>data <span class="token operator">===</span> <span class="token string">&#39;pong&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>pingPong <span class="token operator">=</span> <span class="token string">&#39;pong&#39;</span> <span class="token comment">// 服务器端返回pong,修改pingPong的状态</span>\n\t\t\t<span class="token punctuation">}</span>\n\t\t\t<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">msgCallback</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>data<span class="token punctuation">)</span>\n\t\t<span class="token punctuation">}</span>\n\t\t<span class="token comment">// ws关闭回调</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span><span class="token function-variable function">onclose</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\t\t\t<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">closeHandle</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token comment">// 判断是否关闭</span>\n\t\t<span class="token punctuation">}</span>\n\t\t<span class="token comment">// ws出错回调</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\t\t\t<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">closeHandle</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token comment">// 判断是否关闭</span>\n\t\t<span class="token punctuation">}</span>\n\t<span class="token punctuation">}</span>\n\t<span class="token function">heartCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token comment">// 心跳机制的时间可以自己与后端约定</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>pingPong <span class="token operator">=</span> <span class="token string">&#39;ping&#39;</span> <span class="token comment">// ws的心跳机制状态值</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>pingInterval <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\t\t\t<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t\t<span class="token comment">// 检查ws为链接状态 才可发送</span>\n\t\t\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;ping&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 客户端发送ping</span>\n\t\t\t<span class="token punctuation">}</span>\n\t\t<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>pongInterval <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\t\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>pingPong <span class="token operator">=</span> <span class="token boolean">false</span>\n\t\t\t<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>pingPong <span class="token operator">===</span> <span class="token string">&#39;ping&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t\t<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">closeHandle</span><span class="token punctuation">(</span><span class="token string">&#39;pingPong没有改变为pong&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 没有返回pong 重启webSocket</span>\n\t\t\t<span class="token punctuation">}</span>\n\t\t\t<span class="token comment">// 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启</span>\n\t\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;返回pong&#39;</span><span class="token punctuation">)</span>\n\t\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>pingPong <span class="token operator">=</span> <span class="token string">&#39;ping&#39;</span>\n\t\t<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">20000</span><span class="token punctuation">)</span>\n\t<span class="token punctuation">}</span>\n\t<span class="token comment">// 发送信息给服务器</span>\n\t<span class="token function">sendHandle</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">发送消息给服务器:</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>\n\t\t<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>\n\t<span class="token punctuation">}</span>\n\t<span class="token function">closeHandle</span><span class="token punctuation">(</span>e <span class="token operator">=</span> <span class="token string">&#39;err&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token comment">// 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连</span>\n\t\t<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">!==</span> <span class="token string">&#39;close&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">断开，重连websocket</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>\n\t\t\t<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>pingInterval <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pongInterval <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t\t\t<span class="token comment">// 清除定时器</span>\n\t\t\t\t<span class="token function">clearInterval</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>pingInterval<span class="token punctuation">)</span>\n\t\t\t\t<span class="token function">clearInterval</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>pongInterval<span class="token punctuation">)</span>\n\t\t\t<span class="token punctuation">}</span>\n\t\t\t<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 重连</span>\n\t\t<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n\t\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">websocket手动关闭</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n\t\t<span class="token punctuation">}</span>\n\t<span class="token punctuation">}</span>\n\t<span class="token comment">// 手动关闭WebSocket</span>\n\t<span class="token function">closeMyself</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">关闭</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n\t\t<span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">&#39;close&#39;</span>\n\t\t<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">someFn</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;接收服务器消息的回调：&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// const wsValue = new WebSocketClass(&#39;ws://121.40.165.18:8800&#39;, someFn, &#39;wsName&#39;); // 这个链接一天只能发送消息50次</span>\n<span class="token keyword">const</span> wsValue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocketClass</span><span class="token punctuation">(</span><span class="token string">&#39;wss://echo.websocket.org&#39;</span><span class="token punctuation">,</span> someFn<span class="token punctuation">,</span> <span class="token string">&#39;wsName&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 阮一峰老师教程链接</span>\nwsValue<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">&#39;立即与服务器通信&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 连接服务器</span>\n<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\twsValue<span class="token punctuation">.</span><span class="token function">sendHandle</span><span class="token punctuation">(</span><span class="token string">&#39;传消息给服务器&#39;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>\n<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\twsValue<span class="token punctuation">.</span><span class="token function">closeMyself</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 关闭ws</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>WebSocket 心跳机制：</strong></p><blockquote><p>因为某些未知原因连接断开但是没有触发 error 或 close 事件，这样就导致实际连接已经断开了，但是服务端和客户端都不知道，还在等待对方回应，<strong>心跳机制</strong>是一种不错的选择</p></blockquote><p>客户端就像心跳一样每隔一段时间就发送一次 <code>ping</code>，来告诉服务器我还活着，而服务器也会返回<code>pong</code>来响应客户端</p><h2 id="websocket-的基础知识点" tabindex="-1"><a class="header-anchor" href="#websocket-的基础知识点"><span>websocket 的基础知识点</span></a></h2><p>###Websocket 的当前状态（Websocket.readyState）： 四个状态值：</p><ul><li>0：正在连接</li><li>1：连接成功，可以通信了</li><li>3：连接正在关闭</li><li>4： 连接关闭或者连接失败</li></ul><p>我们可以利用当前状态来做一些处理，比如上面例子中 Websocket 连接成功后，再允许客户端发送 ping</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span>readyState <span class="token operator">==</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">this</span><span class="token punctuation">.</span>ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;ping&#39;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="与-http-协议相比-有一下区别" tabindex="-1"><a class="header-anchor" href="#与-http-协议相比-有一下区别"><span>与 HTTP 协议相比，有一下区别</span></a></h3><ul><li>实时性：websocket 提供了低延迟的实时通信能力，能够在服务端有新数据时立即推送消息给客户端</li><li>双向信息：websocket 支持客户端与服务器之间的双向通信。可以实时数据更新</li><li>较低的网络开销：websocket 使用长连接，提高了性能</li><li>跨域支持：具有跨域通信的能力，没有同源机制</li><li>websocket 使用了 ws://、wss://的前缀</li><li>数据格式：websocket 支持字符串和二进制数据</li></ul><h3 id="webscoket-建立过程是怎样的" tabindex="-1"><a class="header-anchor" href="#webscoket-建立过程是怎样的"><span>webscoket 建立过程是怎样的？</span></a></h3><ul><li>客户端发送 websocket 握手请求，请求头包括 Upgrade 和 connection 字段，指定协议升级和建立连接</li><li>服务器收到握手请求后，验证请求头字段，并返回握手响应，添加了一个 Aec-Websocket-Key 字段</li><li>客户端收到握手响应后，验证响应头，并生成一个 Sec-websocket-Accept 值进行校验</li><li>验证成功后 Websocket 连接建立成功，双方就可以进行实时通讯了</li></ul><h3 id="websocket-事件" tabindex="-1"><a class="header-anchor" href="#websocket-事件"><span>webSocket 事件</span></a></h3><ul><li>open：连接建立成功时触发事件。可以在此事件中执行初始化操作或向服务器发送初始数据</li><li>message：接收到消息时触发的事件</li><li>error:连接出现错误触发的事件 错误包括连接失败，数据传输错误</li><li>close:连接关闭触发的事件。关闭可能由服务器或客户端发起，可以在此事件中执行清理操作或者重新连接操作</li></ul>',21)],e={},o=(0,a(262).A)(e,[["render",function(n,s){return(0,t.uX)(),(0,t.CE)("div",null,p)}]]),c=JSON.parse('{"path":"/accumulation/websocket.html","title":"websocket","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"wensocket 例子：","slug":"wensocket-例子","link":"#wensocket-例子","children":[]},{"level":2,"title":"websocket 的基础知识点","slug":"websocket-的基础知识点","link":"#websocket-的基础知识点","children":[{"level":3,"title":"与 HTTP 协议相比，有一下区别","slug":"与-http-协议相比-有一下区别","link":"#与-http-协议相比-有一下区别","children":[]},{"level":3,"title":"webscoket 建立过程是怎样的？","slug":"webscoket-建立过程是怎样的","link":"#webscoket-建立过程是怎样的","children":[]},{"level":3,"title":"webSocket 事件","slug":"websocket-事件","link":"#websocket-事件","children":[]}]}],"git":{"updatedTime":1709731854000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":1}]},"filePathRelative":"accumulation/websocket.md"}')}}]);