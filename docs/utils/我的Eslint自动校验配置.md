```js
{
  "files.autoSave": "afterDelay", // 自动保存
  "editor.fontSize": 20, //字号
  "editor.suggestSelection": "recentlyUsedByPrefix", //按使用过的 prefix 前缀优先匹配，方便选择我们的惯用项
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue", //自动覆盖提示的优先默认值，也是为了保持惯用优先
  "workbench.startupEditor": "newUntitledFile", // 保持新开文件一定是一个独立的新窗口
  "workbench.editor.enablePreview": false, // 取消预览模式，保证编辑模式稳定
  "workbench.iconTheme": "material-icon-theme", // 开启 material icons 需要下载插件 Material Icon Theme
  "explorer.compactFolders": false, // 关闭文件夹紧凑模式显示 因为默认情况下，vscode 和 github 保持一致，即当一个文件夹下只有一个文件夹时，会略过中间部分的文件夹，将显示缩略为一行
  "files.eol": "\n", // 默认 lf 结尾 因为linux / mac / win 上的文件结尾符不一样，Git 对于不同的结尾符，在不同平台上可能会引发不一致问题
  "update.mode": "none", //关闭 vscode 自动更新提示，我们定期手动升级即可
  "explorer.confirmDelete": false, //关闭删除二次确认
  "extensions.ignoreRecommendations": false, //关闭 vscode 推荐插件的行为
  "extensions.autoUpdate": "onlyEnabledExtensions", //只有已启用的插件才开启自动 update 更新功能，防止禁用的插件还在后台更新浪费资源
  // "workbench.colorTheme": "Dracula Official", //暗色主题 Dracula Official
  "typescript.preferences.jsxAttributeCompletionStyle": "auto", // tsx 自动补全括号
  "javascript.preferences.jsxAttributeCompletionStyle": "auto", // jsx 自动补全括号
  "editor.inlineSuggest.enabled": true, //使用 Tabnine 或 github copilot 等自动补全插件都需要开启的选项
  "svg.preview.mode": "svg", // 预览 svg 时直接查看源码
  "liveServer.settings.donotShowInfoMsg": true, // 关闭开启liveserver服务提示
  "diffEditor.ignoreTrimWhitespace": false, //vscode 的 diff 行为默认会忽略尾部空字符，为了更精准的控制文件尾，我们需要更加敏感，所以关闭忽略行为

  // 默认格式化方式，统一为 prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.semi": true,
  "prettier.printWidth": 80,
  "prettier.singleQuote": true,
  // eslint 的配置
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.workingDirectories": [{ "mode": "auto" }], // eslint 自动识别工作区

  /* 由于 vscode 自 v1.60 开始原生支持彩色括号和导轨，且性能极好，我们从 Bracket-Pair-Colorizer 插件迁出，详见：
《 vscode1.60 原生高性能括号着色无缝迁移方案（等价Bracket-Pair-Colorizer） 》https://blog.csdn.net/qq_21567385/article/details/120387446
《 vscode1.62 原生代码块边缘导轨着色与Bracket Pair Colorizer的对标和差异化（附配置） 》https://blog.csdn.net/qq_21567385/article/details/121173936 */

  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",

  /* 其他 */
  // svg formatter
  "[svg]": {
    "editor.defaultFormatter": "jock.svg"
  },
  // python format
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  },
  // python language server engine
  "python.languageServer": "Pylance",
  "Codegeex.Privacy": true
}
```
