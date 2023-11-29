// Author: Tatenda Samudzi
// ISU Netid : tdsamu@iastate.edu
// Date :  November 28, 2023
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Data = () => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:8081/showData";
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!sensorData) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set initial camera position
    camera.position.z = 5;

    // Update cube rotation based on gyroscope data
    const updateCubeRotation = () => {
      if (!cube || !sensorData.sensor_data) return;

      const gyroscopeData = sensorData.sensor_data[sensorData.sensor_data.length - 1].gyroscope;

      cube.rotation.x += gyroscopeData.x * 0.01;
      cube.rotation.y += gyroscopeData.y * 0.01;
      cube.rotation.z += gyroscopeData.z * 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(updateCubeRotation);
    };

    // Start updating cube rotation
    updateCubeRotation();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sensorData]);

  return <></>;
};

export default Data;
