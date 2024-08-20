"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[3560],{7966:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>o,data:()=>l});var t=a(641);const e=[(0,t.Fv)('<h2 id="搜索二维矩阵" tabindex="-1"><a class="header-anchor" href="#搜索二维矩阵"><span><strong>搜索二维矩阵</strong></span></a></h2><h3 id="描述" tabindex="-1"><a class="header-anchor" href="#描述"><span><strong>描述：</strong></span></a></h3><p>写出一个高效的算法来搜索 m × n 矩阵中的值。</p><p><strong>这个矩阵具有以下特性：</strong></p><ol><li>每行中的整数从左到右是从小到大排序的。</li><li>每行的第一个数大于上一行的最后一个整数。</li></ol><h3 id="样例" tabindex="-1"><a class="header-anchor" href="#样例"><span><strong>样例：</strong></span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>\n  <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">[</span><span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">34</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给出 <code>target = 3</code>，返回 <code>true</code></p><h3 id="题目分析" tabindex="-1"><a class="header-anchor" href="#题目分析"><span><strong>题目分析：</strong></span></a></h3><p>双循环找出是否有这个值，根据第二个特性，我们可以跳过一些第二层循环，算法更具效率。</p><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span>代码：</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>@param matrix<span class="token operator">:</span> matrix<span class="token punctuation">,</span> a list <span class="token keyword">of</span> lists <span class="token keyword">of</span> integers\n@param target<span class="token operator">:</span> An integer\n@<span class="token keyword">return</span><span class="token operator">:</span> a boolean<span class="token punctuation">,</span> indicate whether matrix contains target\n\n<span class="token keyword">const</span> <span class="token function-variable function">searchMatrix</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">matrix<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">of</span> matrix<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 遍历外层数组</span>\n        <span class="token keyword">let</span> value <span class="token operator">=</span> matrix<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token comment">// 拿到每行元素</span>\n        <span class="token comment">// 判断 target 是否在当前行中，跳过其他不必要循环</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;=</span> value<span class="token punctuation">[</span>value<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> value<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token comment">// 遍历行中元素</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">===</span> value<span class="token punctuation">[</span>item<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    <span class="token comment">// 找到值</span>\n                    <span class="token keyword">return</span> <span class="token boolean">true</span>\n                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;</span> value<span class="token punctuation">[</span>item<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    <span class="token comment">// 值超过 target 即找不到(因为是排序的)</span>\n                    <span class="token keyword">return</span> <span class="token boolean">false</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token comment">// 没有找到即返回 false</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',12)],p={},o=(0,a(6262).A)(p,[["render",function(n,s){return(0,t.uX)(),(0,t.CE)("div",null,e)}]]),l=JSON.parse('{"path":"/algorithm/simple/%E6%90%9C%E7%B4%A2%E4%BA%8C%E7%BB%B4%E7%9F%A9%E9%98%B5.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"搜索二维矩阵","slug":"搜索二维矩阵","link":"#搜索二维矩阵","children":[{"level":3,"title":"描述：","slug":"描述","link":"#描述","children":[]},{"level":3,"title":"样例：","slug":"样例","link":"#样例","children":[]},{"level":3,"title":"题目分析：","slug":"题目分析","link":"#题目分析","children":[]},{"level":3,"title":"代码：","slug":"代码","link":"#代码","children":[]}]}],"git":{"updatedTime":1724145556000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":1}]},"filePathRelative":"algorithm/simple/搜索二维矩阵.md"}')}}]);