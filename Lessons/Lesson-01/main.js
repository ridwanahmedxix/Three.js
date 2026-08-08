console.log(THREE);

let scene = THREE.Scene();

let camera = THREE.PerspectiveCamera(
  65,
  window,
  innerWidth / window.innerHeight,
  0.1,
  100,
);

scene.add(camera);

let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: "red" });
let mesh = new THREE.Mesh(box, material);

const canvas = document.querySelector("#3d");
