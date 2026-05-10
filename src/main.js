import "./style.css";
import { createScene } from "./scene/setupScene.js";
import { createRenderer } from "./renderer/setuprenderer.js";
import { createCamera } from "./camera/setupCamera.js";
import { createAmbientLight } from "./lights/ambientLight.js";
import { createSunLight } from "./lights/sunLight.js";
import { createFloor } from "./objects/floor.js";
import { createCourt } from "./objects/court";
import { createPointerControls } from "./controls/createPointerControls.js";

let scene, renderer, camera, ambientLight, sunLight, floor, pControl, court;

function init() {
  scene = createScene();
  renderer = createRenderer();
  camera = createCamera();

  pControl = createPointerControls(camera, renderer.domElement);
  const playButton = document.getElementById("btnPlay");

  playButton.addEventListener("click", () => {
    pControl.lock();
  });

  ambientLight = createAmbientLight();
  sunLight = createSunLight();

  floor = createFloor();
  scene.add(floor);

  const court = createCourt();
  scene.add(court);

  scene.add(ambientLight);
  scene.add(sunLight);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
