import React, { useRef, useState, useEffect } from "react";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

extend({ OrbitControls });

const InteractiveCubes = () => {
  const controlsRef = useRef();
  const [intersects, setIntersects] = useState(null);
  const [rotationData, setRotationData] = useState({ x: 0, y: 0, z: 0 });

  const { camera, scene, raycaster } = useThree();

  useEffect(() => {
    // Fetch rotation data from an external JSON file
    fetch("...")
      .then((response) => response.json())
      .then((data) => setRotationData(data))
      .catch((error) => console.error("Error fetching rotation data:", error));
  }, []);
  useFrame(() => {
    controlsRef.current.update();
  });

  const handlePointerMove = (event) => {
    const pointer = new THREE.Vector2();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const newIntersects = raycaster.intersectObjects(scene.children, false);

    setIntersects(newIntersects.length > 0 ? newIntersects[0].object : null);
  };

  return (
    <>
      <mesh rotation={[rotationData.x, rotationData.y, rotationData.z]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial
          color={intersects ? 0xff0000 : Math.random() * 0xffffff}
        />
      </mesh>
      <group>
        {Array.from({ length: 2000 }).map((_, index) => (
          <mesh
            key={index}
            position={[
              Math.random() * 40 - 20,
              Math.random() * 40 - 20,
              Math.random() * 40 - 20,
            ]}
            rotation={[
              Math.random() * 2 * Math.PI,
              Math.random() * 2 * Math.PI,
              Math.random() * 2 * Math.PI,
            ]}
            scale={[
              Math.random() + 0.5,
              Math.random() + 0.5,
              Math.random() + 0.5,
            ]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshLambertMaterial color={Math.random() * 0xffffff} />
          </mesh>
        ))}
      </group>
      <OrbitControls ref={controlsRef} args={[camera]} />
      <mesh position={[0, 0, -50]}>
        <orthographicCamera
          makeDefault
          left={-25}
          right={25}
          top={25}
          bottom={-25}
          near={0.1}
          far={100}
          position={[0, 0, 5]}
        />
      </mesh>
      <pointerMove onPointerMove={handlePointerMove} />
    </>
  );
};

const App = () => {
  return (
    <div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <InteractiveCubes />
      </Canvas>
    </div>
  );
};

export default App;
