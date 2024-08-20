"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[361],{6360:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>o,data:()=>c});var t=a(641);const p=[(0,t.Fv)('<h2 id="二叉树的右视图" tabindex="-1"><a class="header-anchor" href="#二叉树的右视图"><span><strong>二叉树的右视图</strong></span></a></h2><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span>代码：</span></a></h3><ul><li>深度优先:</li></ul><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">rightSideView</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 结果</span>\n  <span class="token keyword">let</span> start <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 树的深度 从 0 开始</span>\n  <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> start<span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> res<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">function</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> step<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>step <span class="token operator">===</span> res<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 数组长度等于树的深度时 添加当前值 因为右侧先遍历 有右侧先添加右侧</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> step <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> step <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>广度优先:</li></ul><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">rightSideView</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 队列 把树顶加入队列</span>\n  <span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 用来存储每层最后个元素值</span>\n  <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> len <span class="token operator">=</span> queue<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token comment">// 当前层的广度</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>len<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">let</span> node <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 依次取出当前层队列的元素 从左到右</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 当是 当前一层的最后一个元素时，把值加入arr</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span> queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 先添加左侧的</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span> queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 最后添加右侧的 等到最后一个元素时即可添加右侧的值</span>\n      len<span class="token operator">--</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> arr<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',6)],e={},o=(0,a(6262).A)(e,[["render",function(n,s){return(0,t.uX)(),(0,t.CE)("div",null,p)}]]),c=JSON.parse('{"path":"/algorithm/middle/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E5%8F%B3%E8%A7%86%E5%9B%BE.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"二叉树的右视图","slug":"二叉树的右视图","link":"#二叉树的右视图","children":[{"level":3,"title":"代码：","slug":"代码","link":"#代码","children":[]}]}],"git":{"updatedTime":1724144871000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":1}]},"filePathRelative":"algorithm/middle/二叉树的右视图.md"}')}}]);