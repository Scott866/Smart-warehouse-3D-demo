import React from 'react'
import Scene from '../view/Scene'
import useStore from '../view/store'
export default function App(){const s=useStore();return (<div style={{height:'100%'}}><div style={{position:'absolute',left:12,top:12,zIndex:10}}><button onClick={()=>s.togglePlay()}>{s.playing?'Pause':'Play'}</button><button onClick={()=>s.setPhase(1)}>Step1</button><button onClick={()=>s.setPhase(2)}>Step2</button><button onClick={()=>s.setPhase(3)}>Step3</button></div><Scene/></div>)}
