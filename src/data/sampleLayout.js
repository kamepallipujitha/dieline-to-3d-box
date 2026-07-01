const sampleLayout = [
  {
    id: "front",
    color: "orange",
    hingePosition: [0, 0, 0],
    offset: [0, 0, 0],
    axis: null,
    angle: 0,
  },

  {
    id: "left",
    color: "lightblue",
    hingePosition: [-1, 0, 0],
    offset: [-1, 0, 0],
    axis: "y",
    angle: Math.PI / 2,
  },

  {
    id: "right",
    color: "lightgreen",
    hingePosition: [1, 0, 0],
    offset: [1, 0, 0],
    axis: "y",
    angle: -Math.PI / 2,
  },

  {
    id: "top",
    color: "pink",
    hingePosition: [0, 1, 0],
    offset: [0, 1, 0],
    axis: "x",
    angle: -Math.PI / 2,
  },

  {
    id: "bottom",
    color: "yellow",
    hingePosition: [0, -1, 0],
    offset: [0, -1, 0],
    axis: "x",
    angle: Math.PI / 2,
  },
];

export default sampleLayout;