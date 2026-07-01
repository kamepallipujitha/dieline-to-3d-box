import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Panel({
  position,
  color,
  targetRotation = [0, 0, 0],
}) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.x +=
      (targetRotation[0] - group.current.rotation.x) * 0.08;

    group.current.rotation.y +=
      (targetRotation[1] - group.current.rotation.y) * 0.08;

    group.current.rotation.z +=
      (targetRotation[2] - group.current.rotation.z) * 0.08;
  });

  return (
    <group
      ref={group}
      position={position}
    >
      <mesh>
        <boxGeometry args={[2, 2, 0.05]} />

        <meshStandardMaterial
          color={color}
          roughness={0.8}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

export default Panel;