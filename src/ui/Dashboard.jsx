import React from 'react'
import useStore from '../view/store'

export default function Dashboard() {
  const { throughput, palletsInStore, cartonsInStore, events, clearEvents, replayEvents, language } = useStore()
  const t = (zh, en) => (language==='zh'? zh : en)
  return (
    <div className="dashboard panel">
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h3 style={{margin:'6px 0'}}>{t('仪表盘','Dashboard')}</h3>
        <div className="tag">{t('WMS 模拟','WMS Sim')}</div>
      </div>
      <div className="row">
        <div className="panel" style={{padding:10, flex:'1 1 100px'}}>
          <div className="small">{t('吞吐(ips)','Throughput (ips)')}</div>
          <div style={{fontSize:24, fontWeight:700}}>{throughput.toFixed(2)}</div>
        </div>
        <div className="panel" style={{padding:10, flex:'1 1 100px'}}>
          <div className="small">{t('在库托盘','Pallets in ASRS')}</div>
          <div style={{fontSize:24, fontWeight:700}}>{palletsInStore}</div>
        </div>
        <div className="panel" style={{padding:10, flex:'1 1 100px'}}>
          <div className="small">{t('在库箱数','Cartons in MS')}</div>
          <div style={{fontSize:24, fontWeight:700}}>{cartonsInStore}</div>
        </div>
      </div>
      <div className="section">
        <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <div className="small">{t('最近事件','Recent Events')}</div>
          <div className="row">
            <button className="btn" onClick={clearEvents}>{t('清空','Clear')}</button>
            <button className="btn" onClick={replayEvents}>{t('回放','Replay')}</button>
          </div>
        </div>
        <div className="log">
          {events.slice(-200).map((e,i)=>(<div key={i}>[{new Date(e.t).toLocaleTimeString()}] {e.msg}</div>))}
        </div>
      </div>
    </div>
  )
}