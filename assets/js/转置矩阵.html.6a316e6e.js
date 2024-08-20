"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[5116],{8017:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>l,data:()=>i});var t=a(641);const p=(0,t.Lk)("h2",{id:"转置矩阵",tabindex:"-1"},[(0,t.Lk)("a",{class:"header-anchor",href:"#转置矩阵"},[(0,t.Lk)("span",null,[(0,t.Lk)("strong",null,"转置矩阵")])])],-1),e={href:"https://leetcode.cn/problems/transpose-matrix/",target:"_blank",rel:"noopener noreferrer"},o=(0,t.Fv)('<h3 id="思路分析" tabindex="-1"><a class="header-anchor" href="#思路分析"><span>思路分析：</span></a></h3><p>将一个长方形横放改为竖放 每列为一个数组。</p><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span>代码：</span></a></h3><p>// 将一个长方形横放改为竖放 每列为一个数组</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">transpose</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">A</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token comment">// 横向遍历 长度</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token constant">A</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token comment">// 纵向遍历 宽度</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token constant">A</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 添加宽度的值</span>\n      row<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',5),c={},l=(0,a(6262).A)(c,[["render",function(n,s){const a=(0,t.g2)("ExternalLinkIcon");return(0,t.uX)(),(0,t.CE)("div",null,[p,(0,t.Lk)("p",null,[(0,t.Lk)("a",e,[(0,t.eW)("题目链接"),(0,t.bF)(a)])]),o])}]]),i=JSON.parse('{"path":"/algorithm/middle/%E8%BD%AC%E7%BD%AE%E7%9F%A9%E9%98%B5.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"转置矩阵","slug":"转置矩阵","link":"#转置矩阵","children":[{"level":3,"title":"思路分析：","slug":"思路分析","link":"#思路分析","children":[]},{"level":3,"title":"代码：","slug":"代码","link":"#代码","children":[]}]}],"git":{"updatedTime":1724144871000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":1}]},"filePathRelative":"algorithm/middle/转置矩阵.md"}')}}]);