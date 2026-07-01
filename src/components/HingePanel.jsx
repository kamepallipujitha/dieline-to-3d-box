import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function HingePanel({
  hingePosition,
  offset,
  color,
  targetRotation = [0, 0, 0],
}) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.x +=
      (targetRotation[0] - groupRef.current.rotation.x) * 0.08;

    groupRef.current.rotation.y +=
      (targetRotation[1] - groupRef.current.rotation.y) * 0.08;

    groupRef.current.rotation.z +=
      (targetRotation[2] - groupRef.current.rotation.z) * 0.08;
  });

  return (
    <group ref={groupRef} position={hingePosition}>
      <mesh position={offset}>
        <boxGeometry args={[2, 2, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0} />
      </mesh>
    </group>
  );
}

export default HingePanel;