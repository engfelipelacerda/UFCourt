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

  const OUTSIDE_BORDER_X = 8;
  const OUTSIDE_BORDER_Z = 6;

  /*
   * =========================================
   * CORES
   * =========================================
   */

  const LINE_FUTSAL = 0xffffff;
  const LINE_VOLLEY = 0xffc72c;

  const COURT_BLUE = 0x0d47c2;
  const COURT_BLUE_DARK = 0x082e7a;

  const LINE_WHITE = 0xffffff;

  /*
   * =========================================
   * ESPESSURA PADRÃO
   * =========================================
   */

  const thickness = 0.06;
  const sportThickness = 0.075;

  /*
   * =========================================
   * BASE EXTERNA
   * =========================================
   */

  const outerGeometry = new THREE.PlaneGeometry(
    COURT_WIDTH + OUTSIDE_BORDER_X,
    COURT_HEIGHT + OUTSIDE_BORDER_Z,
  );

  const outerMaterial = new THREE.MeshStandardMaterial({
    color: COURT_BLUE_DARK,
    roughness: 0.72,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });

  const outerFloor = new THREE.Mesh(outerGeometry, outerMaterial);

  outerFloor.rotation.x = -Math.PI / 2;
  outerFloor.position.y = -0.01;
  outerFloor.receiveShadow = true;

  courtGroup.add(outerFloor);

  /*
   * =========================================
   * PISO PRINCIPAL
   * =========================================
   */

  const floorGeometry = new THREE.PlaneGeometry(COURT_WIDTH, COURT_HEIGHT);

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: COURT_BLUE,
    roughness: 0.35,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);

  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  courtGroup.add(floor);

  /*
   * =========================================
   * FUNÇÃO LINHAS
   * =========================================
   */

  function createLine(width, height, x, z, color) {
    const geometry = new THREE.PlaneGeometry(width, height);

    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
    });

    const line = new THREE.Mesh(geometry, material);

    line.rotation.x = -Math.PI / 2;

    // ajuste para evitar gaps nos cantos
    line.position.set(
      Math.round(x * 1000) / 1000,
      0.02,
      Math.round(z * 1000) / 1000,
    );

    // leve expansão para garantir sobreposição
    line.scale.set(1.001, 1.001, 1);
    line.receiveShadow = true;

    courtGroup.add(line);

    return line;
  }

  /*
   * =========================================
   * FUNÇÃO ARCOS
   * =========================================
   */

  function createArc(radius, startAngle, endAngle, x, z, color, lineWidth = 2) {
    const curve = new THREE.ArcCurve(0, 0, radius, startAngle, endAngle, false);

    const points = curve.getPoints(120);

    const geometry = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, 0.03, p.y)),
    );

    const material = new THREE.MeshStandardMaterial({
      color,
      linewidth: lineWidth,
    });

    const arc = new THREE.Line(geometry, material);

    arc.position.set(x, 0, z);
    arc.receiveShadow = true;

    courtGroup.add(arc);

    return arc;
  }

  /*
   * =========================================
   * FUNÇÃO ARCOS TRACEJADOS
   * =========================================
   */

  function createDashedArc(radius, startAngle, endAngle, x, z, color) {
    const dashCount = 20;

    const totalAngle = endAngle - startAngle;

    const dashAngle = totalAngle / (dashCount * 2);

    for (let i = 0; i < dashCount; i++) {
      const dashStart = startAngle + i * dashAngle * 2;

      const dashEnd = dashStart + dashAngle;

      const curve = new THREE.ArcCurve(0, 0, radius, dashStart, dashEnd, false);

      const points = curve.getPoints(8);

      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0.03, p.y)),
      );

      const material = new THREE.MeshStandardMaterial({
        color,
      });

      const arc = new THREE.Line(geometry, material);

      arc.position.set(x, 0, z);
      arc.receiveShadow = true;

      courtGroup.add(arc);
    }
  }

  /*
   * =========================================
   * FUNÇÃO ÁREA PREENCHIDA
   * =========================================
   */

  function createGoalAreaFill(x, rotationZ = 0) {
    const geometry = new THREE.CircleGeometry(6, 64, -Math.PI / 2, Math.PI);

    const material = new THREE.MeshStandardMaterial({
      color: COURT_BLUE_DARK,
      side: THREE.DoubleSide,
    });

    const area = new THREE.Mesh(geometry, material);

    area.rotation.x = -Math.PI / 2;
    area.rotation.z = rotationZ;

    area.position.set(x, 0.01, 0);
    area.receiveShadow = true;

    courtGroup.add(area);
  }

  /*
   * =========================================
   * ÁREAS DOS GOLEIROS
   * =========================================
   */

  createGoalAreaFill(-20);

  createGoalAreaFill(20, Math.PI);

  /*
   * =========================================
   * BORDA EXTERNA
   * =========================================
   */

  createLine(COURT_WIDTH, thickness, 0, -10, LINE_FUTSAL);

  createLine(COURT_WIDTH, thickness, 0, 10, LINE_FUTSAL);

  createLine(thickness, COURT_HEIGHT, -20, 0, LINE_FUTSAL);

  createLine(thickness, COURT_HEIGHT, 20, 0, LINE_FUTSAL);

  /*
   * =========================================
   * LINHA CENTRAL
   * =========================================
   */

  createLine(thickness, COURT_HEIGHT, 0, 0, LINE_FUTSAL);

  /*
   * =========================================
   * ZONA DE SUBSTITUIÇÃO
   * =========================================
   */

  function createBenchMark(x, z) {
    createLine(thickness, 0.75, x, z, LINE_FUTSAL);
  }

  // superior
  createBenchMark(-5, -10.4);
  createBenchMark(5, -10.4);
  createBenchMark(-10, -10.4);
  createBenchMark(10, -10.4);

  // inferior
  createBenchMark(-5, 10.4);
  createBenchMark(5, 10.4);
  createBenchMark(-10, 10.4);
  createBenchMark(10, 10.4);

  /*
   * =========================================
   * BANCOS DE RESERVAS (somente linhas)
   * =========================================
   */

  function createBenchRectangle(x, z) {
    const width = 4.5; // largura do retângulo
    const height = 1.25; // altura do retângulo

    // linha superior
    createLine(width, thickness, x, z - height / 2, LINE_VOLLEY);

    // linha inferior
    createLine(width, thickness, x, z + height / 2, LINE_VOLLEY);

    // linha esquerda
    createLine(thickness, height, x - width / 2, z, LINE_VOLLEY);

    // linha direita
    createLine(thickness, height, x + width / 2, z, LINE_VOLLEY);
  }

  // banco superior (lado esquerdo e direito)
  createBenchRectangle(-7.5, -11.75);
  createBenchRectangle(7.5, -11.75);

  // banco inferior (lado esquerdo e direito)
  createBenchRectangle(-7.5, 11.75);
  createBenchRectangle(7.5, 11.75);

  /*
   * =========================================
   * CÍRCULO CENTRAL
   * =========================================
   */

  const centerBgGeometry = new THREE.CircleGeometry(3.1, 64);

  const centerBgMaterial = new THREE.MeshStandardMaterial({
    color: COURT_BLUE_DARK,
    side: THREE.DoubleSide,
  });

  const centerBg = new THREE.Mesh(centerBgGeometry, centerBgMaterial);

  centerBg.rotation.x = -Math.PI / 2;

  centerBg.position.y = 0.01;
  centerBg.receiveShadow = true;

  courtGroup.add(centerBg);

  createArc(3, 0, Math.PI * 2, 0, 0, LINE_FUTSAL);

  /*
   * =========================================
   * ÁREAS DOS GOLEIROS (linha mais grossa)
   * =========================================
   */

  createArc(
    6,
    -Math.PI / 2,
    Math.PI / 2,
    -20,
    0,
    LINE_FUTSAL,
    3, // espessura
  );

  createArc(
    6,
    Math.PI / 2,
    (Math.PI * 3) / 2,
    20,
    0,
    LINE_FUTSAL,
    3, // espessura
  );

  /*
   * =========================================
   * LINHAS TRACEJADAS 9m
   * =========================================
   */

  createDashedArc(9, -Math.PI / 2, Math.PI / 2, -20, 0, LINE_FUTSAL);

  createDashedArc(9, Math.PI / 2, (Math.PI * 3) / 2, 20, 0, LINE_FUTSAL);

  /*
   * =========================================
   * MARCAS DOS 7m
   * =========================================
   */

  createLine(0.18, 0.6, -12.5, 0, LINE_FUTSAL);

  createLine(0.18, 0.6, 12.5, 0, LINE_FUTSAL);

  /*
   * =========================================
   * PÊNALTIS FUTSAL (6m)
   * =========================================
   */

  function createPenaltyMark(x) {
    const geometry = new THREE.CircleGeometry(0.12, 32);

    const material = new THREE.MeshStandardMaterial({
      color: LINE_WHITE,
    });

    const mark = new THREE.Mesh(geometry, material);

    mark.rotation.x = -Math.PI / 2;

    mark.position.set(x, 0.03, 0);
    mark.receiveShadow = true;

    courtGroup.add(mark);
  }

  createPenaltyMark(-14);
  createPenaltyMark(14);

  /*
   * =========================================
   * MARCAS DOS 10m
   * =========================================
   */

  createPenaltyMark(-10);

  createPenaltyMark(10);

  /*
   * =========================================
   * MARCA CENTRAL
   * =========================================
   */

  createPenaltyMark(0);

  /*
   * =========================================
   * ESCANTEIOS
   * =========================================
   */

  createArc(0.25, 0, Math.PI / 2, -20, -10, LINE_FUTSAL);

  createArc(0.25, Math.PI / 2, Math.PI, 20, -10, LINE_FUTSAL);

  createArc(0.25, -Math.PI / 2, 0, -20, 10, LINE_FUTSAL);

  createArc(0.25, Math.PI, Math.PI * 1.5, 20, 10, LINE_FUTSAL);

  /*
   * =========================================
   * VÔLEI
   * =========================================
   */

  const VOLLEY_WIDTH = 18;
  const VOLLEY_HEIGHT = 9;

  // bordas laterais
  createLine(VOLLEY_WIDTH, sportThickness, 0, -VOLLEY_HEIGHT / 2, LINE_VOLLEY);

  createLine(VOLLEY_WIDTH, sportThickness, 0, VOLLEY_HEIGHT / 2, LINE_VOLLEY);

  // linhas de fundo
  createLine(sportThickness, VOLLEY_HEIGHT, -VOLLEY_WIDTH / 2, 0, LINE_VOLLEY);

  createLine(sportThickness, VOLLEY_HEIGHT, VOLLEY_WIDTH / 2, 0, LINE_VOLLEY);

  // linhas de ataque (3m)
  createLine(sportThickness, VOLLEY_HEIGHT, -3, 0, LINE_VOLLEY);

  createLine(sportThickness, VOLLEY_HEIGHT, 3, 0, LINE_VOLLEY);

  /*
   * =========================================
   * POSIÇÃO FINAL
   * =========================================
   */

  courtGroup.position.y = 0.02;

  return courtGroup;
}

