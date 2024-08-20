"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[110],{1984:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>o,data:()=>c});var t=a(641);const p=[(0,t.Fv)('<h1 id="箭头函数和普通函数" tabindex="-1"><a class="header-anchor" href="#箭头函数和普通函数"><span>箭头函数和普通函数</span></a></h1><p>箭头函数式 ES6 的新特性</p><h2 id="箭头函数和普通函数的区别" tabindex="-1"><a class="header-anchor" href="#箭头函数和普通函数的区别"><span>箭头函数和普通函数的区别</span></a></h2><ol><li>箭头函数没有原型（prototype）所以箭头函数没有 this</li></ol><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">a</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">//undefined</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.箭头函数的 this 指向在第一的时候继承自外层普通函数的 this</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span>\n\t<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token function">a</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">11</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>不能直接修改箭头函数 this 的指向</li></ol><blockquote><p>幸运的是，我们可以通过间接的形式来修改箭头函数的指向： 去修改被继承的普通函数的 this 指向，然后箭头函数的 this 指向也会跟着改变，这在上一个栗子中有演示。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token function">a</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4"><li>箭头函数的外层没有普通函数，在严格模式和非严格模式下它的 this 都指向全局变量（window）</li></ol><p>普通函数的绑定规则：在非严格模式下，this 指向的全局变量，在严格模式下 this 指向的是 undefined</p><h2 id="箭头函数的-arguments" tabindex="-1"><a class="header-anchor" href="#箭头函数的-arguments"><span>箭头函数的 arguments</span></a></h2><ol><li>如果箭头函数的 this 指向全局，所以使用 arguments 会报未声明的错误</li></ol><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">b</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token function">b</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">// Uncaught ReferenceError: arguments is not defined</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>如果箭头函数的 this 指向普通函数，他的 arguments 继承于该普通函数</li></ol><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span> <span class="token comment">// [&#39;外层第二个普通函数的参数&#39;]</span>\n\t<span class="token function">bb</span><span class="token punctuation">(</span><span class="token string">&#39;外层第一个普通函数的参数&#39;</span><span class="token punctuation">)</span>\n\t<span class="token keyword">function</span> <span class="token function">bb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span> <span class="token comment">// [&quot;外层第一个普通函数的参数&quot;]</span>\n\t\t<span class="token keyword">let</span> <span class="token function-variable function">a</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\t\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token string">&#39;arguments继承this指向的那个普通函数&#39;</span><span class="token punctuation">)</span> <span class="token comment">// [&quot;外层第一个普通函数的参数&quot;]</span>\n\t\t<span class="token punctuation">}</span>\n\t\t<span class="token function">a</span><span class="token punctuation">(</span><span class="token string">&#39;箭头函数的参数&#39;</span><span class="token punctuation">)</span> <span class="token comment">// this指向bb</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token function">bar</span><span class="token punctuation">(</span><span class="token string">&#39;外层第二个普通函数的参数&#39;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>rest 参数获取函数的多余参数</strong></p><p>rest ES6 的 API，用于获取函数不定数量的参数数组，这个 API 是用来替代 arguments 的，API 用法如下</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">a</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">first<span class="token punctuation">,</span> <span class="token operator">...</span>b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token comment">//1,[2,3,4]</span>\n<span class="token punctuation">}</span>\n<span class="token function">a</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>rest 的使用需要注意两点</strong></p><ol><li><p>rest 必须是最后一位参数</p></li><li><p>函数的 length 不包括 rest</p></li></ol><p><strong>使用 new 调用箭头函数会报错</strong></p><p>因为箭头函数没有 <code>constructor</code></p><p><strong>箭头函数不支持 new.target</strong></p><p>new.target 是 ES6 的新属性，如果普通函数通过 new 调用,new.target 会返回该函数的引用</p><p><strong>箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span> <span class="token comment">// 2 [1,2]</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> <span class="token function-variable function">func2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> a</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">// 报错：在此上下文中不允许重复参数名称</span>\n<span class="token punctuation">}</span>\n<span class="token function">func1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>\n<span class="token function">func2</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',28)],e={},o=(0,a(6262).A)(e,[["render",function(n,s){return(0,t.uX)(),(0,t.CE)("div",null,p)}]]),c=JSON.parse('{"path":"/accumulation/arrowFun.html","title":"箭头函数和普通函数","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"箭头函数和普通函数的区别","slug":"箭头函数和普通函数的区别","link":"#箭头函数和普通函数的区别","children":[]},{"level":2,"title":"箭头函数的 arguments","slug":"箭头函数的-arguments","link":"#箭头函数的-arguments","children":[]}],"git":{"updatedTime":1709731854000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":1}]},"filePathRelative":"accumulation/arrowFun.md"}')}}]);