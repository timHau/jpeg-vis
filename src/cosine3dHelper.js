import * as THREE from 'three';

function setup(canvas) {
    const { width, height } = canvas;
    const camera = new THREE.PerspectiveCamera(45, width/height, 0.001, 1000);
    camera.position.z = 60;
    camera.position.y = 30;
    camera.lookAt(new THREE.Vector3(0,0,0));
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
    return [ camera, scene, renderer ];
}

export function drawCosine3d(canvas, n, m) {
    const [ camera, scene, renderer ] = setup(canvas);

    const size = 5;
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const x = -18 + i*5;
            const y = -18 + j*5;
            const plgeo = new THREE.PlaneBufferGeometry(size, size, 20, 20);
            const pmat = new THREE.MeshBasicMaterial({ 
                side: THREE.DoubleSide,
                color: `rgb(${Math.floor(Math.random()*255)},
                            ${Math.floor(Math.random()*255)},
                            ${Math.floor(Math.random()*255)})`
            });
            const plane = new THREE.Mesh(plgeo, pmat);
            plane.position.x = x;
            plane.position.z = y;
            plane.rotateX(Math.PI/2)
            scene.add(plane)
        }
    }

    console.log('render');
    renderer.render(scene, camera);
}