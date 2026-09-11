# Petit à petit · 每天一点法语

为《你好！法语》第一册学习者设计的 A1 学习伴侣。React + TypeScript + Vite，纯静态部署到 GitHub Pages，手机与桌面均可使用。

## 学习体验

- 默认使用已确认的第一版（9 单元、36 课）；原来未确认的版本会自动更新，保留草稿与练习进度。可记录当前单元和课名／页码，独立于网站练习的完成状态。
- 四个原创 A1 场景：打招呼、介绍自己、咖啡馆、问路。
- 听懂情景 → 拆解表达（词汇、翻卡、语音、语法）→ 练习巩固 → 交际任务与“我能……”自评。
- 草稿、自评、表达练习结果保存于当前浏览器。兼容旧版 `petit-progress`：仅迁移为表达练习通过，不当作教材课次完成或交际能力达标。
- 设备语音合成朗读，缺少法语语音时显示提示；不是随书原声，无发音评分或自由文本自动批改。

## 教材依据与范围

见 [教学设计与内容来源](docs/teaching-design.md)。共同参考第一版学生用书、教师用书和配套练习册。已核对三书的出版社介绍，具体教学页、习题与答案尚待材料核对；未取得用户目录前，不给原创练习虚构教材课号、页码或逐课对应关系。

## 本地运行

需要 Node.js 24。

```sh
npm ci
npm run dev
```

开发地址：http://127.0.0.1:5173/french-learning/

```sh
npm run build
npm run preview
```

构建预览：http://127.0.0.1:4174/french-learning/

## 发布

向 `main` 推送时，`.github/workflows/pages.yml` 安装锁定依赖、执行类型检查和生产构建，并部署 `dist`。GitHub Pages 的 Source 设置为 GitHub Actions。

线上地址：https://yanan928.github.io/french-learning/

`vite.config.ts` 的 base 为 `/french-learning/`，更换仓库名称时须同步修改。`dist` 是构建产物，不提交；没有后端、密钥或第三方字体 CDN。

## 内容与代码

- `src/content.ts`：原创对话、学习目标、语法、语音、练习、任务与来源。
- `src/legacy.ts`：保留的四组表达与音标。
- `src/main.tsx`：React 学习界面与交互组件。
- `src/state.ts`：本地存储校验及旧进度迁移。
- `src/styles.css`：现有视觉风格与响应式布局。

原书材料如需本地处理，放在已忽略的 `materials/` 目录；逐页读取与课程结构化，原文件不作为网站公开资源。

## 浏览器验证

安装全局 Playwright CLI 后，启动预览，执行：

```sh
playwright-cli -s=companion open http://127.0.0.1:4174/french-learning/
playwright-cli -s=companion run-code --filename=tests/companion.browser.cjs
playwright-cli -s=companion close
```

脚本在隔离的测试浏览器内清除该站点存储，验证旧进度迁移、教材位置、听力题反馈、翻卡、测验、草稿、自评、键盘操作和 320 / 390 / 768 / 1440 像素布局。语音实际听感需在安装法语语音的设备上人工确认。可选 WebMCP `start_french_lesson` 仅在浏览器支持时注册；不依赖它完成学习。
