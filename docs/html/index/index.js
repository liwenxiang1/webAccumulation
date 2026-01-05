window.onload = function () {
  let listObj = {
    'antv-f2学习': {
      'index.html': '',
      'js': {},
      'res': {},
      '北京肺炎趋势.html': '',
      '折线图.html': '',
      '环形图.html': '',
      '组合图.html': ''
    },
    'canvas': {
      'animation-test.html': '',
      'animation-test2.html': '',
      'antv-f2.html': '',
      'canvas-clock.html': '',
      'canvas-image1.html': '',
      'canvas-image2.html': '',
      'canvas-mouse1.html': '',
      'canvas-mouse2.html': '',
      'canvas-mouse3.html': '',
      'canvas-seat.html': '',
      'test.html': ''
    },
    'clock': {'clock.html': ''},
    'colorui': {'button': {'index.html': ''}},
    'home': {'dataTable': {'home1.html': ''}, 'home.html': ''},
    'html效果': {
      '3D无限循环图片流': {'images': {}, 'index.html': ''},
      '3D樱花飘落动画': {'index.html': ''},
      'CSS3实现的卡通文字动画': {'index2.html': ''},
      'CSS3水墨风格背景动画按钮': {'index.html': ''},
      'HTML5和CSS3实现的自定义3D滑杆控': {'index.html': ''},
      'JS富有创意的卡通滑杆拖动控件': {'index2.html': ''},
      'Vue鼠标悬停图片放大倾斜动画': {'img': {}, 'index.html': ''},
      '优惠券九宫格抽奖手机模板': {'images': {}, 'index.html': ''},
      '化学元素周期表动画': {'index.html': ''},
      '基于Flexbox的响应式蜂巢样式': {'images': {}, 'index.html': ''},
      '基于TweenMax.js的图片碎裂切换动画': {'images': {}, 'index.html': ''},
      '彩色的烟花爆炸动画特效': {'demo.html': ''},
      '手机端转盘抽奖优惠卷页面': {'images': {}, 'index.html': ''},
      '照片撕裂切换动画': {'index.html': ''}
    },
    'index': {},
    'input': {'switch.html': '', 'test.html': ''},
    'js游戏': {'五子棋游戏': {'index.html': '', 'test': {}}},
    'login': {'index.html': ''},
    'README_files': {},
    'Sprite': {'test.html': ''},
    'svg': {'cat.html': '', 'circle.html': '', 'star.html': ''},
    'test': {'test.html': '', 'test1.html': ''},
    'three': {'aframe.html': '', 'ar.html': '', 'models': {}, 'scripts': {}, 'styles': {}, 'threejs.html': ''},
    'wave': {'dist': {}, 'wave-svg.html': '', 'wave.html': '', 'wave1.html': ''},
    'index.html': '',
  }
  let basePath = 'https://m.zhaoyj.work/h5-test/html/'

  function dirSort(a, b) {
    if (listObj[a] == '' && listObj[b] != '') return 1
    else if (listObj[a] == '' && listObj[b] == 0) return 0
    else if (listObj[a] !== '' && listObj[b] == '') return -1
  }

  function initPage() {
    // listObj = JSON.stringify(listObj, Object.keys(listObj).sort((a, b) => dirSort(a, b)))
    // listObj = JSON.parse(listObj)
    $("#load-progress").hide()
    let showList = $("<ul class='main-layout'></ul>");
    showAll(listObj, showList, []);
    $(".sidebar").append("<p>Html目录：</p>").append(showList);
    $(".sidebar").addClass("active-flag")
    $(".a-view").addClass("active-flag")
    $('.li-dir').each((index, item) => {
      $(item).click(function () {
        let mDir = $(item).data("dir")
        let mClass = $(`ul[data-parent="${mDir}"]`).attr('class')
        let mContentLi = $(`ul[data-parent="${mDir}"]`).children("li")
        if (mContentLi.length <= 0) {
          showToast({title: "提示!", message: "当前目录下没有html文件！", type: "error",});
          return
        }
        if (mClass.indexOf('expand') != -1) $(`ul[data-parent="${mDir}"]`).removeClass('expand')
        else $(`ul[data-parent="${mDir}"]`).addClass('expand')
      })
    })
  }

  function showAll(data, parentDom, parentKey) {
    $.each(data, function (key, index) {//遍历数据集
      let type = typeof data[key]
      if (type == 'string') {//html页面
        let path = parentKey.join("/")
        path = path ? path + "/" : path
        let li1 = $(`<li>
                      <div class='li-item'>
                          <i class='icon-web'></i><a class='a-view' target='_blank' href='${basePath + path + key}'>${key}</a>
                      </div>
                    </li>`);
        $(li1).appendTo(parentDom);
      } else {//文件夹
        let dataTag = [...parentKey, key]
        let childClass = Object.keys(data[key]).length > 0 ? '' : 'no-child'
        let li2 = $(`<li>
                      <div class='li-item li-dir ${childClass}' data-dir='${dataTag.join("/")}'>
                        <i class='icon-dir'></i>${key}
                      </div>
                    </li>`);
        let ul = $(`<ul class='ul-content expand' data-parent='${dataTag.join("/")}'></ul>`);
        $(li2).append(ul).appendTo(parentDom);
        showAll(data[key], $(li2).children().eq(1), [...parentKey, key])
      }
    });
  }

  setTimeout(() => {
    initPage()
  }, 1000)
}

// Toast function
function showToast({title = "", message = "", type = "info", duration = 1000}) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");
    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 2500);
    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };
    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle"
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <div class="toast__title">${title}</div>
                        <div class="toast__msg">${message}</div>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>`;
    main.appendChild(toast);
  }
}
