"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[5523],{4251:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>e,data:()=>c});var t=a(641);const p=[(0,t.Fv)('<h2 id="字符串密钥格式" tabindex="-1"><a class="header-anchor" href="#字符串密钥格式"><span><strong>字符串密钥格式</strong></span></a></h2><p><strong>描述：</strong></p><ol><li><p>给定字符串 <code>S(非空)</code>，字符串 <code>S</code> 仅由字母数字字符<code>（a-z 和/或 A-Z 和/或 0-9）</code>和<code>短划线（ - ）</code>组成。</p></li><li><p>给定正整数<code> K</code>，我们希望重新格式化字符串，使得<strong>每个组包含正好的 <code>K</code> 个字符，但第一个组可能比 <code>K</code> 短，但仍必须包含至少一个字符。</strong></p></li><li><p>必须在<strong>两个组之间插入短划线，<strong>并且所有</strong>小写字母都应转换为大写</strong></p></li></ol><h3 id="样例" tabindex="-1"><a class="header-anchor" href="#样例"><span><strong>样例：</strong></span></a></h3><p>Input: S = &quot;5F3Z-2e-9-w&quot;, K = 4</p><p>Output: &quot;5F3Z-2E9W&quot;</p><p>Input: S = &quot;2-5g-3-J&quot;, K = 2</p><p>Output: &quot;2-5G-3J&quot;</p><h3 id="思路分析" tabindex="-1"><a class="header-anchor" href="#思路分析"><span><strong>思路分析：</strong></span></a></h3><p>处理字符串通常需要转成数组来处理，仔细观察输出和规则，总结规律。</p><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span><strong>代码：</strong></span></a></h3><ol><li><p>去掉-，等下用 join 连接。</p></li><li><p>字符串长度不能被 K 整除的话，需取余，将不能整除的部分拿出来。</p></li><li><p>然后每隔几个 K 每割一下字符串，这里用了正则，返回一个数组。</p></li><li><p>再跟之前被拿出来的部分，合并成一个数组。</p></li><li><p>用 join 将数组转成字符串。</p></li></ol><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">licenseKeyFormatting</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">K</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token constant">S</span> <span class="token operator">=</span> <span class="token constant">S</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">-</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 去掉所有的-</span>\n  <span class="token keyword">let</span> total <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">S</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token comment">// 字符串总数</span>\n  <span class="token keyword">let</span> num <span class="token operator">=</span> total <span class="token operator">%</span> <span class="token constant">K</span><span class="token punctuation">;</span> <span class="token comment">// 取余</span>\n  <span class="token keyword">let</span> strArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 字符串剩余的放在这个数组中</span>\n  <span class="token comment">// 字符串余数</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>\n    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">S</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> arr<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      i<span class="token operator">++</span><span class="token punctuation">;</span>\n      str <span class="token operator">+=</span> arr<span class="token punctuation">[</span>item<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 有多少个余数就将多少个字符 添加到字符串中</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> num<span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 删除已被添加的字符</span>\n    <span class="token constant">S</span> <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// S 重新变为字符串 用于下面操作</span>\n    strArr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> str<span class="token punctuation">;</span> <span class="token comment">// 添加到数组 等下用于连接</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">let</span> spliceNum <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\\\\w{</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">K</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">}</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span> <span class="token comment">// 几个字符串为一个间隔</span>\n  <span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span>spliceNum<span class="token punctuation">,</span> <span class="token string">&#39;gim&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> strArr2 <span class="token operator">=</span> <span class="token constant">S</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 切割字符串返回数组</span>\n  strArr <span class="token operator">=</span> strArr<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>strArr2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 连接余数数组和切割的数组</span>\n  <span class="token constant">S</span> <span class="token operator">=</span> strArr<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 连接字符串 并转为大写</span>\n  <span class="token keyword">return</span> <span class="token constant">S</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>\n  <span class="token function">licenseKeyFormatting</span><span class="token punctuation">(</span><span class="token string">&#39;5F3Z-2e-9-w&#39;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token function">licenseKeyFormatting</span><span class="token punctuation">(</span><span class="token string">&#39;2-5g-3-J&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',13)],o={},e=(0,a(6262).A)(o,[["render",function(n,s){return(0,t.uX)(),(0,t.CE)("div",null,p)}]]),c=JSON.parse('{"path":"/algorithm/simple/%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%AF%86%E9%92%A5%E6%A0%BC%E5%BC%8F.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"字符串密钥格式","slug":"字符串密钥格式","link":"#字符串密钥格式","children":[{"level":3,"title":"样例：","slug":"样例","link":"#样例","children":[]},{"level":3,"title":"思路分析：","slug":"思路分析","link":"#思路分析","children":[]},{"level":3,"title":"代码：","slug":"代码","link":"#代码","children":[]}]}],"git":{"updatedTime":1724145556000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":1}]},"filePathRelative":"algorithm/simple/字符串密钥格式.md"}')}}]);