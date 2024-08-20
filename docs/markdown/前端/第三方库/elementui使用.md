<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-08-19 16:38:51
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2024-08-20 10:33:09
 * @FilePath: \vuepress-starter\docs\markdown\前端\第三方库\elementui使用.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# elementui 使用

#### 一、el-tree 树的刷新

```
<el-tree
    lazy
    :load="loadNode"
    highlight-current
    :props="defaultProps"
    @node-click="handleNodeClick"
    style="height:650px;overflow-y: auto;">
</el-tree>

handleNodeClick(data, node) {
    this.currentNode = node
}
loadNode(node, resolve) {
    if (node.level === 0) {
        this.treeNode0 = node
        ....
}
refreshAllData() { //刷新整颗树
  this.treeNode0.loaded = false;
  this.treeNode0.expand();
},
refreshCurrentNode() { //刷新当前树
  setTimeout(() => {
    this.currentNode.loaded = false;
    this.currentNode.expand();
  }, 500)
},
```
