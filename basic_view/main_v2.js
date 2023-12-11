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
      timestamp: 1702323857.31349,
    },
    {
      gyroscope: {
        x: -2,
        y: -14,
        z: -15,
      },
      timestamp: 1702323859.3314,
    },
    {
      gyroscope: {
        x: 9,
        y: -53,
        z: 26,
      },
      timestamp: 1702323860.3402479,
    },
    {
      gyroscope: {
        x: 7,
        y: -44,
        z: 6,
      },
      timestamp: 1702323861.3596714,
    },
    {
      gyroscope: {
        x: 18,
        y: 36,
        z: -9,
      },
      timestamp: 1702323862.3807979,
    },
    {
      gyroscope: {
        x: -86,
        y: 34,
        z: 5,
      },
      timestamp: 1702323863.4000785,
    },
    {
      gyroscope: {
        x: -10,
        y: 42,
        z: -6,
      },
      timestamp: 1702323864.4214542,
    },
    {
      gyroscope: {
        x: 13,
        y: 10,
        z: 18,
      },
      timestamp: 1702323865.4430087,
    },
    {
      gyroscope: {
        x: -1,
        y: -101,
        z: 0,
      },
      timestamp: 1702323866.4650147,
    },
    {
      gyroscope: {
        x: 0,
        y: -36,
        z: -5,
      },
      timestamp: 1702323867.4907694,
    },
    {
      gyroscope: {
        x: 33,
        y: 12,
        z: -23,
      },
      timestamp: 1702323868.5128508,
    },
    {
      gyroscope: {
        x: 30,
        y: 5,
        z: 5,
      },
      timestamp: 1702323869.5349886,
    },
    {
      gyroscope: {
        x: -48,
        y: -7,
        z: 7,
      },
      timestamp: 1702323870.5569665,
    },
    {
      gyroscope: {
        x: -33,
        y: 21,
        z: 6,
      },
      timestamp: 1702323871.5791528,
    },
    {
      gyroscope: {
        x: -2,
        y: -2,
        z: 0,
      },
      timestamp: 1702323872.606039,
    },
    {
      gyroscope: {
        x: -4,
        y: 1,
        z: 0,
      },
      timestamp: 1702323873.6287296,
    },
    {
      gyroscope: {
        x: 6,
        y: 3,
        z: 2,
      },
      timestamp: 1702323874.6515577,
    },
    {
      gyroscope: {
        x: 35,
        y: -3,
        z: 0,
      },
      timestamp: 1702323875.6744723,
    },
    {
      gyroscope: {
        x: -13,
        y: -46,
        z: 27,
      },
      timestamp: 1702323876.6974347,
    },
    {
      gyroscope: {
        x: 3,
        y: -22,
        z: 16,
      },
      timestamp: 1702323877.7241735,
    },
    {
      gyroscope: {
        x: -8,
        y: 7,
        z: -16,
      },
      timestamp: 1702323878.747477,
    },
    {
      gyroscope: {
        x: -4,
        y: -2,
        z: 3,
      },
      timestamp: 1702323879.7707362,
    },
    {
      gyroscope: {
        x: -5,
        y: -1,
        z: 0,
      },
      timestamp: 1702323880.7962222,
    },
    {
      gyroscope: {
        x: -4,
        y: -2,
        z: 0,
      },
      timestamp: 1702323881.8203578,
    },
    {
      gyroscope: {
        x: -4,
        y: 2,
        z: -1,
      },
      timestamp: 1702323882.8482444,
    },
    {
      gyroscope: {
        x: -7,
        y: 117,
        z: -29,
      },
      timestamp: 1702323883.871961,
    },
    {
      gyroscope: {
        x: -6,
        y: 5,
        z: -1,
      },
      timestamp: 1702323884.8957312,
    },
    {
      gyroscope: {
        x: -25,
        y: 16,
        z: 4,
      },
      timestamp: 1702323885.9201443,
    },
    {
      gyroscope: {
        x: -9,
        y: -10,
        z: -1,
      },
      timestamp: 1702323886.9441946,
    },
    {
      gyroscope: {
        x: -4,
        y: -1,
        z: 0,
      },
      timestamp: 1702323887.9721084,
    },
    {
      gyroscope: {
        x: -3,
        y: 0,
        z: 0,
      },
      timestamp: 1702323888.9963539,
    },
    {
      gyroscope: {
        x: -22,
        y: -58,
        z: 35,
      },
      timestamp: 1702323890.0206287,
    },
    {
      gyroscope: {
        x: 0,
        y: -37,
        z: 49,
      },
      timestamp: 1702323891.0450125,
    },
    {
      gyroscope: {
        x: 46,
        y: 126,
        z: -101,
      },
      timestamp: 1702323892.069324,
    },
    {
      gyroscope: {
        x: 4,
        y: -180,
        z: 71,
      },
      timestamp: 1702323893.0859663,
    },
    {
      gyroscope: {
        x: -32,
        y: 170,
        z: -85,
      },
      timestamp: 1702323894.096619,
    },
    {
      gyroscope: {
        x: -43,
        y: -45,
        z: -4,
      },
      timestamp: 1702323895.107101,
    },
    {
      gyroscope: {
        x: -4,
        y: 0,
        z: 0,
      },
      timestamp: 1702323896.1176093,
    },
    {
      gyroscope: {
        x: -4,
        y: -1,
        z: 0,
      },
      timestamp: 1702323897.1282692,
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

    currentRotation.x += latestData.x * 0.0001; // Adjust the scaling factor as needed
    // currentRotation.x += 1 * 0.001;
    currentRotation.y += latestData.y * 0.0001;
    // currentRotation.y += 1 * 0.001;
    currentRotation.z += latestData.z * 0.0001;
    // currentRotation.z += 1 * 0.001;

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
