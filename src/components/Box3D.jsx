import AnimatedPanel from "./AnimatedPanel";

function Box3D({ fold, dieline }) {
  const progress = fold / 100;

  const boxWidth = dieline.box.width;
  const boxHeight = dieline.box.height;
  const boxDepth = dieline.box.depth;

  const panels = [
    {
      id: "front",
      color: "orange",
      size: [boxWidth, boxHeight, 0.04],
      flatPosition: [0, 0, 0],
      flatRotation: [0, 0, 0],
      closedPosition: [0, 0, boxDepth / 2],
      closedRotation: [0, 0, 0],
    },
    {
      id: "right",
      color: "lightgreen",
      size: [boxDepth, boxHeight, 0.04],
      flatPosition: [boxWidth / 2 + boxDepth / 2, 0, 0],
      flatRotation: [0, 0, 0],
      closedPosition: [boxWidth / 2, 0, 0],
      closedRotation: [0, Math.PI / 2, 0],
    },
    {
      id: "back",
      color: "violet",
      size: [boxWidth, boxHeight, 0.04],
      flatPosition: [boxWidth + boxDepth, 0, 0],
      flatRotation: [0, 0, 0],
      closedPosition: [0, 0, -boxDepth / 2],
      closedRotation: [0, Math.PI, 0],
    },
    {
      id: "left",
      color: "lightblue",
      size: [boxDepth, boxHeight, 0.04],
      flatPosition: [-(boxWidth / 2 + boxDepth / 2), 0, 0],
      flatRotation: [0, 0, 0],
      closedPosition: [-boxWidth / 2, 0, 0],
      closedRotation: [0, -Math.PI / 2, 0],
    },
    {
      id: "top",
      color: "pink",
      size: [boxWidth, boxDepth, 0.04],
      flatPosition: [0, boxHeight / 2 + boxDepth / 2, 0],
      flatRotation: [0, 0, 0],
      closedPosition: [0, boxHeight / 2, 0],
      closedRotation: [-Math.PI / 2, 0, 0],
    },
    {
      id: "bottom",
      color: "yellow",
      size: [boxWidth, boxDepth, 0.04],
      flatPosition: [0, -(boxHeight / 2 + boxDepth / 2), 0],
      flatRotation: [0, 0, 0],
      closedPosition: [0, -boxHeight / 2, 0],
      closedRotation: [Math.PI / 2, 0, 0],
    },
  ];

  return (
    <>
      {panels.map((panel) => (
        <AnimatedPanel
          key={panel.id}
          image={dieline.imageUrl}
          color={panel.color}
          size={panel.size}
          flatPosition={panel.flatPosition}
          flatRotation={panel.flatRotation}
          closedPosition={panel.closedPosition}
          closedRotation={panel.closedRotation}
          progress={progress}
        />
      ))}
    </>
  );
}

export default Box3D;