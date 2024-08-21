"use strict";(self.webpackChunkliwx_docs=self.webpackChunkliwx_docs||[]).push([[7196],{6229:(e,t,n)=>{n.r(t),n.d(t,{comp:()=>f,data:()=>C});var i=n(641);const l=n.p+"assets/img/demo_image1.e3a51733.png",s=n.p+"assets/img/demo_image2.dc882f6c.png",d=n.p+"assets/img/demo_image3.3f04eeed.png",r=n.p+"assets/img/ali_image.477d8a8a.png",a=n.p+"assets/img/tencent_api.dbc35272.png",c=n.p+"assets/img/tencent_config.b8899fab.png",v=n.p+"assets/img/dingxiang-price.0ca98831.png",u=(0,i.Lk)("h1",{id:"第三方验证码方案",tabindex:"-1"},[(0,i.Lk)("a",{class:"header-anchor",href:"#第三方验证码方案"},[(0,i.Lk)("span",null,"第三方验证码方案")])],-1),o={href:"https://m.zhaoyj.work/msb/#/pages/login/other",target:"_blank",rel:"noopener noreferrer"},m=(0,i.Fv)('<p><img src="'+l+'" alt="img.png"><img src="'+s+'" alt="img.png"><img src="'+d+'" alt="img.png"></p><p>顶象的集成比较简单效果也一般，腾讯云的目前看着比较完善，阿里云的配置及文档比较简单(后台没有提供nodejs的sdk，没有接入测试)，百度的没有发现有相关功能。 <img src="'+r+'" alt="img.png"></p><h3 id="一、参考网站" tabindex="-1"><a class="header-anchor" href="#一、参考网站"><span>一、参考网站</span></a></h3>',3),b={href:"https://www.sohu.com/a/206286904_354899",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.woshipm.com/pd/580976.html",target:"_blank",rel:"noopener noreferrer"},p={href:"https://zhuanlan.zhihu.com/p/562828431",target:"_blank",rel:"noopener noreferrer"},h=(0,i.Fv)('<h3 id="二、验证码校验流程" tabindex="-1"><a class="header-anchor" href="#二、验证码校验流程"><span>二、验证码校验流程</span></a></h3><ul><li>腾讯验证码调用时序图 <img src="https://qcloudimg.tencent-cloud.cn/raw/8932466a9ac61639f24b447bfb6f8f01.png" alt="img"></li><li>顶象验证码校验流程 <img src="https://cdn.dingxiang-inc.com/images/f2a/f2ad80ed-9830-4c84-ba4d-f16802a8cd2c.png" alt="image.png"></li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>简单说来：\n1.【验证码客户端组件】实现的人工校验，校验通过生成一个token\n2.用户请求自己的业务接口时使用token等信息先调用【验证码后台服务接口】判断是否是客户端生成的\n3.校验通过再执行自己的相关业务逻辑\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、代码实现流程" tabindex="-1"><a class="header-anchor" href="#三、代码实现流程"><span>三、代码实现流程</span></a></h3>',4),x={href:"https://www.dingxiang-inc.com/docs/detail/captcha#doc-h3-20",target:"_blank",rel:"noopener noreferrer"},y={href:"https://cloud.tencent.com/document/product/1110/36841",target:"_blank",rel:"noopener noreferrer"},q=(0,i.Fv)('<p><strong>使用腾讯云验证码过程</strong></p><p>后台配置相关：</p><p><img src="'+a+'" alt="img.png"><img src="'+c+'" alt="img.png"></p><p><strong>一、vue前端代码集成</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//页面按钮触发验证码功能\n&lt;button type=&quot;primary&quot; @click=&quot;verifyYzm&quot; style=&quot;margin-top: 20px&quot;&gt;验证&lt;/button&gt;\n\n\nexport function loadScript(url) {\n  return new Promise((resolve, reject) =&gt; {\n    const script = document.createElement(&#39;script&#39;)\n\n    script.onload = () =&gt; resolve(&quot;load success&quot;)\n\n    script.onerror = () =&gt; reject(new Error(`Load script from ${url} failed`))\n\n    script.src = url\n    const head =\n        document.head || document.getElementsByTagName(&#39;head&#39;)[0]\n    ;(document.body || head).appendChild(script)\n  })\n}\n//加载TCaptcha.js\nmounted() {\n  if (typeof TencentCaptcha == &#39;undefined&#39;)\n    loadScript(&quot;https://ssl.captcha.qq.com/TCaptcha.js&quot;, &#39;tencent&#39;)\n        .then(res =&gt; {\n          this.loadFinish = true\n          console.log(&quot;loadScript=success&quot;, res)\n        })\n        .catch(err =&gt; {\n          console.error(&quot;loadScript=error&quot;, err)\n        })\n},\nmethods: {\n  verifyYzm() {\n      this.logList.length = 0\n      this.ticketInfo.length = 0\n      let _this = this\n      if (!this.loadFinish) uni.showToast({title: &quot;js文件加载失败！&quot;})\n\n      // 定义回调函数\n      function callback(res) {\n        // 第一个参数传入回调结果，结果如下：\n        // ret         Int       验证结果，0：验证成功。2：用户主动关闭验证码。\n        // ticket      String    验证成功的票据，当且仅当 ret = 0 时 ticket 有值。\n        // CaptchaAppId       String    验证码应用ID。\n        // bizState    Any       自定义透传参数。\n        // randstr     String    本次验证的随机串，后续票据校验时需传递该参数。\n        console.log(&#39;callback:0000000000&#39;, res);\n\n        // res（用户主动关闭验证码）= {ret: 2, ticket: null}\n        // res（验证成功） = {ret: 0, ticket: &quot;String&quot;, randstr: &quot;String&quot;}\n        // res（请求验证码发生错误，验证码自动返回terror_前缀的容灾票据） = {ret: 0, ticket: &quot;String&quot;, randstr: &quot;String&quot;,  errorCode: Number, errorMessage: &quot;String&quot;}\n        // 此处代码仅为验证结果的展示示例，真实业务接入，建议基于ticket和errorCode情况做不同的业务处理\n        if (res.ret === 0) {\n          // 复制结果至剪切板\n          var str = &#39;【randstr】-&gt;【&#39; + res.randstr + &#39;】    【ticket】-&gt;【&#39; + res.ticket + &#39;】&#39;;\n          console.log(&quot;callback:11111&quot;, str)\n          _this.ticketInfo.push(&#39;【randstr】-&gt;【&#39; + res.randstr + &#39;】&#39;)\n          _this.ticketInfo.push(&#39;【ticket】-&gt;【&#39; + res.ticket + &#39;】&#39;)\n          // _this.requestProcess(&#39;1&#39; + res.ticket) //todo 后端校验不通过情况\n          _this.logList.push(&quot;1. 前端人工校验成功！&quot;)\n          _this.requestProcess(res.ticket)\n        }\n      }\n\n      // 定义验证码js加载错误处理函数\n      function loadErrorCallback() {\n        var appid = &#39;您的CaptchaAppId&#39;;\n        // 生成容灾票据或自行做其它处理\n        var ticket = &#39;terror_1001_&#39; + appid + &#39;_&#39; + Math.floor(new Date().getTime() / 1000);\n        callback({\n          ret: 0,\n          randstr: &#39;@&#39; + Math.random().toString(36).substr(2),\n          ticket: ticket,\n          errorCode: 1001,\n          errorMessage: &#39;jsload_error&#39;\n        });\n      }\n\n      try {\n        var captcha = new TencentCaptcha(&#39;198682483&#39;, callback, {});\n        // 调用方法，显示验证码\n        captcha.show();\n      } catch (error) {\n        // 加载异常，调用验证码js加载错误处理函数\n        loadErrorCallback();\n      }\n  },\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>二、nodejs后端代码集成</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// /tencent/index.js\nconst tencentcloud = require(&quot;tencentcloud-sdk-nodejs-captcha&quot;);\nasync function verifyTencentToken(token, ip_info) {\n  return new Promise((resolve, reject) =&gt; {\n    const CaptchaClient = tencentcloud.captcha.v20190722.Client;\n    // 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密\n    // 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议采用更安全的方式来使用密钥，请参见：https://cloud.tencent.com/document/product/1278/85305\n    // 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取\n    const clientConfig = {\n      credential: {\n        secretId: &quot;xxx&quot;,\n        secretKey: &quot;xxx&quot;,\n      },\n      region: &quot;&quot;,\n      profile: {\n        httpProfile: {\n          endpoint: &quot;captcha.tencentcloudapi.com&quot;,\n        },\n      },\n    };\n    // 实例化要请求产品的client对象,clientProfile是可选的\n    const client = new CaptchaClient(clientConfig);\n    const params = {\n      &quot;CaptchaType&quot;: 9,\n      &quot;Ticket&quot;: token,\n      &quot;UserIp&quot;: ip_info ? ip_info : &quot;192.168.43.222&quot;,\n      &quot;Randstr&quot;: &quot;@bEq&quot;,\n      &quot;CaptchaAppId&quot;: xxx,\n      &quot;AppSecretKey&quot;: &quot;xxx&quot;\n    };\n    console.log(&quot;verifyTencentToken=========params==========&quot;, params)\n    client.DescribeCaptchaResult(params).then(\n        (data) =&gt; {\n          console.log(&quot;success&quot;, data);\n          return resolve(data)\n        },\n        (err) =&gt; {\n          console.error(&quot;error&quot;, err);\n          return reject(err)\n        }\n    );\n  })\n}\nmodule.exports = {\n  verifyTencentToken\n}\n\n// index.js\nconst tencentClient = require(&quot;./tencent/index&quot;);\n// 调用腾讯二维码校验模块功能\ntencentClient.verifyTencentToken(ticket, ip_info)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="四、各平台价格介绍" tabindex="-1"><a class="header-anchor" href="#四、各平台价格介绍"><span>四、各平台价格介绍</span></a></h3><ul><li>1.腾讯云：天御-验证码服务</li></ul><table><thead><tr><th style="text-align:center;">次数包</th><th style="text-align:center;">有效期</th><th style="text-align:center;">配置费用</th></tr></thead><tbody><tr><td style="text-align:center;">3万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">300.00元</td></tr><tr><td style="text-align:center;">8万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">600.00元</td></tr><tr><td style="text-align:center;">20万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">1,000.00元</td></tr><tr><td style="text-align:center;">100万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">2,000.00元</td></tr><tr><td style="text-align:center;">200万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">2,700.00元</td></tr><tr><td style="text-align:center;">500万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">5,700.00元</td></tr><tr><td style="text-align:center;">1000万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">9,600.00元</td></tr><tr><td style="text-align:center;">5000万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">44,000.00元</td></tr><tr><td style="text-align:center;">1亿次</td><td style="text-align:center;">1年</td><td style="text-align:center;">78,000.00元</td></tr><tr><td style="text-align:center;">5亿次</td><td style="text-align:center;">1年</td><td style="text-align:center;">322,000.00元</td></tr><tr><td style="text-align:center;">10亿次</td><td style="text-align:center;">1年</td><td style="text-align:center;">500,000.00元</td></tr></tbody></table><ul><li>2.阿里-验证码服务包</li></ul><table><thead><tr><th style="text-align:center;">次数包</th><th style="text-align:center;">有效期</th><th style="text-align:center;">配置费用</th></tr></thead><tbody><tr><td style="text-align:center;">200万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">3,000.00元</td></tr><tr><td style="text-align:center;">500万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">6,000.00元</td></tr><tr><td style="text-align:center;">1000万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">10,000.00元</td></tr><tr><td style="text-align:center;">5000万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">45,000.00元</td></tr><tr><td style="text-align:center;">10000万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">80,000.00元</td></tr><tr><td style="text-align:center;">50000万次</td><td style="text-align:center;">1年</td><td style="text-align:center;">325,000.00元</td></tr></tbody></table><ul><li>3.顶象验证码价格 <img src="'+v+'" alt="img.png"></li></ul>',13),k={},f=(0,n(6262).A)(k,[["render",function(e,t){const n=(0,i.g2)("ExternalLinkIcon");return(0,i.uX)(),(0,i.CE)("div",null,[u,(0,i.Lk)("p",null,[(0,i.eW)("目前实现的验证码demo效果："),(0,i.Lk)("a",o,[(0,i.eW)("https://m.zhaoyj.work/msb/#/pages/login/other"),(0,i.bF)(n)])]),m,(0,i.Lk)("p",null,[(0,i.Lk)("a",b,[(0,i.eW)("验证码平台哪家强，六大验证码使用评测-2017 "),(0,i.bF)(n)])]),(0,i.Lk)("p",null,[(0,i.Lk)("a",g,[(0,i.eW)("产品防护：5种常见的短信验证码防刷策略-2017"),(0,i.bF)(n)])]),(0,i.Lk)("p",null,[(0,i.Lk)("a",p,[(0,i.eW)("验证码哪家好？主流验证码全面对比-2022"),(0,i.bF)(n)])]),h,(0,i.Lk)("ul",null,[(0,i.Lk)("li",null,[(0,i.eW)("顶象技术开发文档： "),(0,i.Lk)("a",x,[(0,i.eW)("https://www.dingxiang-inc.com/docs/detail/captcha#doc-h3-20"),(0,i.bF)(n)])]),(0,i.Lk)("li",null,[(0,i.eW)("腾讯技术开发文档： "),(0,i.Lk)("a",y,[(0,i.eW)("https://cloud.tencent.com/document/product/1110/36841"),(0,i.bF)(n)])])]),q])}]]),C=JSON.parse('{"path":"/markdown/%E5%89%8D%E7%AB%AF/%E8%B0%83%E7%A0%94%E6%B5%8B%E8%AF%95/%E7%AC%AC%E4%B8%89%E6%96%B9%E9%AA%8C%E8%AF%81%E7%A0%81.html","title":"第三方验证码方案","lang":"zh-CN","frontmatter":{},"headers":[{"level":3,"title":"一、参考网站","slug":"一、参考网站","link":"#一、参考网站","children":[]},{"level":3,"title":"二、验证码校验流程","slug":"二、验证码校验流程","link":"#二、验证码校验流程","children":[]},{"level":3,"title":"三、代码实现流程","slug":"三、代码实现流程","link":"#三、代码实现流程","children":[]},{"level":3,"title":"四、各平台价格介绍","slug":"四、各平台价格介绍","link":"#四、各平台价格介绍","children":[]}],"git":{},"filePathRelative":"markdown/前端/调研测试/第三方验证码.md"}')}}]);