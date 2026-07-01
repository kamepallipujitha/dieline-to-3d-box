import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Box3D from "./Box3D";

function Scene({ fold, dieline }) {
  return (
    <Canvas
      camera={{ position: [5, 4, 7], fov: 45 }}
      style={{
        width: "100%",
        height: "100vh",
        background: "#e5e7eb",
        borderRadius: "12px",
      }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      <Box3D fold={fold} dieline={dieline} />

      <OrbitControls />
    </Canvas>
  );
}

export default Scene;