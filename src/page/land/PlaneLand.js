import * as THREE from 'three';

const plane = new THREE.PlaneGeometry(1000, 1000);
const material1 = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
const planeMesh = new THREE.Mesh(plane, material1);
planeMesh.receiveShadow = true;
planeMesh.rotateX(-Math.PI / 2)
planeMesh.position.y = -5;


export default planeMesh