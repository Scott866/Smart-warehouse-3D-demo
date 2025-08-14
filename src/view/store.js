import { create } from 'zustand'

const useStore = create((set, get) => ({
  playing: true,
  phase: 1, // 1 ASRS in, 2 Depalletize to conveyor, 3 Pick to tote -> MS
  events: [],
  palletsInASRS: 0,
  cartonsOnConv: 0,
  totesInMS: 0,
  addEvent: (msg) => set(s => ({ events: [...s.events, { t: Date.now(), msg }] })),
  clearEvents: () => set({ events: [] }),
  setPhase: (p) => set({ phase: p }),
  togglePlay: () => set(s => ({ playing: !s.playing })),
  reset: () => set({ phase: 1, palletsInASRS: 0, cartonsOnConv: 0, totesInMS: 0, events: [] }),
  inc: (key, v=1) => set(s => ({ [key]: Math.max(0, (s[key]||0) + v) })),
}))

export default useStore