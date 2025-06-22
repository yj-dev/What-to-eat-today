# 🍽️ 今天吃什么？- 智能食物转盘

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Cursor](https://img.shields.io/badge/Cursor-IDE-00FF00?style=for-the-badge&logo=cursor)

**🎯 解决"今天吃什么"这个世纪难题！**

 [📖 使用指南](#使用指南) | [🚀 快速开始](#快速开始)

</div>

## 🎮 功能演示

### 主要功能
- 🎯 **智能转盘**：随机选择食物，解决选择困难
- 📝 **食物管理**：添加、删除、隐藏食物
- 🔄 **一键恢复**：快速恢复默认设置
- 📱 **历史记录**：查看最近的选择记录
- 🎨 **分类切换**：早餐、中餐、晚餐分类管理

### 特色亮点
- ✨ **精美动画**：转盘旋转、撒花庆祝
- 🎨 **现代UI**：渐变色彩、圆润设计
- 📱 **响应式**：完美适配各种设备
- 💾 **本地存储**：设置永不丢失

---

## 🚀 快速开始

### 环境要求
- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/yj-dev/What-to-eat-today.git
cd food-roulette
```

2. **安装依赖**
```bash
npm install
```


3. **构建启动**   
```bash
npx next build
npx next dev
```


4. **打开浏览器**
访问 [http://localhost:3000](http://localhost:3000) 开始体验

---

## 📖 使用指南

### 基本使用
1. **选择分类**：点击下拉菜单选择早餐、中餐或晚餐
2. **开始转盘**：点击中心的"开始"按钮
3. **查看结果**：等待转盘停止，查看选中的食物
4. **重新开始**：点击"重新转一次"继续游戏

### 高级功能
1. **编辑食物**：点击编辑按钮进入编辑模式
2. **添加食物**：输入食物名称，点击加号添加
3. **隐藏食物**：点击眼睛图标隐藏不喜欢的食物
4. **删除食物**：点击X图标删除自定义食物
5. **恢复默认**：点击"恢复默认食物"重置设置

---

## 🛠️ 技术栈

### 前端框架
- **Next.js 13.5.1** - React 全栈框架
- **React 18.2.0** - 用户界面库
- **TypeScript 5.2.2** - 类型安全

### 样式与UI
- **Tailwind CSS 3.3.3** - 实用优先的CSS框架
- **Lucide React** - 精美图标库
- **CSS3 动画** - 流畅的过渡效果

### 开发工具
- **Cursor IDE** - AI 驱动的智能代码编辑器
- **ESLint** - 代码质量检查
- **PostCSS** - CSS 后处理器
- **SWC** - 快速编译工具

---

## 📁 项目结构

```
food-roulette/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── FoodRoulette.tsx   # 主转盘组件
│   ├── Confetti.tsx       # 撒花动画组件
│   └── ui/                # UI 组件库
├── data/                  # 数据文件
│   └── foods.ts           # 食物数据
├── types/                 # TypeScript 类型定义
│   └── food.ts            # 食物相关类型
├── lib/                   # 工具库
│   └── utils.ts           # 工具函数
└── public/                # 静态资源
```

---

## 🎯 核心特性

### 智能转盘算法
- **精确角度计算**：确保指针指向与显示结果完全匹配
- **物理引擎效果**：真实的旋转惯性和减速效果
- **随机偏移**：避免边界问题，增加随机性

### 数据管理
- **本地存储**：使用 localStorage 持久化用户设置
- **状态管理**：React Hooks 管理复杂状态
- **类型安全**：TypeScript 确保代码质量

### 用户体验
- **响应式设计**：适配各种屏幕尺寸
- **无障碍支持**：键盘导航和屏幕阅读器友好
- **性能优化**：代码分割和懒加载

---


## 🙏 致谢

- [Next.js](https://nextjs.org/) - 优秀的 React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用的 CSS 框架
- [Lucide](https://lucide.dev/) - 精美的图标库
- [Netlify](https://netlify.com/) - 免费的部署平台
- [Cursor](https://cursor.sh/) - AI 驱动的智能代码编辑器


<div align="center">

**⭐ 如果这个项目对你有帮助，请给它一个星标！**

**🍽️ 让选择美食变得简单有趣！**

**🚀 本项目使用 [Cursor](https://cursor.sh/) AI 编辑器开发，提升开发效率！**

</div> 