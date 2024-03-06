/*
 * @Author: liwenxiang
 * @Date: 2024-03-03 18:09:23
 * @LastEditors: liwenxiang
 * @LastEditTime: 2024-03-06 21:55:41
 */
/*
 * @Author: liwenxiang
 * @Date: 2024-03-03 18:09:23
 * @LastEditors: liwenxiang
 * @LastEditTime: 2024-03-04 20:57:33
 */
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
	lang: 'zh-CN',
	base: '/webAccumulation/',
	title: '前端积累',
	description: '前路漫漫，任重道远',

	theme: defaultTheme({
		// 默认主题配置
		navbar: [
			{
				text: '首页',
				link: '/'
			},
			{
				text: '前端积累',
				link: '/accumulation/prototype'
			},
			{
				text: '大屏案例',
				link: 'https://github.com/liwenxiang1/bigScreen'
			},
			{
				text: 'CSDN',
				link: 'https://blog.csdn.net/weixin_42569598'
			}
		],
		sidebar: [
			{
				collapsable: false,
				sidebarDepth: 1,
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
					'/accumulation/setAndmap'
				]
			}
		]
	}),
	bundler: webpackBundler()
})
