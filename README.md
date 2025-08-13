# Smart Warehouse 3D Demo (React + Three.js)

This is an English interactive demo that visualizes your smart warehouse concept:
- ASRS (pallet) and Multi-Shuttle (carton) storage
- Two inbound flows: label-out (4-side scan -> ASRS) and label-in (robot arms -> conveyor -> box scan -> Multi-Shuttle)
- Moving AGV/AMR, conveyors, scan zones, and simple robot arm animation
- Floor switch (1F/2F), Play/Pause, camera controls (Orbit), and a small legend
- Minimal CSS (no Tailwind needed)

## Run locally
```bash
npm install
npm run dev
```
Open the printed local URL in your browser.

## Build for static hosting
```bash
npm run build
npm run preview
```
You can deploy the `dist/` folder to any static host (Vercel/Netlify/Cloudflare Pages).

## Notes
- Geometry is abstract for clarity and performance. Swap boxes with real glTF/FBX models if you have assets.
- You can tune camera with the Leva panel (open the control panel icon on screen).
