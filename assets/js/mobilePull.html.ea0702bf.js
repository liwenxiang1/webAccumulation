"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[3117],{3034:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>o,data:()=>c});var t=a(641);const p=[(0,t.Fv)('<h2 id="移动端手写下拉刷新" tabindex="-1"><a class="header-anchor" href="#移动端手写下拉刷新"><span>移动端手写下拉刷新</span></a></h2><h3 id="思路" tabindex="-1"><a class="header-anchor" href="#思路"><span>思路</span></a></h3><ol><li>使用 touchstart、touchmove、touchend 三个事件来监听触摸事件</li><li>使用 getBoundingClientRect()API 来判断当前 dom 是否在顶部(之前使用 document.body.scrollTop 并不行，然而搜到的都是这个答案。)</li><li>最后一个是根据事件传递进来的参数用以计算距离。</li><li>剩下的就是具体的逻辑问题</li></ol><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">\n      <span class="token selector">.content_father div</span> <span class="token punctuation">{</span>\n        <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>\n        <span class="token property">background</span><span class="token punctuation">:</span> gray<span class="token punctuation">;</span>\n        <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>\n\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>F12开启浏览器手机模拟器，在顶部鼠标按住移动<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>content_father<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n      <span class="token keyword">let</span> content <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.content_father&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">let</span> startSite <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 触摸的起始位置</span>\n      <span class="token keyword">let</span> sendAjax <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 发送请求</span>\n      content<span class="token punctuation">.</span><span class="token function-variable function">ontouchstart</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">let</span> contentSite <span class="token operator">=</span> content<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>contentSite<span class="token punctuation">.</span>y <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;在顶部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          startSite <span class="token operator">=</span> e<span class="token punctuation">.</span>touches<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>pageY<span class="token punctuation">;</span>\n          <span class="token comment">// 在顶部才绑定事件</span>\n          content<span class="token punctuation">.</span>ontouchmove <span class="token operator">=</span> touchmoveFn<span class="token punctuation">;</span>\n          content<span class="token punctuation">.</span>ontouchend <span class="token operator">=</span> touchendFn<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n      <span class="token comment">// 开始移动</span>\n      <span class="token keyword">function</span> <span class="token function">touchmoveFn</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 在浏览器顶部</span>\n        <span class="token keyword">let</span> moveDistance <span class="token operator">=</span> e<span class="token punctuation">.</span>touches<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>pageY <span class="token operator">-</span> startSite<span class="token punctuation">;</span> <span class="token comment">// 相差高度</span>\n        <span class="token keyword">const</span> <span class="token constant">DISTANCE</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span> <span class="token comment">// 下滑距离超过100就刷新</span>\n        <span class="token keyword">const</span> <span class="token constant">DISTANCE_FONT</span> <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span> <span class="token comment">// 下滑距离超过50 就显示文案</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>moveDistance <span class="token operator">&gt;</span> <span class="token constant">DISTANCE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token comment">// 下滑足够距离</span>\n          sendAjax <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;展示 刷新页面文案&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">&lt;</span> moveDistance <span class="token operator">&lt;</span> <span class="token constant">DISTANCE_FONT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token comment">// 下滑距离不足</span>\n          sendAjax <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 实时更改是否发送请求</span>\n          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;展示：继续下滑刷新页面文案&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n          <span class="token comment">// 上拉 取消请求</span>\n          sendAjax <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 实时更改是否发送请求</span>\n        <span class="token punctuation">}</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;滑动距离&#39;</span><span class="token punctuation">,</span> moveDistance<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n      <span class="token comment">// 触摸结束</span>\n      <span class="token keyword">function</span> <span class="token function">touchendFn</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">let</span> contentSite <span class="token operator">=</span> content<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// 判断在顶部</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>contentSite<span class="token punctuation">.</span>y <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token comment">// 并且上次上滑超过100</span>\n          <span class="token keyword">if</span> <span class="token punctuation">(</span>sendAjax<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;发送 请求&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n        <span class="token comment">// 清除事件</span>\n        content<span class="token punctuation">.</span>ontouchmove <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n        content<span class="token punctuation">.</span>ontouchend <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',4)],e={},o=(0,a(6262).A)(e,[["render",function(n,s){return(0,t.uX)(),(0,t.CE)("div",null,p)}]]),c=JSON.parse('{"path":"/utils/mobilePull.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"移动端手写下拉刷新","slug":"移动端手写下拉刷新","link":"#移动端手写下拉刷新","children":[{"level":3,"title":"思路","slug":"思路","link":"#思路","children":[]}]}],"git":{},"filePathRelative":"utils/mobilePull.md"}')}}]);