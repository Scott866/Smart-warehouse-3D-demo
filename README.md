# Smart Warehouse 3D Demo (React + Three.js)

一个可部署的 Web 交互 Demo，用于演示 1F/2F 仓储场景、AGV/AMR 运动（含简单避让）、入库判断流程（四面扫描/两臂抓取/输送带/箱体扫描 → ASRS/Multi‑Shuttle）、UI 控制（播放/暂停、单步、视角快切、楼层切换）以及仪表盘（吞吐、在库数量、事件日志）。

> 说明：当前演示采用占位几何体与简化逻辑，方便快速验证交互与流程。后续可替换 glTF/FBX 真实模型与精确 Layout。

## 本地运行

```bash
npm install
npm run dev
# 打开显示的本地地址，如 http://localhost:5173
```

## 生产构建

```bash
npm run build
npm run preview
```

## 一键部署

### Vercel

1. 安装 [Vercel CLI](https://vercel.com/docs/cli)
2. 执行：
   ```bash
   vercel
   ```
   按提示选择 `Build Command: npm run build`，`Output Dir: dist`。

### Netlify

1. 在 Netlify 新建站点 → 连接你的 Git 仓库（或拖拽 `dist/`）。
2. 构建设置：`Build command: npm run build`，`Publish directory: dist`。

## 功能点对照

- **AGV/AMR 路线**：3 条椭圆 loop（可扩展），包含邻近距离判断的“错车/减速”简易避让。
- **入库流程**：
  - 栈板扫描器（四面扫描效果 + 扫描高亮）→ 模拟 ASRS 入库计数。
  - 箱体扫描器（扫描光带/闪烁）→ 模拟 Multi‑Shuttle 入库计数。
- **机械臂/输送带**：放置占位输送线与扫描器；机械臂可在后续替换为真实模型与时序。
- **UI 控制**：播放/暂停、单步推进、顶视/轴测/自由视角、1F/2F 切换、中英切换。
- **仪表盘**：吞吐（ips，指数衰减平滑）、在库托盘/箱数、WMS 事件日志（清空/回放）。
- **热键**：`Space` 播放/暂停；`N` 单步；`1/2/3` 切换视角。

## 替换资产 & 深化

- 将 `/src/view/actors/` 内部占位物体替换为你的 glTF/FBX 模型：
  ```jsx
  import { useGLTF } from '@react-three/drei'
  const { scene } = useGLTF('/models/arm.glb')
  return <primitive object={scene} />
  ```
- 在 `/src/view/paths.js` 中定义真实路线点位；或改为基于导航网格/路径规划。

## 目录结构

```
warehouse-3d-demo
├─ src
│  ├─ ui               # UI 面板/仪表盘
│  ├─ view
│  │  ├─ actors        # AGV、扫描器、输送带（占位）
│  │  ├─ systems       # 全局系统：相机、WMS 模拟等
│  │  ├─ paths.js      # 路径点
│  │  ├─ Scene.jsx
│  │  └─ store.js      # Zustand 全局状态
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## 常见问题

- **白屏/端口占用**：修改 `package.json` 脚本为 `vite --port 5174` 或关闭占用进程。
- **三维卡顿**：降低对象数量、减少阴影、在 `Canvas` 上设置 `dpr={[1, 1.5]}`。

## 许可
MIT（你可自由商用/二次开发）。