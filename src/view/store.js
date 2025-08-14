import { create } from 'zustand'

const useStore = create((set, get) => ({
  playing: true,
  step: false,
  view: 'iso',
  floor: 1,
  language: 'zh',
  throughput: 0,
  palletsInStore: 0,
  cartonsInStore: 0,
  events: [],
  addEvent: (msg) => set(state => ({ events: [...state.events, { t: Date.now(), msg }] })),
  clearEvents: () => set({ events: [] }),
  replayEvents: () => {
    const es = get().events.slice(-50)
    set({ events: [] })
    es.forEach((e, i) => setTimeout(() => get().addEvent(e.msg), 300 + i * 150))
  },
  togglePlay: () => set(state => ({ playing: !state.playing })),
  stepOnce: () => set({ step: true }),
  setView: (v) => set({ view: v }),
  setFloor: (f) => set({ floor: f }),
  setLanguage: (l) => set({ language: l }),
  incThroughput: (v) => set(state => ({ throughput: Math.max(0, state.throughput * 0.9 + v) })),
  incPallets: (v) => set(state => ({ palletsInStore: Math.max(0, state.palletsInStore + v) })),
  incCartons: (v) => set(state => ({ cartonsInStore: Math.max(0, state.cartonsInStore + v) })),
}))

export default useStore