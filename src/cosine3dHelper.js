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
    renderer.setClearColor(0xeeeeee);
    const controls = new OrbitControls(camera, renderer.domElement);
    return [ camera, scene, renderer, controls ];
}

export function drawCosine3d(scene, n, m) {
    const f = (u, v) => 4*getDiscCosine(u,v)(n,m);
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
        }
    }

    const paraGeo = new THREE.ParametricBufferGeometry(
        (u, v, dest) => dest.set(
                -20.5 +  u * 40, 
                10 + f(u, v),
                -20.5 + v * 40),
        40, 40
    );
    const paraMat = new THREE.MeshBasicMaterial({ 
            color: 'rgb(0, 0, 255)', 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7,
            wireframe: true,
         });
    const para = new THREE.Mesh(paraGeo, paraMat);
    scene.add(para);
}