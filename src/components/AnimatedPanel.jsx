import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function AnimatedPanel({
  image,
  color,
  flatPosition,
  flatRotation,
  closedPosition,
  closedRotation,
  progress,
  size,
}) {
  const ref = useRef();
  const texture = image ? useLoader(TextureLoader, image) : null;

  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.x =
      flatPosition[0] + (closedPosition[0] - flatPosition[0]) * progress;
    ref.current.position.y =
      flatPosition[1] + (closedPosition[1] - flatPosition[1]) * progress;
    ref.current.position.z =
      flatPosition[2] + (closedPosition[2] - flatPosition[2]) * progress;

    ref.current.rotation.x =
      flatRotation[0] + (closedRotation[0] - flatRotation[0]) * progress;
    ref.current.rotation.y =
      flatRotation[1] + (closedRotation[1] - flatRotation[1]) * progress;
    ref.current.rotation.z =
      flatRotation[2] + (closedRotation[2] - flatRotation[2]) * progress;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />

      <meshStandardMaterial
        color={color}
        map={texture}
        roughness={0.65}
        metalness={0.02}
      />
    </mesh>
  );
}

export default AnimatedPanel;