

import * as THREE from 'three';
const directionalLight = new THREE.DirectionalLight('#ffffff',2);
  
  directionalLight.position.set(0,20,-20);
  directionalLight.castShadow = true;


export default directionalLight