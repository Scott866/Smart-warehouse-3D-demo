import React from 'react'
import useStore from '../view/store'

export default function ControlPanel() {
  const { playing, stepOnce, togglePlay, setView, setFloor, floor, language, setLanguage } = useStore()
  return (
    <div className="row">
      <button className="btn" onClick={togglePlay}>{playing ? (language==='zh'?'暂停':'Pause') : (language==='zh'?'播放':'Play')}</button>
      <button className="btn" onClick={stepOnce}>{language==='zh'?'单步':'Step'}</button>
      <button className="btn" onClick={() => setView('top')}>{language==='zh'?'顶视':'Top'}</button>
      <button className="btn" onClick={() => setView('iso')}>{language==='zh'?'轴测':'Iso'}</button>
      <button className="btn" onClick={() => setView('free')}>{language==='zh'?'自由':'Free'}</button>
      <button className="btn" onClick={() => setFloor(floor===1?2:1)}>{language==='zh'?'切换 1F/2F':'Switch 1F/2F'}</button>
      <button className="btn" onClick={() => setLanguage(language==='zh'?'en':'zh')}>{language==='zh'?'中文/English':'English/中文'}</button>
    </div>
  )
}