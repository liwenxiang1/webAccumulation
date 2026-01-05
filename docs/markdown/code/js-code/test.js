let list = [
  {
    type: "select",
    label: "账户简称",
    prop: "zhjc",
    required: true,
    disabled: false,
    options: "zhjcOptions",
  },
  {
    type: "input",
    label: "账户类型",
    prop: "zhlxStr",
    required: false,
    disabled: true,
  },
  {
    type: "dateMonth",
    label: "年月",
    prop: "ybny",
    required: true,
    disabled: false,
  },
  {
    type: "input",
    label: "上期期末余额",
    prop: "qmye",
    required: false,
    disabled: true,
  },
  {
    type: "inputNumber",
    label: "本期期初余额",
    prop: "qcye",
    required: true,
    disabled: false,
  },
  {
    type: "textarea",
    label: "备注",
    prop: "bz",
    required: false,
    disabled: false,
  },
];

let obj = {}
list.forEach(item => {
  let value = ''
  // if (item.type == 'inputNumber') value = 0.0
  // if (item.type == 'input') value = 0.0
  // if (item.type == 'dateMonth') value = new Date().getFullYear() + "-" + new Date().getMonth()
  // if (item.prop == 'ybny') value = new Date().getFullYear() + "-" + new Date().getMonth()
  if (item.prop === "ybny") {
    value = new Date().getFullYear() + "-" + new Date().getMonth()
  } else if (item.prop === "qmye") {
    value = '0.00'
  }
  obj[item.prop] = value
})
console.log(obj)
