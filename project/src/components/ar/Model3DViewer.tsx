import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';

interface Model3DViewerProps {
  url: string;
  isRotating: boolean;
}

const Model: React.FC<{ url: string; isRotating: boolean }> = ({ url, isRotating }) => {
  // This is a fallback model for demo purposes
  const modelUrl = url || '/models/chair.glb';
  
  // In a real implementation, we would load the model provided by the URL
  // const { scene } = useGLTF(modelUrl);
  
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const Model3DViewer: React.FC<Model3DViewerProps> = ({ url, isRotating }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <PresentationControls
        global
        rotation={[0, isRotating ? Math.sin(Date.now() * 0.001) * 0.5 : 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 250 }}
      >
        <Model url={url} isRotating={isRotating} />
      </PresentationControls>
      
      <Environment preset="apartment" />
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={isRotating}
        autoRotateSpeed={2}
      />
    </Canvas>
  );
};

export default Model3DViewer;