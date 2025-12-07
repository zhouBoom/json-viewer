# JSON 查看工具

一个功能强大的JSON查看工具，提供多种视图模式和数据预览功能。

## 功能特性

- **多种视图模式**：
  - 树状视图：以树形结构展示JSON数据
  - 列表视图：以扁平化列表展示所有JSON路径和值
  - 编辑器视图：提供JSON编辑和格式化功能

- **数据预览**：
  - 自动识别数据类型和统计信息
  - 显示总项数、字符串、数字、布尔值、空值、数组、对象的数量
  - 显示JSON数据的最大深度

- **交互功能**：
  - 支持上传JSON文件
  - 支持直接在编辑器中输入JSON数据
  - 实时JSON验证和错误提示
  - 编辑器支持格式化功能

## 技术栈

- **前端框架**：React 19
- **构建工具**：Vite 7
- **测试框架**：Playwright
- **语言**：JavaScript

## 快速开始

### 依赖安装

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:5173 启动。

### 生产构建

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

### 运行测试

```bash
npx playwright test
```

## 项目结构

```
json-viewer/
├─ dist/                # 生产构建产物
├─ public/              # 静态资源
├─ src/                 # 源代码
│  ├─ components/       # React组件
│  ├─ styles/           # 样式文件
│  └─ pages/            # 页面组件（当前项目未使用）
├─ tests/               # Playwright测试
├─ docs/                 # 文档目录
└─ README.md            # 项目说明文档
```

## 使用说明

1. **上传JSON文件**：点击"上传JSON文件"按钮，选择本地JSON文件
2. **输入JSON数据**：切换到编辑器视图，直接输入或粘贴JSON数据
3. **切换视图模式**：使用顶部的视图切换按钮选择树状视图、列表视图或编辑器视图
4. **查看数据预览**：在数据预览区域查看JSON数据的统计信息
5. **编辑和格式化**：在编辑器视图中可以编辑JSON数据，并使用"格式化"按钮美化JSON格式

## 浏览器支持

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## 许可证

MIT
