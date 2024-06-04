import * as THREE from 'three';

function createDirectionLight(){
    const directionalLight = new THREE.DirectionalLight('#ffffff',2);
  
  directionalLight.position.set(0,20,-20);
  directionalLight.castShadow = true;

  const directionLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
  directionalLight.add(directionLightHelper);
  return directionalLight;
}

export  default createDirectionLight