import waves from './waves/waves'

export default {
  install(Vue) {
    // 防止重复点击
    Vue.directive('throttle', {
      inserted(el, binding) {
        console.log("binding-7", binding)
        el.addEventListener('click', () => {
          if (!el.disabled) {
            el.disabled = true
            setTimeout(() => {
              el.disabled = false
            }, binding.value || 1000)
          }
        })
      }
    })
    // 水波纹效果
    Vue.directive('waves', waves)
    // 数学公式快捷方式
    Vue.directive('mathjax', {
      inserted(el, binding, vnode) {
        const {value} = binding
        vnode.context.$initMathjax(value)
      }
    })
    // 配置数据公式插件
    Vue.prototype.$initMathjax = function initMathjax(sub, elementId = 'app') {
      // let subjects = [] //测试
      let subjects = ['数学', '化学']
      if (subjects.indexOf(sub) === -1) return
      this.$nextTick(() => { // 这里要注意，使用$nextTick等组件数据渲染完之后再调用MathJax渲染方法，要不然会获取不到数据
        if (!this.commonsVariable.isMathjaxConfig) {
          this.commonsVariable.initMathjaxConfig()
          this.commonsVariable.MathQueue(elementId)// 传入组件id，让组件被MathJax渲染
        }
      })
    }
  }
}
