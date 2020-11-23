import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
    getDiscCosine,
    cosValueToRgb,
} from './discreteCosineHelper.js';

export function setupCosine3d(canvas) {
    const { width, height } = canvas;
    const camera = new THREE.PerspectiveCamera(45, width/height, 0.001, 1000);
    camera.position.z = 60;
    camera.position.y = 30;
    camera.lookAt(new THREE.Vector3(0,0,0));
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
    const controls = new OrbitControls(camera, renderer.domElement);
    return [ camera, scene, renderer, controls ];
}

export function drawCosine3d(scene, n, m) {
    const size = 5;
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const x = -18 + i*5;
            const y = -18 + j*5;
            const discCosine = getDiscCosine(i/8, j/8);
            const val = discCosine(n, m);

            const pgeo = new THREE.PlaneBufferGeometry(size, size, 20, 20);
            const pmat = new THREE.MeshBasicMaterial({ 
                side: THREE.DoubleSide,
                color: cosValueToRgb(val),
            });
            const plane = new THREE.Mesh(pgeo, pmat);
            plane.position.x = x;
            plane.position.z = y;
            plane.rotateX(Math.PI/2);
            scene.add(plane);

            const cgeo = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
            const cmat = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)' });
            const cube = new THREE.Mesh(cgeo, cmat);
            cube.position.x = x ;
            cube.position.z = y;
            scene.add(cube);
        }
    }

    const paraGeo = new THREE.ParametricBufferGeometry(
        (u, v, dest) => dest.set(
                -20.5 +  u * 40, 
                8 + 2*getDiscCosine(u,v)(n,m), 
                -20.5 + v * 40),
        100, 100
    );
    const paraMat = new THREE.MeshBasicMaterial({ 
            color: 'rgb(0, 0, 255)', 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.6,
         });
    const para = new THREE.Mesh(paraGeo, paraMat);
    scene.add(para);
}