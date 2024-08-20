"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[9115],{1961:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>o,data:()=>c});var t=a(641);const p=[(0,t.Fv)('<h2 id="字符串压缩" tabindex="-1"><a class="header-anchor" href="#字符串压缩"><span><strong>字符串压缩</strong></span></a></h2><p><strong>描述：</strong></p><p>设计一种方法，通过给重复字符计数来进行基本的字符串压缩。</p><p>例如，字符串 <code>aabcccccaaa</code> 可压缩为 <code>a2b1c5a3</code> 。而如果压缩后的字符数不小于原始的字符数，则返回原始的字符串。</p><p>可以假设字符串仅包括 <code>a-z</code> 的字母。</p><h3 id="样例" tabindex="-1"><a class="header-anchor" href="#样例"><span><strong>样例：</strong></span></a></h3><p><code>str=aabcccccaaa</code> 返回 <code>a2b1c5a3</code></p><p><code>str=aabbcc</code> 返回 <code>aabbcc</code></p><p><code>str=aaaa</code> 返回 <code>a4</code></p><h3 id="思路分析" tabindex="-1"><a class="header-anchor" href="#思路分析"><span><strong>思路分析：</strong></span></a></h3><p>解题思路：取出字符串，判断重复停止，添加到新字符串中。</p><p>注：需判断压缩后的字符串长度和原始字符串长度。</p><h3 id="代码模板" tabindex="-1"><a class="header-anchor" href="#代码模板"><span><strong>代码模板：</strong></span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">compress</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">originalString</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span><strong>代码：</strong></span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// 取出字符串，判断重复停止，添加到新字符串中</span>\n<span class="token keyword">const</span> <span class="token function-variable function">compress</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">originalString</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>originalString<span class="token punctuation">.</span>length <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> originalString<span class="token punctuation">;</span> <span class="token comment">// 直接返回源字符串</span>\n  <span class="token keyword">let</span> newStr <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> s <span class="token operator">=</span> originalString<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 跳过第一个</span>\n  <span class="token keyword">let</span> total <span class="token operator">=</span> originalString<span class="token punctuation">.</span>length<span class="token punctuation">;</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> total<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> nowS <span class="token operator">=</span> originalString<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>nowS <span class="token operator">===</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      num <span class="token operator">=</span> num <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 增加数量</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">===</span> total<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        newStr <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>s<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>num<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span> <span class="token comment">// 遍历结束时，拼接最后的字符串</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      newStr <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>s<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>num<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span> <span class="token comment">// 拼接字符串</span>\n      num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 重置为 1</span>\n      s <span class="token operator">=</span> nowS<span class="token punctuation">;</span> <span class="token comment">// 转为下一个字符 s</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">// 生成的字符串长度大于等于源字符串 返回源字符串 否则返回生成的字符串</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>newStr<span class="token punctuation">.</span>length <span class="token operator">&gt;=</span> originalString<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> originalString<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> newStr<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>\n  <span class="token string">&#39;输出：&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">compress</span><span class="token punctuation">(</span><span class="token string">&#39;aabcccccaaa&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// a2b1c5a3</span>\n  <span class="token function">compress</span><span class="token punctuation">(</span><span class="token string">&#39;aabbcc&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// aabbcc</span>\n  <span class="token function">compress</span><span class="token punctuation">(</span><span class="token string">&#39;aaaa&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// a4</span>\n  <span class="token function">compress</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// a</span>\n  <span class="token function">compress</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &#39;&#39;</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',16)],e={},o=(0,a(6262).A)(e,[["render",function(n,s){return(0,t.uX)(),(0,t.CE)("div",null,p)}]]),c=JSON.parse('{"path":"/algorithm/simple/%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8E%8B%E7%BC%A9.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"字符串压缩","slug":"字符串压缩","link":"#字符串压缩","children":[{"level":3,"title":"样例：","slug":"样例","link":"#样例","children":[]},{"level":3,"title":"思路分析：","slug":"思路分析","link":"#思路分析","children":[]},{"level":3,"title":"代码模板：","slug":"代码模板","link":"#代码模板","children":[]},{"level":3,"title":"代码：","slug":"代码","link":"#代码","children":[]}]}],"git":{"updatedTime":1724145556000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":1}]},"filePathRelative":"algorithm/simple/字符串压缩.md"}')}}]);