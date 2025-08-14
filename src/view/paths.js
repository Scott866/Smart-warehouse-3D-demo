const mkLoop = (w=16, h=8, y=0) => {
  const pts = []
  const N = 80
  for (let i=0;i<N;i++){
    const t = i/N
    const a = t * Math.PI * 2
    const x = Math.cos(a) * w*0.5
    const z = Math.sin(a) * h*0.5
    pts.push([x,y,z])
  }
  return pts
}

const paths = {
  loopA: mkLoop(18, 10, 0),
  loopB: mkLoop(14, 7, 0),
  loopC: mkLoop(10, 5, 0),
}
export default paths