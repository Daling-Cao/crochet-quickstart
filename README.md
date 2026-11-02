# 钩针步骤助手

上传一张图片，生成钩针图解，然后跟着 3D 演示一圈一圈地钩。每钩完一步点「做完了」，页面就往下走一步。

在线版（Claude Artifact，需有访问权限）：https://claude.ai/artifact/AAkgoRdMUPQU6uCQDwE6rb

## 能做什么

- **作品模板**：平面圆片、立体小球、小熊、小兔、小猫玩偶。
- **图解计算**：每个部件用一条轮廓曲线描述，按行高切成一圈圈，用每圈周长 ÷ 针宽算出针数，再把相邻两圈的针数差均匀分布成加针、减针（奇数圈错开半格）。程序会核对每一圈的针数。
- **分步教程**：准备材料、每一圈怎么钩、装安全眼、塞棉花、收尾、组装缝合（缝合位置会算到第几圈）。
- **3D 整体视图**：整个作品逐圈成形，针目是短针的 V 字形状，镜头会跟着当前部件。
- **3D 针法特写**：分解演示短针、加针、减针、引拔针，以及在线环里钩短针，可以暂停、单步、调速。
- **配色**：6 套预设色卡，主色、浅色、鼻子色都可以自定义。
- **AI 识图**：让 Claude 看照片，选出最接近的模板、颜色和尺寸。
  - 在 Claude Artifact 里：使用平台的 `sample` 能力，花的是打开者自己的 Claude 额度，不需要 API Key。
  - 本地打开：在页面里填 Anthropic API Key，浏览器直接调用 Claude API（模型 `claude-opus-5-5`）。

## 使用

直接用浏览器打开 `index.html`。3D 库从 jsDelivr 加载，需要联网。

## 发布到 Claude Artifact

Artifact 发布时会自动套上 `<html>`、`<head>`、`<body>` 外壳，所以要先生成去掉外层标签的版本：

```bash
node scripts/build-artifact.mjs
```

生成的 `dist/artifact.html` 再用 Claude 的 Artifact 工具发布，声明能力 `{sample: {images: true}}`。

## 文件

| 文件 | 说明 |
|---|---|
| `index.html` | 整个应用（单文件：图片识别、图解计算、步骤面板、3D） |
| `scripts/build-artifact.mjs` | 从 `index.html` 生成 Artifact 版本 |

## 已知限制

- 图片识别只能认出纯色圆形；玩偶的形状来自模板，图片只决定颜色（AI 识图可以帮忙选模板）。
- 针法特写是示意动画，钩针和线的走向做了简化。
- 生成的图解还没有用真线逐一钩过验证。
