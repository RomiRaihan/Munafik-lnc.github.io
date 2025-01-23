import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/loaders/GLTFLoader.js";

// Define models and their paths
const models = {
  "model-1": "img/baju1.glb", // Model 1
  "model-2": "img/baju1.glb", // Model 2
  "model-3": "img/baju1.glb", // Model 3
  "model-4": "img/baju1.glb", // Model 4
};

// Wait until the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const modelButtons = document.querySelectorAll(".model-nike"); // Ambil semua tombol model
  const viewer = document.querySelector("#model-1"); // Viewer default
  let currentModel = "model-1"; // Model default

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  viewer.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(
    10,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    1000
  );
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  // Restrict movement to horizontal (left-right)
  controls.minPolarAngle = Math.PI / 2; // Lock vertical movement
  controls.maxPolarAngle = Math.PI / 2; // Lock vertical movement
  controls.update();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(3, 5, 2);
  scene.add(ambientLight, directionalLight);

  const loader = new GLTFLoader();

  function loadModel(modelId) {
    loader.load(
      models[modelId],
      (gltf) => {
        // Bersihkan model lama
        while (scene.children.length > 2) {
          scene.remove(scene.children[2]);
        }

        // Tambahkan model baru
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);

        // Update kamera dan kontrol
        camera.position.set(0, 0, 35);
        controls.update();
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error(`Error loading model ${modelId}:`, error);
      }
    );
  }

  // Load default model
  loadModel(currentModel);

  // Listener untuk tombol model
  modelButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modelId = e.target.id.replace("model-nike", "model-"); // Sesuaikan ID model
      if (modelId !== currentModel) {
        currentModel = modelId; // Update model saat ini
        loadModel(currentModel);
      }
    });
  });

  // Resize event
  const resizeObserver = new ResizeObserver(() => {
    camera.aspect = viewer.clientWidth / viewer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  });
  resizeObserver.observe(viewer);

  // Animasi loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
});

document.addEventListener("DOMContentLoaded", () => {
  const modelButtons = document.querySelectorAll(".model-nike"); // Ambil semua tombol model
  const viewer = document.querySelector("#model-2"); // Viewer default
  let currentModel = "model-2"; // Model default

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  viewer.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(
    10,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    1000
  );
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05; // Restrict movement to horizontal (left-right)
  controls.minPolarAngle = Math.PI / 2; // Lock vertical movement
  controls.maxPolarAngle = Math.PI / 2; // Lock vertical movement
  controls.update();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(3, 5, 2);
  scene.add(ambientLight, directionalLight);

  const loader = new GLTFLoader();

  function loadModel(modelId) {
    loader.load(
      models[modelId],
      (gltf) => {
        // Bersihkan model lama
        while (scene.children.length > 2) {
          scene.remove(scene.children[2]);
        }

        // Tambahkan model baru
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);

        // Update kamera dan kontrol
        camera.position.set(0, 0, 35);
        controls.update();
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error(`Error loading model ${modelId}:`, error);
      }
    );
  }

  // Load default model
  loadModel(currentModel);

  // Listener untuk tombol model
  modelButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modelId = e.target.id.replace("model-nike", "model-"); // Sesuaikan ID model
      if (modelId !== currentModel) {
        currentModel = modelId; // Update model saat ini
        loadModel(currentModel);
      }
    });
  });

  // Resize event
  const resizeObserver = new ResizeObserver(() => {
    camera.aspect = viewer.clientWidth / viewer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  });
  resizeObserver.observe(viewer);

  // Animasi loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
});

document.addEventListener("DOMContentLoaded", () => {
  const modelButtons = document.querySelectorAll(".model-nike"); // Ambil semua tombol model
  const viewer = document.querySelector("#model-3"); // Viewer default
  let currentModel = "model-3"; // Model default

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  viewer.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(
    10,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    1000
  );
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  // Restrict movement to horizontal (left-right)
  controls.minPolarAngle = Math.PI / 2; // Lock vertical movement
  controls.maxPolarAngle = Math.PI / 2; // Lock vertical movement
  controls.update();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(3, 5, 2);
  scene.add(ambientLight, directionalLight);

  const loader = new GLTFLoader();

  function loadModel(modelId) {
    loader.load(
      models[modelId],
      (gltf) => {
        // Bersihkan model lama
        while (scene.children.length > 2) {
          scene.remove(scene.children[2]);
        }

        // Tambahkan model baru
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);

        // Update kamera dan kontrol
        camera.position.set(0, 0, 35);
        controls.update();
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error(`Error loading model ${modelId}:`, error);
      }
    );
  }

  // Load default model
  loadModel(currentModel);

  // Listener untuk tombol model
  modelButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modelId = e.target.id.replace("model-nike", "model-"); // Sesuaikan ID model
      if (modelId !== currentModel) {
        currentModel = modelId; // Update model saat ini
        loadModel(currentModel);
      }
    });
  });

  // Resize event
  const resizeObserver = new ResizeObserver(() => {
    camera.aspect = viewer.clientWidth / viewer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  });
  resizeObserver.observe(viewer);

  // Animasi loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
});

document.addEventListener("DOMContentLoaded", () => {
  const modelButtons = document.querySelectorAll(".model-nike"); // Ambil semua tombol model
  const viewer = document.querySelector("#model-4"); // Viewer default
  let currentModel = "model-4"; // Model default

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  viewer.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(
    10,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    1000
  );
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  // Restrict movement to horizontal (left-right)
  controls.minPolarAngle = Math.PI / 2; // Lock vertical movement
  controls.maxPolarAngle = Math.PI / 2; // Lock vertical movement
  controls.update();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(3, 5, 2);
  scene.add(ambientLight, directionalLight);

  const loader = new GLTFLoader();

  function loadModel(modelId) {
    loader.load(
      models[modelId],
      (gltf) => {
        // Bersihkan model lama
        while (scene.children.length > 2) {
          scene.remove(scene.children[2]);
        }

        // Tambahkan model baru
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);

        // Update kamera dan kontrol
        camera.position.set(0, 0, 35);
        controls.update();
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error(`Error loading model ${modelId}:`, error);
      }
    );
  }

  // Load default model
  loadModel(currentModel);

  // Listener untuk tombol model
  modelButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modelId = e.target.id.replace("model-nike", "model-"); // Sesuaikan ID model
      if (modelId !== currentModel) {
        currentModel = modelId; // Update model saat ini
        loadModel(currentModel);
      }
    });
  });

  // Resize event
  const resizeObserver = new ResizeObserver(() => {
    camera.aspect = viewer.clientWidth / viewer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  });
  resizeObserver.observe(viewer);

  // Animasi loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
});
