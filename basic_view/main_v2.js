import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 3, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const material = [
//     new THREE.MeshStandardMaterial({ color: 0xff0000 }), // Right
//     new THREE.MeshStandardMaterial({ color: 0x00ff00 }), // Left
//     new THREE.MeshStandardMaterial({ color: 0x0000ff }), // Top
//     new THREE.MeshStandardMaterial({ color: 0xffff00 }), // Bottom
//     new THREE.MeshStandardMaterial({ color: 0xff00ff }), // Front
//     new THREE.MeshStandardMaterial({ color: 0x00ffff })  // Back
//   ];
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }

// function animate() {
//     requestAnimationFrame(animate);

//     // Assuming you have loaded the JSON data into a variable named jsonData
//     if (jsonData && jsonData.sensor_data) {
//       // Get the latest gyroscope data
//       const latestData = jsonData.sensor_data[jsonData.sensor_data.length - 1];

//       // Update cube rotation based on gyroscope data
//       cube.rotation.x = (latestData.gyroscope.x * Math.PI) / 180;  // Convert degrees to radians
//       cube.rotation.y = (latestData.gyroscope.y * Math.PI) / 180;
//       cube.rotation.z = (latestData.gyroscope.z * Math.PI) / 180;
//     }

//     renderer.render(scene, camera);
//   }
// animate();

const jsonData = {
  sensor_data: [
    {
      gyroscope: {
        x: -4,
        y: -1,
        z: 0,
      },
      timestamp: 1702410092.9506986,
    },
    {
      gyroscope: {
        x: -4,
        y: -1,
        z: 0,
      },
      timestamp: 1702410093.9596395,
    },
    {
      gyroscope: {
        x: -4,
        y: 0,
        z: 2,
      },
      timestamp: 1702410094.9685519,
    },
    {
      gyroscope: {
        x: 10,
        y: -35,
        z: 0,
      },
      timestamp: 1702410095.977557,
    },
    {
      gyroscope: {
        x: 26,
        y: 18,
        z: 9,
      },
      timestamp: 1702410096.9969535,
    },
    {
      gyroscope: {
        x: 3,
        y: 24,
        z: 0,
      },
      timestamp: 1702410098.0224729,
    },
    {
      gyroscope: {
        x: -78,
        y: -21,
        z: -39,
      },
      timestamp: 1702410099.043644,
    },
    {
      gyroscope: {
        x: -10,
        y: 7,
        z: 8,
      },
      timestamp: 1702410100.0649433,
    },
    {
      gyroscope: {
        x: -1,
        y: 2,
        z: -2,
      },
      timestamp: 1702410101.0860002,
    },
    {
      gyroscope: {
        x: -4,
        y: 3,
        z: 4,
      },
      timestamp: 1702410102.107987,
    },
    {
      gyroscope: {
        x: 25,
        y: -25,
        z: 6,
      },
      timestamp: 1702410103.133729,
    },
    {
      gyroscope: {
        x: -6,
        y: -19,
        z: -2,
      },
      timestamp: 1702410104.155419,
    },
    {
      gyroscope: {
        x: -28,
        y: -25,
        z: -20,
      },
      timestamp: 1702410105.1772778,
    },
    {
      gyroscope: {
        x: 0,
        y: -7,
        z: 3,
      },
      timestamp: 1702410106.199061,
    },
    {
      gyroscope: {
        x: -1,
        y: 20,
        z: -2,
      },
      timestamp: 1702410107.220942,
    },
    {
      gyroscope: {
        x: -11,
        y: 25,
        z: 6,
      },
      timestamp: 1702410108.2473538,
    },
    {
      gyroscope: {
        x: -7,
        y: -3,
        z: 0,
      },
      timestamp: 1702410109.2694798,
    },
    {
      gyroscope: {
        x: -17,
        y: -8,
        z: 3,
      },
      timestamp: 1702410110.291801,
    },
    {
      gyroscope: {
        x: 27,
        y: -28,
        z: -2,
      },
      timestamp: 1702410111.314128,
    },
    {
      gyroscope: {
        x: -21,
        y: -16,
        z: -6,
      },
      timestamp: 1702410112.3368447,
    },
    {
      gyroscope: {
        x: 1,
        y: -13,
        z: -6,
      },
      timestamp: 1702410113.3631215,
    },
    {
      gyroscope: {
        x: -2,
        y: -3,
        z: -11,
      },
      timestamp: 1702410114.3860452,
    },
    {
      gyroscope: {
        x: 12,
        y: -65,
        z: -36,
      },
      timestamp: 1702410115.4090462,
    },
    {
      gyroscope: {
        x: -4,
        y: -2,
        z: 0,
      },
      timestamp: 1702410116.4321952,
    },
    {
      gyroscope: {
        x: -4,
        y: -1,
        z: 0,
      },
      timestamp: 1702410117.4555097,
    },
    {
      gyroscope: {
        x: -4,
        y: -1,
        z: 0,
      },
      timestamp: 1702410118.4833345,
    },
  ],
};

// Create a variable to store the current rotation
const currentRotation = { x: 0, y: 0, z: 0 };
const delayBetweenFrames = 2000;

async function animate() {
  requestAnimationFrame(animate);

  // Update the cube's rotation using the gyroscope data from the JSON file
  for (let i = 0; i < jsonData.sensor_data.length; i++) {
    const latestData = jsonData.sensor_data[i].gyroscope;

    // currentRotation.x += latestData.x * 0.0001; // Adjust the scaling factor as needed
    // // currentRotation.x += 1 * 0.001;
    // currentRotation.y += latestData.y * 0.0001;
    // // currentRotation.y += 1 * 0.001;
    // currentRotation.z += latestData.z * 0.0001;
    // // currentRotation.z += 1 * 0.001;

    cube.rotation.x = currentRotation.x;
    cube.rotation.y = currentRotation.y;
    cube.rotation.z = currentRotation.z;

    console.log(latestData);

    // cube.rotation.x += latestData.x * 0.00025;
    // cube.rotation.y += latestData.y * 0.00025;
    // cube.rotation.z += latestData.z * 0.00025;

    renderer.render(scene, camera);
    await new Promise((resolve) => setTimeout(resolve, delayBetweenFrames));

    // currentRotation.x = 0;
    // currentRotation.y = 0;
  }
}

animate();

// // Load the JSON file
// fetch("basic_viewpublicmpu6050_data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     jsonData = data;
//     animate(); // Start the animation loop after loading the JSON data
//   })
//   .catch((error) => console.error("Error loading JSON file:", error));
