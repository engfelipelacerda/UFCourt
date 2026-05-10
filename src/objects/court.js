import * as THREE from 'three';

export function createCourt() {

    const courtGroup = new THREE.Group();

    /*
     * PISO
     */

    const floorGeometry = new THREE.PlaneGeometry(40, 20);

    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x1f8f5f,
        side: THREE.DoubleSide
    });

    const floor = new THREE.Mesh(
        floorGeometry,
        floorMaterial
    );

    floor.rotation.x = -Math.PI / 2;

    courtGroup.add(floor);

    /*
     * LINHAS
     */

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    // Função auxiliar
    function createLine(pointsArray) {

        const points = pointsArray.map(
            p => new THREE.Vector3(p[0], 0.01, p[1])
        );

        const geometry = new THREE.BufferGeometry()
            .setFromPoints(points);

        const line = new THREE.Line(
            geometry,
            lineMaterial
        );

        courtGroup.add(line);
    }

    /*
     * BORDA EXTERNA
     */

    createLine([
        [-20, -10],
        [20, -10],
        [20, 10],
        [-20, 10],
        [-20, -10]
    ]);

    /*
     * LINHA CENTRAL
     */

    createLine([
        [0, -10],
        [0, 10]
    ]);

    /*
     * CÍRCULO CENTRAL
     */

    const circlePoints = [];

    const radius = 3;

    for (let i = 0; i <= 64; i++) {

        const angle = (i / 64) * Math.PI * 2;

        circlePoints.push(
            new THREE.Vector3(
                Math.cos(angle) * radius,
                0.01,
                Math.sin(angle) * radius
            )
        );
    }

    const circleGeometry = new THREE.BufferGeometry()
        .setFromPoints(circlePoints);

    const circle = new THREE.Line(
        circleGeometry,
        lineMaterial
    );

    courtGroup.add(circle);

    courtGroup.position.y = 0.02;

    return courtGroup;
}