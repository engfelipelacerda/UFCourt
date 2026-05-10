import * as THREE from "three";

export function createCourt() {

  const courtGroup = new THREE.Group();

  /*
   * =========================================
   * DIMENSÕES
   * =========================================
   */

  const COURT_WIDTH = 40;
  const COURT_HEIGHT = 20;

  const OUTSIDE_BORDER = 1.5;

  /*
   * =========================================
   * CORES
   * =========================================
   */

  const COURT_BLUE = 0x0d47c2;
  const COURT_BLUE_DARK = 0x082e7a;

  const LINE_WHITE = 0xffffff;
  const UFC_YELLOW = 0xffc72c;

/*
 * =========================================
 * BASE EXTERNA
 * =========================================
 */

const outerGeometry = new THREE.PlaneGeometry(
  COURT_WIDTH + OUTSIDE_BORDER,
  COURT_HEIGHT + OUTSIDE_BORDER
);

const outerMaterial = new THREE.MeshStandardMaterial({
  color: COURT_BLUE_DARK,
  roughness: 0.6,
  metalness: 0.05,
  side: THREE.DoubleSide,
});

const outerFloor = new THREE.Mesh(
  outerGeometry,
  outerMaterial
);

outerFloor.rotation.x = -Math.PI / 2;

outerFloor.position.y = -0.01;

courtGroup.add(outerFloor);

/*
 * =========================================
 * PISO PRINCIPAL
 * =========================================
 */

const floorGeometry = new THREE.PlaneGeometry(
  COURT_WIDTH,
  COURT_HEIGHT
);

const floorMaterial = new THREE.MeshStandardMaterial({
  color: COURT_BLUE,
  roughness: 0.22,
  metalness: 0.10,
  side: THREE.DoubleSide,
});

const floor = new THREE.Mesh(
  floorGeometry,
  floorMaterial
);

floor.rotation.x = -Math.PI / 2;

floor.receiveShadow = true;

courtGroup.add(floor);

  /*
   * =========================================
   * FUNÇÃO LINHAS
   * =========================================
   */

  function createLine(
    width,
    height,
    x,
    z,
    color
  ) {

    const geometry = new THREE.PlaneGeometry(
      width,
      height
    );

    const material = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
    });

    const line = new THREE.Mesh(
      geometry,
      material
    );

    line.rotation.x = -Math.PI / 2;

    line.position.set(x, 0.02, z);

    courtGroup.add(line);

    return line;
  }

  /*
   * =========================================
   * FUNÇÃO ARCOS
   * =========================================
   */

  function createArc(
    radius,
    startAngle,
    endAngle,
    x,
    z,
    color
  ) {

    const curve = new THREE.ArcCurve(
      0,
      0,
      radius,
      startAngle,
      endAngle,
      false
    );

    const points = curve.getPoints(80);

    const geometry =
      new THREE.BufferGeometry().setFromPoints(
        points.map(
          (p) =>
            new THREE.Vector3(
              p.x,
              0.03,
              p.y
            )
        )
      );

    const material =
      new THREE.LineBasicMaterial({
        color,
      });

    const arc = new THREE.Line(
      geometry,
      material
    );

    arc.position.set(x, 0, z);

    courtGroup.add(arc);

    return arc;
  }

  /*
   * =========================================
   * FUNÇÃO ARCOS TRACEJADOS
   * =========================================
   */

  function createDashedArc(
    radius,
    startAngle,
    endAngle,
    x,
    z,
    color
  ) {

    const dashCount = 16;

    const totalAngle =
      endAngle - startAngle;

    const dashAngle =
      totalAngle / (dashCount * 2);

    for (let i = 0; i < dashCount; i++) {

      const dashStart =
        startAngle + i * dashAngle * 2;

      const dashEnd =
        dashStart + dashAngle;

      const curve = new THREE.ArcCurve(
        0,
        0,
        radius,
        dashStart,
        dashEnd,
        false
      );

      const points = curve.getPoints(8);

      const geometry =
        new THREE.BufferGeometry().setFromPoints(
          points.map(
            (p) =>
              new THREE.Vector3(
                p.x,
                0.03,
                p.y
              )
          )
        );

      const material =
        new THREE.LineBasicMaterial({
          color,
        });

      const arc = new THREE.Line(
        geometry,
        material
      );

      arc.position.set(x, 0, z);

      courtGroup.add(arc);
    }
  }

  /*
   * =========================================
   * FUNÇÃO ÁREA PREENCHIDA
   * =========================================
   */

  function createGoalAreaFill(
    x,
    rotationZ = 0
  ) {

    const geometry =
      new THREE.CircleGeometry(
        6,
        64,
        -Math.PI / 2,
        Math.PI
      );

    const material =
      new THREE.MeshStandardMaterial({
        color: COURT_BLUE_DARK,
        side: THREE.DoubleSide,
      });

    const area = new THREE.Mesh(
      geometry,
      material
    );

    area.rotation.x = -Math.PI / 2;
    area.rotation.z = rotationZ;

    area.position.set(x, 0.01, 0);

    courtGroup.add(area);
  }

  /*
   * =========================================
   * ÁREAS DOS GOLEIROS
   * =========================================
   */

  createGoalAreaFill(-20);

  createGoalAreaFill(
    20,
    Math.PI
  );

  /*
   * =========================================
   * ESPESSURA PADRÃO
   * =========================================
   */

  const thickness = 0.12;

  /*
   * =========================================
   * BORDA EXTERNA
   * =========================================
   */

  createLine(
    COURT_WIDTH,
    thickness,
    0,
    -10,
    LINE_WHITE
  );

  createLine(
    COURT_WIDTH,
    thickness,
    0,
    10,
    LINE_WHITE
  );

  createLine(
    thickness,
    COURT_HEIGHT,
    -20,
    0,
    LINE_WHITE
  );

  createLine(
    thickness,
    COURT_HEIGHT,
    20,
    0,
    LINE_WHITE
  );

  /*
   * =========================================
   * LINHA CENTRAL
   * =========================================
   */

  createLine(
    thickness,
    COURT_HEIGHT,
    0,
    0,
    LINE_WHITE
  );

 /*
 * =========================================
 * ÁREA DOS BANCOS (TRACEJADA)
 * =========================================
 */

function createBenchMark(x, z) {

  const segmentHeight = 0.22;
  const gap = 0.18;

  for (let i = 0; i < 4; i++) {

    createLine(
      thickness,
      segmentHeight,
      x,
      z + (i * (segmentHeight + gap)),
      LINE_WHITE
    );
  }
}

// superior esquerda
createBenchMark(-8, -11.5);

// superior direita
createBenchMark(8, -11.5);

// inferior esquerda
createBenchMark(-8, 10.25);

// inferior direita
createBenchMark(8, 10.25);


  /*
   * =========================================
   * CÍRCULO CENTRAL
   * =========================================
   */

  const centerBgGeometry =
    new THREE.CircleGeometry(
      3.1,
      64
    );

  const centerBgMaterial =
    new THREE.MeshStandardMaterial({
      color: COURT_BLUE_DARK,
      side: THREE.DoubleSide,
    });

  const centerBg = new THREE.Mesh(
    centerBgGeometry,
    centerBgMaterial
  );

  centerBg.rotation.x = -Math.PI / 2;

  centerBg.position.y = 0.01;

  courtGroup.add(centerBg);

  createArc(
    3,
    0,
    Math.PI * 2,
    0,
    0,
    LINE_WHITE
  );

  /*
   * =========================================
   * ÁREAS DOS GOLEIROS
   * =========================================
   */

  createArc(
    6,
    -Math.PI / 2,
    Math.PI / 2,
    -20,
    0,
    UFC_YELLOW
  );

  createArc(
    6,
    Math.PI / 2,
    (Math.PI * 3) / 2,
    20,
    0,
    UFC_YELLOW
  );

  /*
   * =========================================
   * LINHAS TRACEJADAS 9m
   * =========================================
   */

  createDashedArc(
    9,
    -Math.PI / 2,
    Math.PI / 2,
    -20,
    0,
    LINE_WHITE
  );

  createDashedArc(
    9,
    Math.PI / 2,
    (Math.PI * 3) / 2,
    20,
    0,
    LINE_WHITE
  );

  /*
   * =========================================
   * MARCAS DOS 7m
   * =========================================
   */

  createLine(
    0.18,
    0.6,
    -12.5,
    0,
    LINE_WHITE
  );

  createLine(
    0.18,
    0.6,
    12.5,
    0,
    LINE_WHITE
  );

  /*
   * =========================================
   * PÊNALTIS FUTSAL
   * =========================================
   */

  function createPenaltyMark(x) {

    const geometry =
      new THREE.CircleGeometry(
        0.15,
        32
      );

    const material =
      new THREE.MeshBasicMaterial({
        color: LINE_WHITE,
      });

    const mark = new THREE.Mesh(
      geometry,
      material
    );

    mark.rotation.x = -Math.PI / 2;

    mark.position.set(
      x,
      0.03,
      0
    );

    courtGroup.add(mark);
  }

  createPenaltyMark(-14);

  createPenaltyMark(14);

  /*
   * =========================================
   * MARCA CENTRAL
   * =========================================
   */

  createPenaltyMark(0);

  /*
   * =========================================
   * POSIÇÃO FINAL
   * =========================================
   */

  courtGroup.position.y = 0.02;

  return courtGroup;
}