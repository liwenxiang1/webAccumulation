"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[9202],{8799:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>o,data:()=>c});var e=a(641);const p=[(0,e.Fv)('<h2 id="判断用户浏览器" tabindex="-1"><a class="header-anchor" href="#判断用户浏览器"><span>判断用户浏览器</span></a></h2><p><code>navigator.userAgent</code> 判断用户所使用的浏览器主要用到的 api 是 <code>navigator.userAgent</code>，这是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值，<strong>不同浏览器的 userAgent 值都不相同，所以我们可以根据这个字符串来判断用户是从哪个浏览器进入。</strong></p><h2 id="判断方式" tabindex="-1"><a class="header-anchor" href="#判断方式"><span>判断方式：</span></a></h2><p>下面两个是刚做的 demo 获取的值，仔细观察下面两个字符串，会发现有些值是不一样的，并且浏览器特有的，依据这个我们就可以作为不同浏览器的判断条件。</p><h3 id="qq-内置浏览器的-useragent-值" tabindex="-1"><a class="header-anchor" href="#qq-内置浏览器的-useragent-值"><span>QQ 内置浏览器的 userAgent 值：</span></a></h3><blockquote><p>mozilla/5.0 (iphone; cpu iphone os 11_1_2 like mac os x) applewebkit/604.3.5 (khtml, like gecko) mobile/15b202 qq/7.5.8.422 v1_iph_sq_7.5.8_1_app_a pixel/1080 core/uiwebview device/apple(iphone 8plus) nettype/wifi qbwebviewtype/1</p></blockquote><h3 id="微信内置浏览器的-useragent-值" tabindex="-1"><a class="header-anchor" href="#微信内置浏览器的-useragent-值"><span>微信内置浏览器的 userAgent 值：</span></a></h3><blockquote><p>mozilla/5.0 (iphone; cpu iphone os 11_1_2 like mac os x) applewebkit/604.3.5 (khtml, like gecko) mobile/15b202 micromessenger/6.6.6 nettype/wifi language/zh_cn</p></blockquote><h2 id="示例-判断-qq-和微信内置浏览器" tabindex="-1"><a class="header-anchor" href="#示例-判断-qq-和微信内置浏览器"><span>示例:判断 QQ 和微信内置浏览器</span></a></h2><p>使用方式，直接使用这个 api 读取值，然后根据事先观察 userAgent 字符串的不同之处来判断：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> url <span class="token operator">=</span> navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">//使用toLowerCase将字符串全部转为小写 方便我们判断使用</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;15b202 qq&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">//单独判断QQ内置浏览器</span>\n  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;QQ APP 内置浏览器，做你想做的操作&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;micromessenger&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">//单独判断微信内置浏览器</span>\n  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;微信内置浏览器，做你想做的操作&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;15b202&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">//判断微信内置浏览器，QQ内置浏览器</span>\n  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;QQ和微信内置浏览器，做你想做的操作&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面判断了微信和 QQ 的内置浏览器，如果有更多不同的需求的话，可以按照上面的方式，先获取 userAgent 的字符串，然后再根据观察，使用 indexOf 判断是否含有指定的字符，来对不同浏览器进行不同的操作。</p><h3 id="判断是手机打开浏览器" tabindex="-1"><a class="header-anchor" href="#判断是手机打开浏览器"><span>判断是手机打开浏览器</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>let isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="判断页面是在手机端-平板端还是-pc-端打开" tabindex="-1"><a class="header-anchor" href="#判断页面是在手机端-平板端还是-pc-端打开"><span>判断页面是在手机端，平板端还是 PC 端打开</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> os <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> ua <span class="token operator">=</span> navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">,</span>\n    isWindowsPhone <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:Windows Phone)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    isSymbian <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:SymbianOS)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span> <span class="token operator">||</span> isWindowsPhone<span class="token punctuation">,</span>\n    isAndroid <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:Android)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    isFireFox <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:Firefox)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    isChrome <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:Chrome|CriOS)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    isTablet <span class="token operator">=</span>\n      <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:iPad|PlayBook)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span> <span class="token operator">||</span>\n      <span class="token punctuation">(</span>isAndroid <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:Mobile)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>\n      <span class="token punctuation">(</span>isFireFox <span class="token operator">&amp;&amp;</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:Tablet)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    isPhone <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:iPhone)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isTablet<span class="token punctuation">,</span>\n    isPc <span class="token operator">=</span> <span class="token operator">!</span>isPhone <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isAndroid <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isSymbian<span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">isTablet</span><span class="token operator">:</span> isTablet<span class="token punctuation">,</span>\n    <span class="token literal-property property">isPhone</span><span class="token operator">:</span> isPhone<span class="token punctuation">,</span>\n    <span class="token literal-property property">isAndroid</span><span class="token operator">:</span> isAndroid<span class="token punctuation">,</span>\n    <span class="token literal-property property">isPc</span><span class="token operator">:</span> isPc<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">if</span> <span class="token punctuation">(</span>os<span class="token punctuation">.</span>isAndroid <span class="token operator">||</span> os<span class="token punctuation">.</span>isPhone<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;手机&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>os<span class="token punctuation">.</span>isTablet<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;平板&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>os<span class="token punctuation">.</span>isPc<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;电脑&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-获取手机操作系统类型-判断是-android-或者-ios" tabindex="-1"><a class="header-anchor" href="#_3-获取手机操作系统类型-判断是-android-或者-ios"><span>3. 获取手机操作系统类型，判断是 Android 或者 IOS</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**\n * 获取操作系统类型，\n * 0 -- Android\n * 1 -- iOS\n */</span>\n<span class="token keyword">function</span> <span class="token function">getOSType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(Android)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(iPhone|iPad|iPod|iOS)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="判断当前环境是否是微信环境" tabindex="-1"><a class="header-anchor" href="#判断当前环境是否是微信环境"><span>判断当前环境是否是微信环境</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">is_weixin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> ua <span class="token operator">=</span> navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">MicroMessenger</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&#39;micromessenger&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',20)],t={},o=(0,a(6262).A)(t,[["render",function(n,s){return(0,e.uX)(),(0,e.CE)("div",null,p)}]]),c=JSON.parse('{"path":"/utils/userAgent.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"判断用户浏览器","slug":"判断用户浏览器","link":"#判断用户浏览器","children":[]},{"level":2,"title":"判断方式：","slug":"判断方式","link":"#判断方式","children":[{"level":3,"title":"QQ 内置浏览器的 userAgent 值：","slug":"qq-内置浏览器的-useragent-值","link":"#qq-内置浏览器的-useragent-值","children":[]},{"level":3,"title":"微信内置浏览器的 userAgent 值：","slug":"微信内置浏览器的-useragent-值","link":"#微信内置浏览器的-useragent-值","children":[]}]},{"level":2,"title":"示例:判断 QQ 和微信内置浏览器","slug":"示例-判断-qq-和微信内置浏览器","link":"#示例-判断-qq-和微信内置浏览器","children":[{"level":3,"title":"判断是手机打开浏览器","slug":"判断是手机打开浏览器","link":"#判断是手机打开浏览器","children":[]},{"level":3,"title":"判断页面是在手机端，平板端还是 PC 端打开","slug":"判断页面是在手机端-平板端还是-pc-端打开","link":"#判断页面是在手机端-平板端还是-pc-端打开","children":[]},{"level":3,"title":"3. 获取手机操作系统类型，判断是 Android 或者 IOS","slug":"_3-获取手机操作系统类型-判断是-android-或者-ios","link":"#_3-获取手机操作系统类型-判断是-android-或者-ios","children":[]},{"level":3,"title":"判断当前环境是否是微信环境","slug":"判断当前环境是否是微信环境","link":"#判断当前环境是否是微信环境","children":[]}]}],"git":{},"filePathRelative":"utils/userAgent.md"}')}}]);