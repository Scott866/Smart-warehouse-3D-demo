import React from 'react'
import Scene from '../view/Scene'
import useStore from '../view/store'

export default function App(){
  const { playing, togglePlay, phase, setPhase, events, clearEvents, palletsInASRS, cartonsOnConv, totesInMS, reset } = useStore()
  return (
    <div style={{height:'100%'}}>
      <div className="overlay">
        <div className="panel">
          <h3 style={{marginTop:0}}>1F 物料流三步演示</h3>
          <div className="small">① 栈板入 ASRS（4排货架、2巷道堆垛机） → ② 出库至两台拆垛机械手上料至输送线 → ③ 机械手装箱至托盘箱（tote），tote 进入 Multi‑Shuttle</div>
          <div style={{height:8}} />
          <div className="row">
            <button className="btn" onClick={togglePlay}>{playing?'暂停':'播放'}</button>
            <button className="btn" onClick={()=>setPhase(1)}>步骤1</button>
            <button className="btn" onClick={()=>setPhase(2)}>步骤2</button>
            <button className="btn" onClick={()=>setPhase(3)}>步骤3</button>
            <button className="btn" onClick={reset}>复位</button>
          </div>
        </div>
        <div className="panel right">
          <div className="row" style={{justifyContent:'space-between'}}>
            <strong>状态面板</strong>
          </div>
          <div className="row">
            <div className="panel" style={{padding:8, flex:'1 1 90px'}}>
              <div className="small">ASRS 托盘</div>
              <div style={{fontSize:22, fontWeight:700}}>{palletsInASRS}</div>
            </div>
            <div className="panel" style={{padding:8, flex:'1 1 90px'}}>
              <div className="small">输送线箱数</div>
              <div style={{fontSize:22, fontWeight:700}}>{cartonsOnConv}</div>
            </div>
            <div className="panel" style={{padding:8, flex:'1 1 90px'}}>
              <div className="small">MS Tote</div>
              <div style={{fontSize:22, fontWeight:700}}>{totesInMS}</div>
            </div>
          </div>
          <div style={{height:8}} />
          <div className="small">事件日志</div>
          <div className="log">
            {events.slice(-200).map((e,i)=>(<div key={i}>[{new Date(e.t).toLocaleTimeString()}] {e.msg}</div>))}
          </div>
          <div style={{marginTop:6}}><button className="btn" onClick={clearEvents}>清空日志</button></div>
        </div>
      </div>
      <Scene />
    </div>
  )
}