<template><div><!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-08-20 16:00:29
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2025-04-22 11:17:23
 * @FilePath: \webAccumulation\docs\accumulation\prototype.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<h1 id="原型和原型链" tabindex="-1"><a class="header-anchor" href="#原型和原型链"><span>原型和原型链</span></a></h1>
<h2 id="什么是原型和原型链" tabindex="-1"><a class="header-anchor" href="#什么是原型和原型链"><span>什么是原型和原型链</span></a></h2>
<p>1、显式原型：每一个类（构造函数）都有一个显式原型 prototype 对象。只有方法才有</p>
<p>2、隐式原型：每一个实例都有一个隐式原型<em>proto</em>，只有对象有</p>
<p>3、每一个函数都有 prototype,指向原型对象，prototype 的所有方法和属性，都能被通过构造函数所创建的实例继承</p>
<p>4、prototype 对象（原型对象）有一个 constructor 属性，默认指向 prototype 对象的构造函数</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token literal-property property">constructor</span><span class="token operator">:</span> foo<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-new-创建对象后的内存表现" tabindex="-1"><a class="header-anchor" href="#使用-new-创建对象后的内存表现"><span>使用 new 创建对象后的内存表现</span></a></h2>
<p><img src="@source/img/创建对象的原型表现.png" alt=""></p>
<h1 id="继承的方式" tabindex="-1"><a class="header-anchor" href="#继承的方式"><span>继承的方式</span></a></h1>
<h2 id="_1、原型链继承-new" tabindex="-1"><a class="header-anchor" href="#_1、原型链继承-new"><span>1、原型链继承（new）</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fatherTn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>some <span class="token operator">=</span> <span class="token string">'父类的this属性'</span><span class="token punctuation">,</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>say<span class="token operator">=</span><span class="token function">fuction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我是父类'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
fatherFn<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>fatherSome <span class="token operator">=</span> <span class="token string">'父类原型对象的属性或者方法'</span>

<span class="token comment">//子类</span>
<span class="token keyword">function</span> <span class="token function">sonFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>boo <span class="token operator">=</span> <span class="token string">'子类的this属性'</span>
<span class="token punctuation">}</span>

<span class="token comment">//核心步骤：重写子类的原型对象</span>
sonFn<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">fatherFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//将fatherFn的实例赋值给sonFn的prototype</span>
sonFn<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>sonFnSome <span class="token operator">=</span> <span class="token string">'子类原型对象的属性和方法'</span> <span class="token comment">//子类的属性或者方法声明在后面，避免被覆盖</span>

<span class="token comment">//实例化子类</span>
<span class="token keyword">const</span> sonFnInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">sonFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
sonFnInstance<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//我是父类</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFnInstance<span class="token punctuation">.</span>some<span class="token punctuation">)</span> <span class="token comment">//父类的this属性</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFnInstance<span class="token punctuation">.</span>fatherSome<span class="token punctuation">)</span> <span class="token comment">//父类原型对象的属性或者方法</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFnInstance<span class="token punctuation">.</span>sonFnSome<span class="token punctuation">)</span> <span class="token comment">//子类原型对象的属性和方法</span>


<span class="token keyword">function</span> <span class="token function">sonFn2</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
<span class="token punctuation">}</span>
sonFn2<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">fatherFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> sonFInstance2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">sonFn2</span><span class="token punctuation">(</span><span class="token string">'张三'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFInstance2<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">//张三</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sonFInstance2<span class="token punctuation">.</span>some<span class="token punctuation">)</span> <span class="token comment">//父类的this属性</span>
sonFInstance2<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//我是父类</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>原型链继承获取父类的属性和方法</strong></p>
<ol>
<li><code v-pre>fatherFn</code>通过 this 声明的属性和方法都会绑定在<code v-pre>new</code>期间创建的新对象上</li>
<li>新对象的原型是<code v-pre>fatherFn.prototype</code>，通过原型链的<code v-pre>_proto_</code>属性查找到<code v-pre>fatherFn.prototype</code>的属性和方法上</li>
</ol>
<p><strong>理解<code v-pre>new</code>做了什么</strong></p>
<blockquote>
<p>new 的定义是：new 运算符创建一个自定义对象类型的实例或者具有构造函数的内置对象的实例</p>
</blockquote>
<ol>
<li>
<p>创建一个全新的对象</p>
</li>
<li>
<p>这个新对象的原型（<code v-pre>_proto_</code>）指向函数的 prototype</p>
</li>
<li>
<p>改变 this 的指向，指向该空对象</p>
</li>
<li>
<p>对构造函数的返回值做判断，然后返回对应的值</p>
<ul>
<li>
<p>一般是返回第一步创建的空对象</p>
</li>
<li>
<p>但是<code v-pre>构造函数有返回值</code>时 需要做判断，是<code v-pre>对象类型则返回该对象</code>，是<code v-pre>原始类型则返回第一步创建的空对象</code></p>
<p><strong>使用原型链继承的缺点</strong>
1、父类使用<code v-pre>this</code>声明的属性被所有实例共享</p>
<blockquote>
<p>原因是：实例化父类（<code v-pre>sonFn.prototypr = new fatherFn()</code>）是一次性赋值到子类实例原型（<code v-pre>son.prototype</code>）上，他会将父类通过 <code v-pre>this</code> 声明的属性也赋值到子类的 <code v-pre>prototype</code> 上</p>
</blockquote>
</li>
</ul>
</li>
</ol>
<h2 id="_2、借用构造函数继承" tabindex="-1"><a class="header-anchor" href="#_2、借用构造函数继承"><span>2、借用构造函数继承</span></a></h2>
<p><strong>一经调用 <code v-pre>call/apply</code> 就会立即执行函数，并在函数执行时改变 this 的指向</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">fatherFn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>在子类中使用 call 调用父类，fatherFn 将会被立即执行，并将 <code v-pre>fatherFn</code> 函数的 <code v-pre>this</code> 指向 <code v-pre>sonFn</code> 的 <code v-pre>this</code></li>
<li>因为函数执行了，所以 <code v-pre>fatherFn</code> 使用 <code v-pre>this</code> 声明的函数都会生命到 <code v-pre>sonFn</code> 的 <code v-pre>this</code> 对象下</li>
<li>对<code v-pre>fatherFn.prototype</code> 没有任何影响</li>
</ol>
<p><strong>使用该继承方法的优缺点</strong></p>
<p>优点：</p>
<ol>
<li>可以向父类传递参数</li>
<li>解决了原型链继承中：杜绝使用 this 声明的属性会在所有的实例中共享的问题</li>
</ol>
<p>缺点：</p>
<ol>
<li>只能继承父类通过 <code v-pre>this</code> 声明的属性、方法，不能继承父类 <code v-pre>prototype</code> 上的属性和方法</li>
<li>父类方法无法复用：因为无法继承父类 <code v-pre>prototype</code>，所以每次实例化都要执行父类方法，重新声明 <code v-pre>this</code> 里所定义的方法，因此无法复用</li>
</ol>
<h2 id="_3、寄生组合式继承" tabindex="-1"><a class="header-anchor" href="#_3、寄生组合式继承"><span>3、寄生组合式继承</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> friends</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>friends <span class="token operator">=</span> friends<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">running</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'在跑步'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> friends<span class="token punctuation">,</span> score</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">Person</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> friends<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>score <span class="token operator">=</span> score<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">inheritPrototype</span><span class="token punctuation">(</span>Student<span class="token punctuation">,</span> Person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Student</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayScore</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>score<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 工具函数---继承原型</span>
<span class="token keyword">function</span> <span class="token function">inheritPrototype</span><span class="token punctuation">(</span><span class="token parameter">subType<span class="token punctuation">,</span> superType</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建新对象，并将prototype指向父类的prototype，此时constructor是指向父类的</span>
  subType<span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>superType<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 将subType的prototype.constructor指向自己</span>
  <span class="token comment">// subType.prototype.constructor = subType;</span>
  <span class="token comment">// Object.defineProperty精准控制constructor是否可枚举，可编辑</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>subType<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">'constructor'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> subType<span class="token punctuation">,</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、class-继承" tabindex="-1"><a class="header-anchor" href="#_4、class-继承"><span>4、class 继承</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">running</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="原型判断方法" tabindex="-1"><a class="header-anchor" href="#原型判断方法"><span>原型判断方法</span></a></h1>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'zhangyunlei'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> info <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'张三'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 1、判断是否是自身的属性</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'value'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
<span class="token comment">///2、 in 操作符 判断存在该属性，不管是自身的还是原型上的</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'value'</span> <span class="token keyword">in</span> info<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'name'</span> <span class="token keyword">in</span> info<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
<span class="token comment">// 3、 instanceof 判断是否是某个构造函数的实例,判断Object.prototype是否出现在info的原型链上</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
<span class="token comment">// 4、isPrototypeOf 检查某个对象是否出现在另一个对象的原型链上</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">isPrototypeOf</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


