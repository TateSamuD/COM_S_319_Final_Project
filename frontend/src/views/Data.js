import React, { useRef, useState, useEffect } from "react";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

extend({ OrbitControls });

const InteractiveCubes = () => {
  const controlsRef = useRef();
  const [intersects, setIntersects] = useState(null);
  const [gyroscopeReadings, setGyroscopeReadings] = useState([]);
  const [currentReadingIndex, setCurrentReadingIndex] = useState(0);

  const { camera, scene, raycaster } = useThree();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "..../mpu_sensor/sensor_data/mpu6050_data.json"
        );
        const data = await response.json();
        setGyroscopeReadings(data.sensor_data);
      } catch (error) {
        console.error("Error loading JSON file:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useFrame(() => {
    controlsRef.current.update();

    // Update rotation values based on gyroscope readings
    if (gyroscopeReadings.length > 0) {
      const { x, y, z } = gyroscopeReadings[currentReadingIndex].gyroscope;
      setIntersects(null); // Reset intersects for simplicity

      // Update rotation values
      setCurrentReadingIndex(
        (prevIndex) => (prevIndex + 1) % gyroscopeReadings.length
      );
      controlsRef.current.target.set(x, y, z);
    }
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
      <mesh rotation={[0, 0, 0]}>
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
