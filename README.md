# 1F 物料流三步 Demo（React + Three.js）

**步骤设计**
1. **栈板入 ASRS**：显示 4 排货架、2 条巷道各有 1 台堆垛机在往复运行（行走 + 升降）。
2. **ASRS 出库 → 拆垛**：栈板从 ASRS 出库至两台拆垛机械手区域，机械手将箱体逐个放上输送线。
3. **上料至 Tote → Multi‑Shuttle**：输送线尽头的机械手将箱体抓取到 Tote 中；Tote 装满后驶入 Multi‑Shuttle 箱库。

> 注：该 Demo 为交互与流程预演，几何为占位模型，后续可替换为真实 glTF/FBX 与精确布局。

## 运行

```bash
npm install
npm run dev
```

打开本地地址（如 `http://localhost:5173`）。

## 控制说明
- 右上面板：**播放/暂停、步骤1/2/3、复位**。
- 日志会实时记录入库、拆垛上线、Tote 入库等事件。
- 步骤之间可随时切换，动画逻辑将按当前步骤执行。

## 构建与部署
```bash
npm run build
npm run preview
```
- **Vercel/Netlify**：构建命令 `npm run build`，发布目录 `dist`。

## 目录结构
```
warehouse-1f-demo
├─ src
│  ├─ ui/App.jsx
│  └─ view
│     ├─ Scene.jsx
│     ├─ store.js
│     ├─ actors
│     │  ├─ Ground.jsx
│     │  ├─ Racks.jsx
│     │  └─ StackerCranes.jsx
│     └─ flows
│        └─ InboundFlow.jsx
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## 许可
MIT（可自由商用与二次开发）。