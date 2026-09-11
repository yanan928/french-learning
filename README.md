# Petit à petit · 每天一点法语

面向中文使用者的法语入门静态网站，适配手机和桌面。无框架、无构建依赖、无后端。

包含 4 个生活主题、16 个表达、音标、设备法语朗读、翻卡练习和选择题。全对后完成课程，进度存于当前浏览器 localStorage，不跨设备同步。朗读依赖系统安装的法语语音；不可用时页面会提示，其他练习可正常使用。

## 本地预览

在项目根目录执行 `python3 -m http.server 4173 --directory dist`，访问 http://localhost:4173 。

## 发布到 GitHub Pages

1. 将项目上传到目标 GitHub 仓库的 `main` 分支，保留 `.github/workflows/pages.yml`。
2. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 在 **Actions** 中运行 **Deploy to GitHub Pages**，或向 `main` 推送一次修改。
4. 工作流成功后，在 Pages 设置或部署任务中打开网站链接，通常为 `https://用户名.github.io/仓库名/`。

部署只上传 `dist`；所有页面资源使用相对路径，兼容仓库子路径。若默认分支不是 main，请修改工作流的分支名。公共仓库可使用 GitHub Free 的 Pages；私有仓库可用性取决于 GitHub 套餐。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## 修改内容

- `dist/app.js`：课程、表达、音标和交互。
- `dist/styles.css`：视觉样式与响应式布局。
- `dist/index.html`：页面结构与网站信息。

字体全部使用系统字体，无第三方 CDN 依赖。可选 WebMCP 入口 `start_french_lesson` 仅在支持该接口的浏览器中注册。
