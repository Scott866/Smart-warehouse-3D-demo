import { create } from 'zustand'
const useStore=create((set)=>({playing:true,phase:0,throughput:0,palletsASRS:0,cartonsOnConv:0,totesInMS:0,events:[],addEvent:(m)=>set(s=>({events:[...s.events,{t:Date.now(),msg:m}]})),togglePlay:()=>set(s=>({playing:!s.playing})),setPhase:(p)=>set({phase:p}),inc:(k,v=1)=>set(s=>({[k]:(s[k]||0)+v}))}))
export default useStore
