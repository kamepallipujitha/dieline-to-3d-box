# 2D Dieline to 3D Folding Box

A React + Three.js application that converts a 2D dieline into an interactive 3D folding carton.

## Features

- Upload PNG/JPG/PDF dieline
- Preview uploaded file
- Interactive 3D folding animation
- Fold progress slider
- Orbit controls (rotate, zoom, pan)
- React Three Fiber + Three.js rendering

## Tech Stack

- React
- Vite
- Three.js
- React Three Fiber
- React Three Drei
- PDF.js

## Project Structure

```
src/
├── components/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
```

## How to Run

```bash
npm install
npm run dev
```

## Assumptions

This implementation is optimized for the provided straight tuck-end sample dieline, following the assumptions allowed in the challenge brief.

## Future Improvements

- Generic dieline parser
- Automatic panel detection
- Cut and crease line recognition
- Texture mapping on individual box faces
