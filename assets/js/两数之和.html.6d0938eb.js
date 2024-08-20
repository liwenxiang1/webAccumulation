"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[8831],{3131:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>o,data:()=>c});var t=a(641);const p=[(0,t.Fv)('<h2 id="两数之和" tabindex="-1"><a class="header-anchor" href="#两数之和"><span><strong>两数之和</strong></span></a></h2><h3 id="描述" tabindex="-1"><a class="header-anchor" href="#描述"><span><strong>描述：</strong></span></a></h3><p>给一个整数数组，找到两个数使得他们的和等于一个给定的数 <code>target</code>。</p><p>你需要实现的函数 <code>twoSum</code> 需要返回这两个数的下标, 并且第一个下标小于第二个下标。注意这里下标的范围是 <code>0</code> 到 <code>n-1</code>。</p><h3 id="样例" tabindex="-1"><a class="header-anchor" href="#样例"><span><strong>样例：</strong></span></a></h3><p>给出 <code>numbers = [2, 7, 11, 15]</code>, <code>target = 9</code>, 返回 <code>[0, 1]</code>.</p><p>给出 <code>numbers = [2, 33, 11, 2]</code>, <code>target = 4</code>, 返回 <code>[0, 3]</code>.</p><h3 id="思路分析" tabindex="-1"><a class="header-anchor" href="#思路分析"><span><strong>思路分析：</strong></span></a></h3><p><code>target</code> 减去每个元素的值，得出来的值，就是我们要搜索的值。</p><h3 id="代码模板" tabindex="-1"><a class="header-anchor" href="#代码模板"><span><strong>代码模板：</strong></span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**\n * <span class="token keyword">@param</span> numbers: An array of Integer\n * <span class="token keyword">@param</span> target: target = numbers[index1] + numbers[index2]\n * <span class="token keyword">@return</span>: [index1, index2] (index1 &lt; index2)\n */</span>\n<span class="token keyword">const</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">numbers<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>转成对象：</li></ol><p>这是别人的一种解法，比下面的解法复杂点，可以看看，扩展一下思路。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**\n * <span class="token keyword">@param</span> numbers: An array of Integer\n * <span class="token keyword">@param</span> target: target = numbers[index1] + numbers[index2]\n * <span class="token keyword">@return</span>: [index1, index2] (index1 &lt; index2)\n */</span>\n<span class="token keyword">const</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">numbers<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token comment">// key : the complement (target - num)</span>\n  <span class="token comment">// value: index for that num</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> num <span class="token operator">=</span> numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>map<span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 找到值</span>\n      <span class="token keyword">return</span> <span class="token punctuation">[</span>map<span class="token punctuation">[</span>num<span class="token punctuation">]</span><span class="token punctuation">,</span> i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 第一次保存的index 和 刚找到的下标 即结果。</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 第一次进入 保存 要搜索的值和index</span>\n      map<span class="token punctuation">[</span>target <span class="token operator">-</span> num<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span> <span class="token comment">// 第一次</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">twoSum</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">twoSum</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>双循环</li></ol><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">numbers<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token keyword">of</span> numbers<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> res <span class="token operator">=</span> target <span class="token operator">-</span> numbers<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 要搜索的值</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> numbers<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> index<span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 倒序查找，跳过已经遍历过的值</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>res <span class="token operator">===</span> numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token punctuation">[</span>index<span class="token punctuation">,</span> i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 搜索到了 即找到</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">twoSum</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">twoSum</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>indexOf();</li></ol><p>indexOf 的第二个参数是开始搜索的位置，也可以跳过前面已经搜索过的值。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">numbers<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token keyword">of</span> numbers<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> res <span class="token operator">=</span> target <span class="token operator">-</span> numbers<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 相减</span>\n    <span class="token keyword">let</span> search <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 跳过前面已经搜索过的，防止 2+2=4 搜索两个 2 在同一个位置</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>search <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token punctuation">[</span>index<span class="token punctuation">,</span> search<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 直接返回值</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">twoSum</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">twoSum</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',19)],e={},o=(0,a(6262).A)(e,[["render",function(n,s){return(0,t.uX)(),(0,t.CE)("div",null,p)}]]),c=JSON.parse('{"path":"/algorithm/simple/%E4%B8%A4%E6%95%B0%E4%B9%8B%E5%92%8C.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"两数之和","slug":"两数之和","link":"#两数之和","children":[{"level":3,"title":"描述：","slug":"描述","link":"#描述","children":[]},{"level":3,"title":"样例：","slug":"样例","link":"#样例","children":[]},{"level":3,"title":"思路分析：","slug":"思路分析","link":"#思路分析","children":[]},{"level":3,"title":"代码模板：","slug":"代码模板","link":"#代码模板","children":[]}]}],"git":{"updatedTime":1724145556000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":1}]},"filePathRelative":"algorithm/simple/两数之和.md"}')}}]);