"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[560],{230:(n,s,a)=>{a.r(s),a.d(s,{comp:()=>p,data:()=>c});var o=a(641);const t=[(0,o.Fv)('<h1 id="原型和原型链" tabindex="-1"><a class="header-anchor" href="#原型和原型链"><span>原型和原型链</span></a></h1><h2 id="什么是原型和原型链" tabindex="-1"><a class="header-anchor" href="#什么是原型和原型链"><span>什么是原型和原型链</span></a></h2><p>1、显示原型：每一个类（构造函数）都有一个显示原型 prototype 对象</p><p>2、隐式原型：每一个实例都有一个隐式原型<em>proto</em></p><p>3、每一个函数都有 prototype,指向原型对象，prototype 的所有方法和属性，都能被通过构造函数所创建的实例继承</p><p>4、prototype 对象（原型对象）有一个 constructor 属性，默认指向 prototype 对象的构造函数</p><h2 id="原型链继承-new" tabindex="-1"><a class="header-anchor" href="#原型链继承-new"><span>原型链继承（new）</span></a></h2><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fatherTn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">this</span><span class="token punctuation">.</span>some <span class="token operator">=</span> <span class="token string">&#39;父类的this属性&#39;</span><span class="token punctuation">,</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>say<span class="token operator">=</span><span class="token function">fuction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我是父类&#39;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\nfatherFn<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>fatherSome <span class="token operator">=</span> <span class="token string">&#39;父类原型对象的属性或者方法&#39;</span>\n\n<span class="token comment">//子类</span>\n<span class="token keyword">function</span> <span class="token function">sonFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">this</span><span class="token punctuation">.</span>boo <span class="token operator">=</span> <span class="token string">&#39;子类的this属性&#39;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">//核心步骤：重写子类的原型对象</span>\nsonFn<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">fatherFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//将fatherFn的实例赋值给sonFn的prototype</span>\nsonFn<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>sonFnSome <span class="token operator">=</span> <span class="token string">&#39;子类原型对象的属性和方法&#39;</span> <span class="token comment">//子类的属性或者方法声明在后面，避免被覆盖</span>\n\n<span class="token comment">//实例化子类</span>\n<span class="token keyword">const</span> sonFnInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">sonFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\nsonFnInstance<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//我是父类</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFnInstance<span class="token punctuation">.</span>some<span class="token punctuation">)</span> <span class="token comment">//父类的this属性</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFnInstance<span class="token punctuation">.</span>fatherSome<span class="token punctuation">)</span> <span class="token comment">//父类原型对象的属性或者方法</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFnInstance<span class="token punctuation">.</span>sonFnSome<span class="token punctuation">)</span> <span class="token comment">//子类原型对象的属性和方法</span>\n\n\n<span class="token keyword">function</span> <span class="token function">sonFn2</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name\n<span class="token punctuation">}</span>\nsonFn2<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">fatherFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> sonFInstance2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">sonFn2</span><span class="token punctuation">(</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFInstance2<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">//张三</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFInstance2<span class="token punctuation">.</span>some<span class="token punctuation">)</span> <span class="token comment">//父类的this属性</span>\nsonFInstance2<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//我是父类</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>原型链继承获取父类的属性和方法</strong></p><ol><li><code>fatherFn</code>通过 this 声明的属性和方法都会绑定在<code>new</code>期间创建的新对象上</li><li>新对象的原型是<code>fatherFn.prototype</code>，通过原型链的<code>_proto_</code>属性查找到<code>fatherFn.prototype</code>的属性和方法上</li></ol><p><strong>理解<code>new</code>做了什么</strong></p><blockquote><p>new 的定义是：new 运算符创建一个自定义对象类型的实例或者具有构造函数的内置对象的实例</p></blockquote><ol><li><p>创建一个全新的对象</p></li><li><p>这个新对象的原型（<code>_proto_</code>）指向函数的 prototype</p></li><li><p>改变 this 的指向，指向该空对象</p></li><li><p>对构造函数的返回值做判断，然后返回对应的值</p><ul><li><p>一般是返回第一步创建的空对象</p></li><li><p>但是<code>构造函数有返回值</code>时 需要做判断，是<code>对象类型则返回该对象</code>，是<code>原始类型则返回第一步创建的空对象</code></p><p><strong>使用原型链继承的缺点</strong> 1、父类使用<code>this</code>声明的属性被所有实例共享</p><blockquote><p>原因是：实例化父类（<code>sonFn.prototypr = new fatherFn()</code>）是一次性赋值到子类实例原型（<code>son.prototype</code>）上，他会将父类通过 <code>this</code> 声明的属性也赋值到子类的 <code>prototype</code> 上</p></blockquote></li></ul></li></ol><h2 id="借用构造函数继承" tabindex="-1"><a class="header-anchor" href="#借用构造函数继承"><span>借用构造函数继承</span></a></h2><p><strong>一经调用 <code>call/apply</code> 就会立即执行函数，并在函数执行时改变 this 的指向</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token function">fatherFn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>在子类中使用 call 调用父类，fatherFn 将会被立即执行，并将 <code>fatherFn</code> 函数的 <code>this</code> 指向 <code>sonFn</code> 的 <code>this</code></li><li>因为函数执行了，所以 <code>fatherFn</code> 使用 <code>this</code> 声明的函数都会生命到 <code>sonFn</code> 的 <code>this</code> 对象下</li><li>对<code>fatherFn.prototype</code> 没有任何影响</li></ol><p><strong>使用该继承方法的优缺点</strong></p><p>优点：</p><ol><li>可以向父类传递参数</li><li>解决了原型链继承中：杜磊使用 this 声明的属性会在所有的实例中共享的问题</li></ol><p>缺点：</p><ol><li>只能继承父类通过 <code>this</code> 声明的属性、方法，不能继承父类 <code>prototype</code> 上的属性和方法</li><li>父类方法无法复用：因为无法继承父类 <code>prototype</code>，所以每次实例化都要执行父类方法，重新声明 <code>this</code> 里所定义的方法，因此无法复用</li></ol>',22)],e={},p=(0,a(262).A)(e,[["render",function(n,s){return(0,o.uX)(),(0,o.CE)("div",null,t)}]]),c=JSON.parse('{"path":"/accumulation/prototype.html","title":"原型和原型链","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"什么是原型和原型链","slug":"什么是原型和原型链","link":"#什么是原型和原型链","children":[]},{"level":2,"title":"原型链继承（new）","slug":"原型链继承-new","link":"#原型链继承-new","children":[]},{"level":2,"title":"借用构造函数继承","slug":"借用构造函数继承","link":"#借用构造函数继承","children":[]}],"git":{"updatedTime":1709731854000,"contributors":[{"name":"“liwx”","email":"“1258598654qq.com”","commits":2}]},"filePathRelative":"accumulation/prototype.md"}')}}]);