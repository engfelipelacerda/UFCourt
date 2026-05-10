import "./style.css";
import { createScene } from "./scene/setupScene.js";
import { createRenderer } from "./renderer/setuprenderer.js";
import { createCamera } from "./camera/setupCamera.js";
import { createAmbientLight } from "./lights/ambientLight.js";
import { createSunLight } from "./lights/sunLight.js";
import { createFloor } from "./objects/floor.js";
import { createCourt } from "./objects/court";
import { createPointerControls } from "./controls/createPointerControls.js";

let scene,
  renderer,
  camera,
  ambientLight,
  sunLight,
  floor,
  pControl,
  court,
  playButton;

let xdir = 0,
  zdir = 0;
let tiempoI, tiempoF, vel, delta;

function init() {
  scene = createScene();
  renderer = createRenderer();
  camera = createCamera();

  pControl = createPointerControls(camera, renderer.domElement);
  playButton = document.getElementById("btnPlay");
  playButton.addEventListener("click", () => {
    pControl.lock();
  });

  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 65: // A
        xdir = -1;
        break;
      case 87: // W
        zdir = 1;
        break;
      case 68: // D
        xdir = 1;
        break;
      case 83: // S
        zdir = -1;
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 65:
      case 68:
        xdir = 0;
        break;

      case 87:
      case 83:
        zdir = 0;
        break;
    }
  });

  ambientLight = createAmbientLight();
  sunLight = createSunLight();

  floor = createFloor();
  scene.add(floor);

  court = createCourt();
  scene.add(court);

  scene.add(ambientLight);
  scene.add(sunLight);

  tiempoI = Date.now();
  vel = 10;

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  if (pControl.isLocked === true) {
    tiempoF = Date.now();

    delta = (tiempoF - tiempoI) / 1000;

    let xDis = xdir * vel * delta;
    let zDis = zdir * vel * delta;

    pControl.moveRight(xDis);
    pControl.moveForward(zDis);

    tiempoI = tiempoF;
  }

  renderer.render(scene, camera);
}

init();
