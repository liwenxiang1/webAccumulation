import {dataSet} from "./data.js";
//标题
let columns = 'gsmc,fgsmc,wlbm,wlms,cj,wldj,wlzsl,wlhj,bcsyl,xkcsl,wldw,rksj'
columns = columns.split(',').map(item => {
  return {title: item}
})
//数据
let data = dataSet.map(item => {
  let arr = columns.map(cItem => {
    return item[cItem.title]
  })
  return arr
})
console.log("columns", columns)
console.log("data", data)
window.onload = () => {
  console.log("$('#example')", $('#example'))
  let example = $('#grid_box').DataTable({
    data: data,
    columns: columns,
    paging: false,
    searching: false, //搜索栏
    lengthChange: false, //是否允许改变每页显示的数据条数
    ordering: false,
  });
}

