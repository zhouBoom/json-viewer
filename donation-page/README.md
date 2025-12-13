# 捐赠页面项目

一个美观、现代、功能完整的捐赠页面，使用原生 HTML、CSS 和 JavaScript 实现。

![项目预览](https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop)

## ✨ 功能特性

### 核心功能
- 🎯 **预设金额选择** - 5个预设金额选项（¥10、¥50、¥100、¥200、¥500）
- ✍️ **自定义金额输入** - 支持用户输入任意金额（最高9999万）
- 💳 **支付流程** - 完整的支付按钮和成功提示
- 🎉 **成功动画** - 精美的捐赠成功提示模态框
- 📱 **响应式设计** - 完美支持桌面端和移动端

### 设计亮点
- 🎨 **现代美学** - 清新的蓝色渐变背景，避免过度使用紫色
- 🌈 **视觉层次** - 圆角、阴影、渐变效果
- ✨ **流畅动画** - 悬停效果、点击反馈、弹出动画
- 🔤 **优质字体** - 使用 Google Fonts 的 Inter 字体
- 🎭 **玻璃态效果** - 半透明背景和模糊效果

### 技术特性
- ⚡ **零依赖** - 纯原生 JavaScript，无需框架
- 🚀 **Vite 构建** - 快速的开发服务器和构建工具
- 🧪 **完整测试** - Playwright 端到端测试覆盖
- 📦 **易于部署** - 可直接部署到任何静态托管服务

## 📁 项目结构

```
donation-page/
├── index.html              # 页面结构
├── style.css               # 样式文件
├── script.js               # 交互逻辑
├── package.json            # 项目配置
├── vite.config.js          # Vite 配置
├── playwright.config.js    # Playwright 测试配置
├── tests/                  # 测试目录
│   └── donation-page.spec.js
├── serialized_files.json   # 序列化文件
└── README.md               # 项目说明
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3001 查看页面

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

## 🧪 运行测试

### 运行所有测试

```bash
npm test
```

### UI 模式运行测试

```bash
npm run test:ui
```

### 测试覆盖

项目包含 8 个端到端测试用例：

- ✅ 页面加载测试
- ✅ 预设金额选择
- ✅ 自定义金额输入
- ✅ 完整支付流程
- ✅ 金额切换功能
- ✅ 自定义金额覆盖预设金额
- ✅ 信息卡片显示
- ✅ 响应式布局

**测试结果：** 8/8 通过 ✅

## 💡 使用说明

### 选择预设金额

点击任意预设金额按钮（¥10、¥50、¥100、¥200、¥500）即可选择。

### 输入自定义金额

在"或输入自定义金额"输入框中输入任意金额（1-99999999）。

### 完成支付

1. 选择或输入金额
2. 点击"立即支付"按钮
3. 查看捐赠成功提示
4. 点击"完成"按钮关闭提示

### 输入限制

- 最小金额：¥1
- 最大金额：¥99999999（9999万）
- 仅支持正整数
- 自动验证和限制输入

## 🎨 设计规范

### 配色方案

- **主色调**：蓝色系 (#0072ff, #00c6ff, #00d4ff)
- **强调色**：橙红色 (#FF6B6B, #FFD93D)
- **成功色**：绿色 (#4CAF50, #8BC34A)
- **中性色**：灰色系 (#333, #666, #999, #e0e0e0)

### 响应式断点

- **桌面端**：> 768px
- **平板端**：481px - 768px
- **移动端**：≤ 480px

## 🛠️ 技术栈

- **HTML5** - 语义化标签
- **CSS3** - Flexbox、Grid、动画、渐变
- **JavaScript (ES6+)** - 原生 JavaScript
- **Vite** - 构建工具
- **Playwright** - 端到端测试

## 📦 部署

### 静态托管服务

项目可部署到以下平台：

- **Vercel** - `vercel --prod`
- **Netlify** - 拖拽 `dist` 目录
- **GitHub Pages** - 推送到 gh-pages 分支
- **Cloudflare Pages** - 连接 Git 仓库

### 部署步骤

1. 构建项目：`npm run build`
2. 将 `dist` 目录部署到托管服务
3. 配置自定义域名（可选）

## 🔧 自定义配置

### 修改端口

编辑 `vite.config.js`：

```javascript
export default defineConfig({
  server: {
    port: 3001, // 修改为你想要的端口
    open: true,
    host: true
  }
})
```

### 修改预设金额

编辑 `index.html`，找到金额按钮部分：

```html
<button class="amount-btn" data-amount="10">
  <span class="amount-value">¥10</span>
  <span class="amount-label">一杯咖啡</span>
</button>
```

修改 `data-amount`、金额值和标签文字即可。

### 修改配色

编辑 `style.css`，搜索颜色值并替换：

```css
/* 主色调 */
background: linear-gradient(135deg, #0072ff 0%, #00c6ff 100%);
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

**Made with ❤️ by Your Name**
