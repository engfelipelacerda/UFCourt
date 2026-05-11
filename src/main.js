import "./style.css";
import { createScene } from "./scene/setupScene.js";
import { createRenderer } from "./renderer/setuprenderer.js";
import { createCamera } from "./camera/setupCamera.js";
import { createAmbientLight } from "./lights/ambientLight.js";
import { createSunLight } from "./lights/sunLight.js";
import { createGrass } from "./objects/grass.js";
import { createFloor } from "./objects/floor.js";
import { createCourt } from "./objects/court";
import { createPointerControls } from "./controls/createPointerControls.js";
import { createSky, updateSky } from "./objects/sky.js";
import { createSpotlight } from "./objects/spotLight.js";
import { createSoccerGoal } from "./objects/goal.js";
import { createBasketHoop } from "./objects/hoop.js";
import { createVolleyballNet } from "./objects/volleyNet.js";
import { createSoccerBall } from "./objects/soccerBall.js";
// ADICIONADO:
import { createBleachers } from "./objects/bleachers.js";
import { createAthleticTrack } from "./objects/track.js";

let scene,
  renderer,
  camera,
  ambientLight,
  grass,
  floor,
  pControl,
  court,
  playButton,
  sky,
  sun,
  sunLight,
  sunTime,
  gui,
  effectController,
  spotLight;

// Tempos para movimentação
let xdir = 0,
  zdir = 0,
  ydir = 0;

let tiempoI, tiempoF, vel, delta;

async function init() {
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
      case 32: // Espaço
        ydir = 1;
        break;
      case 16: // Shift
        ydir = -1;
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
      case 32:
      case 16:
        ydir = 0;
        break;
    }
  });

  // LUZ AMBIENTE
  ambientLight = createAmbientLight();
  scene.add(ambientLight);

  // SKY + GUI
  ({ sky, sun, gui, effectController } = createSky(scene, renderer));

  sunLight = createSunLight();
  scene.add(sunLight);

  sunTime = -Math.PI / 2 + 3;

  updateSky(sky, sun, sunLight, sunTime);

  grass = createGrass();
  scene.add(grass);

  floor = createFloor();
  scene.add(floor);

  court = createCourt();
  scene.add(court);

  const post1 = await createSpotlight(26.7, -4.25, -14);
  post1.rotation.y = Math.PI + Math.PI / 6;
  scene.add(post1);

  const post2 = await createSpotlight(-26.7, -4.25, -14);
  post2.rotation.y = -Math.PI / 6;
  scene.add(post2);

  const post3 = await createSpotlight(26.7, -4.25, 14);
  post3.rotation.y = Math.PI - Math.PI / 6;
  scene.add(post3);

  const post4 = await createSpotlight(-26.7, -4.25, 14);
  post4.rotation.y = Math.PI / 6;
  scene.add(post4);

  const goal_l = await createSoccerGoal({
    position: [-21, 1, 0],
    rotation: [0, Math.PI / 2, 0],
  });
  scene.add(goal_l);

  const goal_r = await createSoccerGoal({
    position: [21, 1, 0],
    rotation: [0, -Math.PI / 2, 0],
  });
  scene.add(goal_r);

  const hoop_l = await createBasketHoop({
    position: [22, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
  });
  scene.add(hoop_l);

  const hoop_r = await createBasketHoop({
    position: [-22, 0, 0],
    rotation: [0, Math.PI / 2, 0],
  });
  scene.add(hoop_r);

  const volleyNet = await createVolleyballNet({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  });
  scene.add(volleyNet);

  const soccerball1 = await createSoccerBall(5, 0.185, 9);
  scene.add(soccerball1);

  // --- ADIÇÃO DAS ARQUIBANCADAS GIGANTES E PRÓXIMAS ---

  // Lado Esquerdo (Branca)
  const bleachersLeft = createBleachers(0xffffff);
  // O valor -22 deixa ela bem próxima da linha lateral
  bleachersLeft.position.set(0, 0, -28);
  scene.add(bleachersLeft);

  // Lado Direito (Branca)
  const bleachersRight = createBleachers(0xffffff);
  // O valor 22 deixa ela próxima do outro lado
  bleachersRight.position.set(0, 0, 28);
  bleachersRight.rotation.y = Math.PI; // Vira de frente para a quadra
  scene.add(bleachersRight);

  // --------------------------------------------------

  // Dentro do init():
  const track = createAthleticTrack();
  scene.add(track);

  tiempoI = Date.now();
  vel = 10;

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  tiempoF = Date.now();
  delta = (tiempoF - tiempoI) / 1000;
  tiempoI = tiempoF;

  // Movimento do jogador
  if (pControl.isLocked === true) {
    let xDis = xdir * vel * delta;
    let yDis = ydir * vel * delta;
    let zDis = zdir * vel * delta;

    pControl.moveRight(xDis);
    pControl.moveForward(zDis);
    camera.position.y += yDis;
  }

  // Movimento do sol
  sunTime += delta * 0.05;

  if (sunTime > Math.PI * 2) {
    sunTime = 0;
  }

  updateSky(sky, sun, sunLight, sunTime);
  renderer.render(scene, camera);
}
init();

