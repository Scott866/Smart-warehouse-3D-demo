import React from 'react'
import Scene from '../view/Scene'
import ControlPanel from './ControlPanel'
import Dashboard from './Dashboard'
import useStore from '../view/store'

export default function App() {
  const { language } = useStore()
  const t = (zh, en) => (language === 'zh' ? zh : en)
  return (
    <div className="grid">
      <div className="sidebar panel">
        <h2>Smart Warehouse 3D Demo</h2>
        <div className="small">{t('1F/2F 切换、视角快切、播放/暂停、单步推进，以及吞吐和事件日志','Switch floors, quick views, play/pause, step-by-step, throughput & event log')}</div>
        <div className="section">
          <ControlPanel />
        </div>
        <div className="section panel" style={{padding:12}}>
          <h3 style={{marginTop:0}}>{t('入库判断流程','Inbound Decision Flow')}</h3>
          <ol className="light">
            <li>{t('栈板 label 朝外 → 四面扫描 → 直接入 ASRS','Pallet label out → 4-side scan → ASRS')}</li>
            <li>{t('label 朝内 → 两臂抓取 → 输送带 → 箱体相机扫描 → 入 Multi‑Shuttle','Label in → dual-arm grab → conveyor → carton scan → Multi‑Shuttle')}</li>
          </ol>
          <div className="small">{t('注意：本演示为逻辑与效果预览，几何模型为占位符。','Note: prototype visuals with placeholder geometry.')}</div>
        </div>
        <div className="section panel" style={{padding:12}}>
          <h3 style={{marginTop:0}}>{t('快捷键','Hotkeys')}</h3>
          <div className="light">
            <div><span className="kbd">Space</span> - {t('播放/暂停','Play/Pause')}</div>
            <div><span className="kbd">N</span> - {t('单步推进','Step')}</div>
            <div><span className="kbd">1 / 2 / 3</span> - {t('视角 Top / Iso / Free','View Top / Iso / Free')}</div>
          </div>
        </div>
      </div>
      <div className="canvas-wrap">
        <Scene />
        <Dashboard />
      </div>
    </div>
  )
}