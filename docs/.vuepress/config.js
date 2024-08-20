/*
 * @Author: liwenxiang
 * @Date: 2024-03-03 18:09:23
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2024-08-20 10:10:26
 */
import { webpackBundler } from '@vuepress/bundler-webpack';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress/cli';

export default defineUserConfig({
  lang: 'zh-CN',
  base: '/webAccumulation/',
  title: '前端积累',
  description: '前路漫漫，任重道远',
  port: '5000',
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '前端积累',
        link: '/accumulation/prototype',
      },
      {
        text: '代码块',
        link: '/utils/codeBlock',
      },
      {
        text: '算法',
        link: '/algorithm/index',
      },
      {
        text: '知识记录',
        link: '/markdown/前端/html/css知识',
      },
      {
        text: '大屏案例',
        link: 'https://github.com/liwenxiang1/bigScreen',
      },
      {
        text: 'CSDN',
        link: 'https://blog.csdn.net/weixin_42569598',
      },
    ],
    sidebar: {
      '/accumulation/': [
        {
          // collapsable: false,
          text: '前端积累',
          link: '/accumulation/prototype',
          sidebarDepth: 1, //显示上一篇，下一篇
          children: [
            '/accumulation/prototype',
            '/accumulation/apply',
            '/accumulation/websocket',
            '/accumulation/arrowFun',
            '/accumulation/eventLoop',
            '/accumulation/defineProperty',
            '/accumulation/val',
            '/accumulation/array',
            '/accumulation/deepclone',
            '/accumulation/setAndmap',
          ],
        },
      ],
      '/utils/': [
        {
          text: '代码块',
          link: '/utils/codeBlock',
          sidebarDepth: 1,
          children: [
            {
              text: 'fixed 从父原则导致 z-index 无效',
              link: '/utils/fixed',
            },
            {
              text: '浏览器原生进度条-progress',
              link: '/utils/progress',
            },
            {
              text: 'instanceof 实现原理',
              link: '/utils/instanceof',
            },
            {
              text: '移动端手写下拉刷新',
              link: '/utils/mobilePull',
            },
            {
              text: 'loadding 效果-移动端小球上下浮动',
              link: '/utils/app-loading',
            },
            {
              text: '论如何在 node 使用命令行',
              link: '/utils/nodeUtile',
            },
            {
              text: '判断用户浏览器',
              link: '/utils/userAgent',
            },
            {
              text: '判断 div 滚动到底部',
              link: '/utils/divScroll',
            },
            {
              text: '单行、多行文本溢出',
              link: '/utils/text-overflow',
            },
            {
              text: 'console的使用',
              link: '/utils/console',
            },
            {
              text: '浏览器自动识别数字成电话号码',
              link: '/utils/浏览器自动识别数字成电话号码',
            },
            {
              text: 'Vue开发技巧',
              link: '/utils/Vue开发技巧',
              children: ['/utils/Vue开发技巧'],
            },
            {
              text: 'markdown使用语法',
              link: '/utils/markdown',
            },
            {
              text: '我的Eslint自动校验配置',
              link: '/utils/我的Eslint自动校验配置',
            },
          ],
        },
        {
          text: '工具',
          link: '/utils/readConfig',
          children: [
            {
              text: '读取本地配置文件 JSON',
              link: '/utils/readConfig',
            },
            {
              text: '常用数组处理工具',
              link: '/utils/arrayUtils',
              children: ['/utils/arrayUtils'],
            },
            {
              text: '常用数字处理工具',
              link: '/utils/numberUtil',
            },
            {
              text: '常用日期时间处理工具',
              link: '/utils/dateUtil',
            },
            {
              text: '常用正则表达式',
              link: '/utils/regExp',
              children: ['/utils/regExp'],
            },
          ],
        },
      ],
      '/algorithm/': [
        {
          text: '简单',
          link: '/algorithm/simple/比较字符串',
          children: [
            {
              text: '比较字符串',
              link: '/algorithm/simple/比较字符串',
            },
            {
              text: '找出数组重复次数组多的元素',
              link: '/algorithm/simple/数组重复次数',
            },
            {
              text: '水仙花数',
              link: '/algorithm/simple/水仙花数',
            },
            {
              text: '反转一个3位整数',
              link: '/algorithm/simple/反转一个3位整数',
            },
            {
              text: '查找斐波纳契数列中第 N 个数',
              link: '/algorithm/simple/查找斐波纳契数列中第 N 个数',
            },
            {
              text: '删除一个字母的回文',
              link: '/algorithm/simple/删除一个字母的回文',
            },
            {
              text: '反转整数',
              link: '/algorithm/simple/反转整数',
            },
            {
              text: '姓名去重',
              link: '/algorithm/simple/姓名去重',
            },
            {
              text: '分解质因数',
              link: '/algorithm/simple/分解质因数',
            },
            {
              text: '合并排序数组',
              link: '/algorithm/simple/合并排序数组',
            },
            {
              text: '搜索二维矩阵',
              link: '/algorithm/simple/搜索二维矩阵',
            },
            {
              text: '字符串密钥格式',
              link: '/algorithm/simple/字符串密钥格式',
            },
            {
              text: '最大子数组',
              link: '/algorithm/simple/最大子数组',
            },
            {
              text: '两数之和',
              link: '/algorithm/simple/两数之和',
            },
            {
              text: '中位数',
              link: '/algorithm/simple/中位数',
            },
            {
              text: '落单的数',
              link: '/algorithm/simple/落单的数',
            },
            {
              text: '爬楼梯',
              link: '/algorithm/simple/爬楼梯',
            },
            {
              text: '数组中的最长单词',
              link: '/algorithm/simple/数组中的最长单词',
            },

            {
              text: '找到和为零的子数组',
              link: '/algorithm/simple/找到和为零的子数组',
            },
            {
              text: '检测 2 的幂次',
              link: '/algorithm/simple/检测 2 的幂次',
            },
            {
              text: '两个字符串是变位词',
              link: '/algorithm/simple/两个字符串是变位词',
            },
            {
              text: '原地删除数组元素',
              link: '/algorithm/simple/原地删除数组元素',
            },
            {
              text: '第一个只出现一次的字符',
              link: '/algorithm/simple/第一个只出现一次的字符',
            },
            {
              text: '字符串压缩',
              link: '/algorithm/simple/字符串压缩',
            },
            {
              text: '判断字符串的循环移动',
              link: '/algorithm/simple/判断字符串的循环移动',
            },
            {
              text: '丢失的数',
              link: '/algorithm/simple/丢失的数',
            },
            {
              text: '相亲数',
              link: '/algorithm/simple/相亲数',
            },
            {
              text: '爬楼梯 2',
              link: '/algorithm/simple/爬楼梯2',
            },
            {
              text: '奇偶分割数组',
              link: '/algorithm/simple/奇偶分割数组',
            },
          ],
        },
        {
          text: '中等',
          link: '/algorithm/middle/最长回文子串',
          children: [
            { text: '最长回文子串', link: '/algorithm/middle/最长回文子串' },
            { text: '三数之和', link: '/algorithm/middle/三数之和' },
            { text: 'LRU 缓存机制', link: '/algorithm/middle/LRU缓存机制' },
            {
              text: '盛最多水的容器',
              link: '/algorithm/middle/盛最多水的容器',
            },
            {
              text: '搜索旋转排序数组',
              link: '/algorithm/middle/搜索旋转排序数组',
            },
            { text: '合并区间', link: '/algorithm/middle/合并区间' },
            { text: '全排列', link: '/algorithm/middle/全排列' },
            {
              text: '二叉树的右视图',
              link: '/algorithm/middle/二叉树的右视图',
            },
            {
              text: '二叉树的层序遍历',
              link: '/algorithm/middle/二叉树的层序遍历',
            },
            { text: '岛屿数量', link: '/algorithm/middle/岛屿数量' },
            { text: '复原 IP 地址', link: '/algorithm/middle/复原IP地址' },
            { text: '螺旋矩阵', link: '/algorithm/middle/螺旋矩阵' },
            {
              text: '二叉树的锯齿形层次遍历',
              link: '/algorithm/middle/二叉树的锯齿形层次遍历',
            },
            { text: '零钱兑换', link: '/algorithm/middle/零钱兑换' },
            {
              text: '删除链表的倒数第 N 个节点',
              link: '/algorithm/middle/删除链表的倒数第N个节点',
            },
            { text: '括号生成', link: '/algorithm/middle/括号生成' },
            {
              text: '安卓系统手势解锁',
              link: '/algorithm/middle/安卓系统手势解锁',
            },
            { text: '跳跃游戏', link: '/algorithm/middle/跳跃游戏' },
            { text: '最小路径和', link: '/algorithm/middle/最小路径和' },
            { text: '132 模式', link: '/algorithm/middle/132模式' },
            { text: '统计重复个数', link: '/algorithm/middle/统计重复个数' },
            { text: '行星碰撞', link: '/algorithm/middle/行星碰撞' },
            { text: '安排会议日程', link: '/algorithm/middle/安排会议日程' },
            { text: '跳跃游戏2', link: '/algorithm/middle/跳跃游戏2' },
            { text: '转置矩阵', link: '/algorithm/middle/转置矩阵' },
            {
              text: '奇数未小于相邻偶数为的值',
              link: '/algorithm/middle/奇数未小于相邻偶数为的值',
            },
            { text: '第 k 大元素', link: '/algorithm/middle/第k大元素' },
            { text: '丑数', link: '/algorithm/middle/丑数' },
            { text: '统计数字', link: '/algorithm/middle/统计数字' },
            {
              text: '无重复字符的最长子串',
              link: '/algorithm/middle/无重复字符的最长子串',
            },
            { text: '摆动序列', link: '/algorithm/middle/摆动序列' },
          ],
        },
      ],
      '/markdown': [
        {
          text: '前端',
          collapsible: true,
          children: [
            {
              text: 'html',
              children: [
                '/markdown/前端/html/css知识',
                '/markdown/前端/html/js方法',
                '/markdown/前端/html/js基础',
              ],
            },
            {
              text: 'vue',
              // link: '/markdown/前端/vue/vue3+ts+vite+electron知识',
              children: [
                '/markdown/前端/vue/vue3+ts+vite+electron知识',
                '/markdown/前端/vue/vue项目介绍',
                '/markdown/前端/vue/vue知识',
              ],
            },
            {
              text: 'uniapp',
              // link: '/markdown/前端/uniapp/Dcloud生态产品的使用',
              children: [
                '/markdown/前端/uniapp/Dcloud生态产品的使用',
                '/markdown/前端/uniapp/uniapp使用renderjs',
                '/markdown/前端/uniapp/uniapp原生问题',
                '/markdown/前端/uniapp/uniapp在移动端打开pdf文件',
              ],
            },
            {
              text: '微信小程序',
              // link: '/markdown/前端/微信小程序/个人工具箱',
              children: ['/markdown/前端/微信小程序/个人工具箱'],
            },
            {
              text: '第三方库',
              // link: '/markdown/前端/第三方库/Cordova',
              children: [
                '/markdown/前端/第三方库/Cordova',
                '/markdown/前端/第三方库/elementui使用',
                '/markdown/前端/第三方库/highcharts',
                '/markdown/前端/第三方库/nuxt知识',
                '/markdown/前端/第三方库/uniapp前端使用uQRCode生成二维码带文字',
                '/markdown/前端/第三方库/vant组件使用遇到的问题',
              ],
            },
            {
              text: 'UniCloud',
              // link: '/markdown/前端/UniCloud/20210823新增',
              collapsable: true,
              children: [
                {
                  text: '20210823新增',
                  link: '/markdown/前端/UniCloud/20210823新增',
                },
                {
                  text: '查询文档',
                  link: '/markdown/前端/UniCloud/查询文档',
                },
                {
                  text: '更新文档',
                  link: '/markdown/前端/UniCloud/更新文档',
                },
                {
                  text: '删除文档',
                  link: '/markdown/前端/UniCloud/删除文档',
                },
                {
                  text: '使用UniCloud总结',
                  link: '/markdown/前端/UniCloud/使用UniCloud总结',
                },
                {
                  text: '数据库操作符',
                  link: '/markdown/前端/UniCloud/数据库操作符',
                },
                {
                  text: '新增文档',
                  link: '/markdown/前端/UniCloud/新增文档',
                },
                {
                  text: 'unicloud前端网页托管',
                  link: '/markdown/前端/UniCloud/unicloud前端网页托管',
                },
              ],
            },
            // {
            //   text: '调研测试',
            //   // link: '/markdown/前端/调研测试/第3讲API接口说明@20181025',
            //   children: [
            //     {
            //       text: '第3讲API接口说明@20181025',
            //       link: '/markdown/前端/调研测试/第3讲API接口说明@20181025',
            //     },
            //     {
            //       text: '第三方验证码',
            //       link: '/markdown/前端/调研测试/第三方验证码',
            //     },
            //     {
            //       text: '前端实现翻书效果-turn.js优化',
            //       link: '/markdown/前端/调研测试/前端实现翻书效果-turn.js优化',
            //     },
            //     {
            //       text: '微信公众号',
            //       link: '/markdown/前端/调研测试/微信公众号',
            //     },
            //     {
            //       text: '应用框架',
            //       link: '/markdown/前端/调研测试/应用框架',
            //     },
            //     {
            //       text: 'Canvas绘制效果',
            //       link: '/markdown/前端/调研测试/Canvas绘制效果',
            //     },
            //     {
            //       text: 'NativeJs蓝牙Gatt连接',
            //       link: '/markdown/前端/调研测试/NativeJs蓝牙Gatt连接',
            //     },
            //     {
            //       text: 'NativeJs蓝牙Gatt连接1',
            //       link: '/markdown/前端/调研测试/NativeJs蓝牙Gatt连接1',
            //     },
            //   ],
            // },
          ],
        },
      ],
    },
  }),
  bundler: webpackBundler(),
});
