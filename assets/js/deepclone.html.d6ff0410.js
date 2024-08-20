"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[8577],{890:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>l,data:()=>i});var p=a(641);const t=(0,p.Fv)('<h1 id="深拷贝和浅拷贝" tabindex="-1"><a class="header-anchor" href="#深拷贝和浅拷贝"><span>深拷贝和浅拷贝</span></a></h1><h2 id="什么是深拷贝和浅拷贝" tabindex="-1"><a class="header-anchor" href="#什么是深拷贝和浅拷贝"><span>什么是深拷贝和浅拷贝</span></a></h2><p><strong>浅拷贝</strong></p><p>浅拷贝是指将对象或数组的值复制到一个新对象或数组中，但是新对象中的元素或属性依然是源对象的引用，这意味着当我们修改其中一个对象时，另一个对象会收到影响。</p><p><strong>浅拷贝的实现方法</strong></p><ol><li><code>Object.create(obj)</code></li></ol><p>Object.create()方法可以用于创建一个新对象，并将原对象作为新对象的原型。这样，新对象就可以访问源对象的所有属性和方法</p><p><em>示例代码</em></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span> <span class="token punctuation">}</span>\n<span class="token keyword">const</span> b <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">//张三</span>\n\na<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;李四&#39;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">//李四</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p><code>Object.assgin({},obj)</code></p><p>Object.assgin()方法用于将一个或者多个对象的属性赋值到目标对象中,语法如下：</p></li></ol><blockquote><p>Object.assgin(target,...source)</p></blockquote><p>其中 target 是目标对象，soruce 是一个或者多个对象。该方法会遍历所有源对象的可枚举属性，并将其复制到目标对象中。如果目标对象中有相同属性，则<strong>已有属性会被后面的覆盖</strong></p><p>需要注意的是，该方法<strong>只会复制对象自身的属性，不会复制原型链上的属性</strong>，如果源对象中有值为<strong>null 或者 Undefined 的属性，也不会被复制</strong></p><p>示例代码：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>\n\t<span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span>\n\t<span class="token literal-property property">like</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n\t\t<span class="token literal-property property">n</span><span class="token operator">:</span> <span class="token string">&#39;code&#39;</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">let</span> b <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assgin</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>\n\na<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;李四&#39;</span>\na<span class="token punctuation">.</span>like<span class="token punctuation">.</span>n <span class="token operator">=</span> <span class="token string">&#39;running&#39;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">//张三</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>like<span class="token punctuation">.</span>n<span class="token punctuation">)</span> <span class="token comment">//running</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',15),e={href:"https://juejin.cn/post/7301909438587600937",target:"_blank",rel:"noopener noreferrer"},o=(0,p.Fv)('<p>新对象 b 中从 a 中复制过来的所有原始类型的属性都是新属性，在 b 的执行上下文中具有自己的空间地址，而复制过来的引用类型 like 的值并不是真正的值，是它在堆中的引用地址，所以在上述代码中<strong>b.like 和 a.like 仍然是同一个对象</strong>，它们在调用栈中的值都指向同一个堆中的地址，所以<strong>当 a.like 中的属性被修改时，b.like 的属性也变了。</strong></p><ol start="3"><li><code>[].concat(arr)</code></li></ol><p>[].concat() 方法可以用于将一个或多个数组合并成一个新数组。</p><p>示例代码：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>\n<span class="token keyword">let</span> newArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>\narr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>\narr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">10</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArr<span class="token punctuation">)</span> <span class="token comment">//输出[1,2,3]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候修改原数组 arr,newArray 中的值不会跟着改变，下面将数组内的原始类型换成引用类型试试</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;张三&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>\n<span class="token keyword">let</span> newArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>\narr<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;李四&#39;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArr<span class="token punctuation">)</span> <span class="token comment">//输出[1,2,{name:&quot;李四&quot;}]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>数据结构 [.arr]</li></ol><p>数组结构是一种将数组或类数组中的对象提取出来，赋值给变量的方法。他可以让我们更方便的访问数组元素</p><p>[...arr]代码示例</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;张三&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>\n<span class="token keyword">let</span> newArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>arr<span class="token punctuation">]</span>\nnewArr<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;李四&#39;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArr<span class="token punctuation">)</span> <span class="token comment">//输出[1,2,{name:&#39;李四&#39;}]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li><code>arr.slice()</code></li></ol><p>slice()是 js 数组对象的一个方法，用户从数组中提取指定区间的元素创建一个新的数组，并不会对原数组产生影响。他接受两个参数：开始所以和结束索引，当参数为空时，则会复制整个数组，这意味着返回的新数组与原数组具有相同的元素、长度和顺序</p><p>示例：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>\n<span class="token keyword">const</span> arr2 <span class="token operator">=</span> arr1<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr2<span class="token punctuation">)</span> <span class="token comment">//[1,2,3]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>深拷贝</strong></p><p>深拷贝是指原对象或数组的值复制到一个新的对象或数组中，并且新的对象的属性或元素完全独立于原对象或数组，即他们不共享引用地址。因此，当我们修改其中一个对象或数组时，另一个不受影响</p><p>常用方法 <code>JSON.parse(JSON.stringify())</code> 和 <code>Jquery.extend()</code></p>',18),c={},l=(0,a(6262).A)(c,[["render",function(n,s){const a=(0,p.g2)("ExternalLinkIcon");return(0,p.uX)(),(0,p.CE)("div",null,[t,(0,p.Lk)("p",null,[(0,p.eW)("产生这个效果的原因是：当 a 中的原始类型属性被修改时，b 中的这个属性时不会跟着修改的，但是引用类型则不然，这是因为原始类型和引用类型的存放位置不同，在代码执行时，原始类型的值存放在调用栈中，而引用类型的值会被放入堆中，如果对这点有一会可以看一下"),(0,p.Lk)("a",e,[(0,p.eW)("关于数据类型分类，构造函数和包装类的重要底层原理"),(0,p.bF)(a)])]),o])}]]),i=JSON.parse('{"path":"/accumulation/deepclone.html","title":"深拷贝和浅拷贝","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"什么是深拷贝和浅拷贝","slug":"什么是深拷贝和浅拷贝","link":"#什么是深拷贝和浅拷贝","children":[]}],"git":{"updatedTime":1709731854000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":1}]},"filePathRelative":"accumulation/deepclone.md"}')}}]);