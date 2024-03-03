/*
 * @Author: liwenxiang
 * @Date: 2024-03-03 18:09:23
 * @LastEditors: liwenxiang
 * @LastEditTime: 2024-03-03 19:33:52
 */
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
	lang: 'zh-CN',
  base: "/webAccumulation/",
	title: '李文香的前端积累',
	description: '哇哈哈哈',

	theme: defaultTheme({
		// 默认主题配置
		navbar: [
			{
				text: '首页',
				link: '/'
			},
			{
				text: '前端积累',
				link: '/accumulation/'
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
				children: ['/accumulation/prototype']
			}
		]
	}),
	bundler: webpackBundler()
})
