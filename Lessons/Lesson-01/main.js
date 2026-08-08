console.log(THREE);

/* =========================
   SCENE
========================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050505);

/* =========================
   CAMERA
========================= */

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.set(0, 2.5, 9);

/* =========================
   CANVAS
========================= */

const canvas = document.querySelector("#threeD");

/* =========================
   RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;

/* =========================
   LIGHTING
========================= */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);

scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2);

keyLight.position.set(5, 8, 6);

keyLight.castShadow = true;

scene.add(keyLight);

const blueLight = new THREE.PointLight(0x2266ff, 30, 20);

blueLight.position.set(-5, 2, 3);

scene.add(blueLight);

const redLight = new THREE.PointLight(0xff0033, 25, 20);

redLight.position.set(5, 1, -3);

scene.add(redLight);

/* =========================
   CAR GROUP
========================= */

const car = new THREE.Group();

scene.add(car);

/* =========================
   BODY
========================= */

const bodyGeometry = new THREE.BoxGeometry(4.8, 0.75, 2);

const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0xdddddd,
  metalness: 0.9,
  roughness: 0.18,
});

const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

body.position.y = 1.25;

body.scale.z = 0.9;

body.castShadow = true;

car.add(body);

/* =========================
   HOOD
========================= */

const hoodGeometry = new THREE.BoxGeometry(2.1, 0.35, 1.8);

const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);

hood.position.set(1.45, 1.65, 0);

hood.rotation.z = -0.02;

car.add(hood);

/* =========================
   CABIN
========================= */

const cabinGeometry = new THREE.BoxGeometry(2.2, 0.85, 1.65);

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x050505,
  metalness: 0.4,
  roughness: 0.05,
  transparent: true,
  opacity: 0.8,
});

const cabin = new THREE.Mesh(cabinGeometry, glassMaterial);

cabin.position.set(-0.25, 1.95, 0);

cabin.rotation.z = -0.08;

car.add(cabin);

/* =========================
   ROOF
========================= */

const roofGeometry = new THREE.BoxGeometry(1.5, 0.15, 1.5);

const roof = new THREE.Mesh(roofGeometry, glassMaterial);

roof.position.set(-0.25, 2.4, 0);

car.add(roof);

/* =========================
   WHEELS
========================= */

function createWheel(x, z) {
  const geometry = new THREE.CylinderGeometry(0.58, 0.58, 0.35, 32);

  const material = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.6,
    roughness: 0.35,
  });

  const wheel = new THREE.Mesh(geometry, material);

  wheel.rotation.x = Math.PI / 2;

  wheel.position.set(x, 0.7, z);

  wheel.castShadow = true;

  car.add(wheel);

  /* RIM */

  const rimGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.37, 24);

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 1,
    roughness: 0.2,
  });

  const rim = new THREE.Mesh(rimGeometry, rimMaterial);

  rim.rotation.x = Math.PI / 2;

  rim.position.set(x, 0.7, z);

  car.add(rim);
}

createWheel(1.5, 1);
createWheel(1.5, -1);

createWheel(-1.5, 1);
createWheel(-1.5, -1);

/* =========================
   HEADLIGHTS
========================= */

function createLight(x, z) {
  const geometry = new THREE.BoxGeometry(0.5, 0.08, 0.35);

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  const light = new THREE.Mesh(geometry, material);

  light.position.set(x, 1.55, z);

  car.add(light);
}

createLight(2.42, 0.65);
createLight(2.42, -0.65);

/* =========================
   NEON UNDERLIGHT
========================= */

const neonGeometry = new THREE.BoxGeometry(3.8, 0.03, 1.5);

const neonMaterial = new THREE.MeshBasicMaterial({
  color: 0x0055ff,
});

const neon = new THREE.Mesh(neonGeometry, neonMaterial);

neon.position.y = 0.55;

car.add(neon);

/* =========================
   GROUND
========================= */

const groundGeometry = new THREE.PlaneGeometry(100, 100);

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x020202,
  roughness: 0.35,
  metalness: 0.7,
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);

ground.rotation.x = -Math.PI / 2;

ground.position.y = 0;

ground.receiveShadow = true;

scene.add(ground);

/* =========================
   GRID
========================= */

const grid = new THREE.GridHelper(80, 80, 0x222222, 0x111111);

grid.position.y = 0.02;

scene.add(grid);

/* =========================
   MOUSE
========================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", function (event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;

  mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

/* =========================
   SCROLL
========================= */

let scrollY = 0;

window.addEventListener("scroll", function () {
  scrollY = window.scrollY;
});

/* =========================
   ANIMATION
========================= */

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const time = clock.getElapsedTime();

  /* CAR ROTATION */

  car.rotation.y += 0.002;

  car.rotation.y += (mouseX * 0.35 - car.rotation.y) * 0.003;

  /* FLOATING */

  car.position.y = Math.sin(time * 1.5) * 0.04;

  /* CAMERA PARALLAX */

  camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.025;

  camera.position.y += (2.5 - mouseY * 0.6 - camera.position.y) * 0.025;

  /* SCROLL CAMERA */

  const section = scrollY / window.innerHeight;

  camera.position.z = 9 + section * 3;

  camera.lookAt(0, 1.1, 0);

  renderer.render(scene, camera);
}

animate();

/* =========================
   RESIZE
========================= */

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (event) {
  cursor.style.left = event.clientX + "px";

  cursor.style.top = event.clientY + "px";
});
