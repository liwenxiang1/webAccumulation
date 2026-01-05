## 介绍一下 defineModel

在 `Vue 3 `中，`defineModel` 是一个用于简化双向绑定的函数，通常与组合式函数（`composition function）`一起使用。

**一、主要作用**

1.  自动解包响应式对象：

    - 当在组合式函数中使用响应式对象时，使用 `defineModel` 可以自动解包响应式对象的属性，使得这些属性可以在模板中直接使用，无需通过`.value `来访问。

    * 例如，如果有一个响应式对象 `state`，其中包含属性 `count`，在不使用 `defineModel` 时，在模板中需要使用 `state.count.value` 来访问 `count` 的值。但使用 `defineModel` 后，可以直接在模板中使用 `count`。

2.  实现双向绑定：

    - 配合 `v-model` 指令使用时，`defineModel` 可以轻松实现双向绑定。它会自动处理输入事件，并将新的值更新到响应式对象中。

    - 例如，在一个自定义组件中，使用 `defineModel` 可以让组件的 `props `中的一个值与组件内部的状态实现双向绑定，使得父组件和子组件之间的数据传递更加方便。

**二、使用方法**

1. 导入`defineModel`

   ```js
   //在组合式函数中，首先需要从'vue'模块中导入`defineModel`函数。

   import { defineModel } from 'vue';
   ```

2. 使用 `defineModel`：

   - 在组合式函数内部，将需要双向绑定的响应式对象作为参数传递给 `defineModel`。

   ```js
   import { reactive } from 'vue';

   export default function useCounter() {
     const state = reactive({
       count: 0,
     });

     return defineModel(() => ({
       count: state.count,
     }));
   }
   ```

   - 在上面的例子中，`state.count `是一个响应式属性，通过` defineModel` 函数返回后，可以在模板中直接使用 `count` 进行双向绑定。

3. 在模板中使用：
   - 在组件的模板中，可以使用`v-model`指令来绑定使用了 `defineModel` 的属性。
   ```js
   <template>
     <div>
       <input v-model="count" />
     </div>
   </template>
   <script setup>
   import useCounter from "./useCounter";
   const { count } = useCounter();
   </script>
   ```
   - 在这个例子中，input 元素的 v-model 绑定了 count 属性，当用户在输入框中输入内容时，count 的值会自动更新，实现了双向绑定。

## 都是支持响应式， defineModel 和 reactive 有何不同

**一、功能目的**

1. `reactive：`

主要用于创建`响应式对象`。它接收一个普通的 `JavaScript` 对象，并将其转换为响应式对象，使得对这个对象的属性进行修改时，可以触发依赖这个对象的组件重新渲染。

2. `defineModel：`

主要用于在组合式函数中`简化双向绑定的实现`。它通常与 `reactive` 等响应式函数一起使用，`自动解包`响应式对象的属性，使得这些属性可以在模板中直接使用，无需通过`.value` 来访问，并且方便与 `v-model` 指令配合实现双向绑定。

**二、使用方式**

1. `reactive：`

直接接收一个普通对象作为参数，返回一个响应式对象。这个响应式对象的属性可以在组件的逻辑部分（如 setup 函数、方法等）中被修改，从而触发视图更新。

2. `defineModel：`

在组合式函数中使用，通常返回一个对象，其中包含需要进行双向绑定的属性。这个对象中的属性可以在模板中直接使用 v-model 指令进行双向绑定。

**三、作用范围**

1. `reactive：`

创建的响应式对象可以在整个组件中使用，包括模板、setup 函数、方法等。它主要用于管理组件的状态数据，使得这些数据的变化能够反映到视图中。

2. `defineModel：`
   主要作用于组合式函数中，用于处理特定的逻辑并返回可以在模板中进行双向绑定的属性。它的作用范围相对较窄，主要是为了方便实现双向绑定的场景。
