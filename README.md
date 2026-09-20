# Petit à petit · 每天一点法语

为《你好！法语》第一版第一册学习者设计的 A1 学习伴侣，已接入第二单元第五课 Trouvez l’objet。React + TypeScript + Vite，纯静态部署到 GitHub Pages，手机与桌面均可使用。

## 学习体验

- 默认使用已确认的第一版（9 单元、36 课）；原来未确认的版本会自动更新，保留草稿与练习进度。可记录当前单元和课名／页码，独立于网站练习的完成状态。
- 教材第五课：三书原页核对、课文逐句合成朗读、位置介词示意、20 张词卡、语法归纳、复数发音对照、28 道客观题、3 份写作草稿与 5 项能力自评。
- 四个原创 A1 场景：打招呼、介绍自己、咖啡馆、问路。
- 听懂情景 → 拆解表达（词汇、翻卡、语音、语法）→ 练习巩固 → 交际任务与“我能……”自评。
- 草稿、自评、表达练习结果保存于当前浏览器。兼容旧版 `petit-progress`：仅迁移为表达练习通过，不当作教材课次完成或交际能力达标。
- 设备语音合成朗读，缺少法语语音时显示提示；不是随书原声，无发音评分或自由文本自动批改。

## 教材依据与范围

见 [教学设计与内容来源](docs/teaching-design.md)。第五课已核对用户提供的学生用书 p38–41、教师用书 p28–30、练习册 p10–11。见 [第五课实施记录](docs/lesson-05.md)。学生用书第3题答案已与教师 p29 核对；练习册解析为网站参考，未读取额外答案页。其余课次尚未逐课处理。

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

- `src/LessonFive.tsx`、`src/lesson-five.ts`：第五课界面、书页来源、题目和判题规则。
- `src/content.ts`：原创对话、学习目标、语法、语音、练习、任务与来源。
- `src/legacy.ts`：保留的四组表达与音标。
- `src/main.tsx`：React 学习界面与交互组件。
- `src/state.ts`：本地存储校验及旧进度迁移。
- `src/styles.css`：现有视觉风格与响应式布局。

三份原书 PDF 及页面定位图保存在已忽略的 `materials/` 目录。只按指定书内页码读取并结构化，原 PDF 和扫描页不进入构建产物或公开仓库。

## 浏览器验证

安装全局 Playwright CLI 后，启动预览，执行：

```sh
playwright-cli -s=companion open http://127.0.0.1:4174/french-learning/
playwright-cli -s=companion run-code --filename=tests/companion.browser.cjs
playwright-cli -s=companion run-code --filename=tests/lesson-five.browser.cjs
playwright-cli -s=companion close
node --test tests/lesson-five.test.ts
```

脚本在隔离的测试浏览器内清除该站点存储，验证旧进度迁移、教材位置、听力题反馈、翻卡、测验、草稿、自评、键盘操作和 320 / 390 / 768 / 1440 像素布局。语音实际听感需在安装法语语音的设备上人工确认。可选 WebMCP `start_french_lesson` 仅在浏览器支持时注册；不依赖它完成学习。
