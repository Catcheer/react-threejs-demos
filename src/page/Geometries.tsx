import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useBasic from '../hooks/useBasic';
import ambientLight from './lights/AmbientLight'
import createDirectionLight from './lights/createDirectionLight'
function Geometries() {

    
    const { scene, camera, renderer } = useBasic();


    useLayoutEffect(()=>{
        if (!renderer || !scene || !camera) {
            return
        }

      
        const group = new THREE.Group();

        const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 6, 12);
        const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 'firebrick',});
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
       
        cylinder.rotateX(Math.PI / 2);
        cylinder.position.y=2
        group.add(cylinder);

        const cubeGemo = new THREE.BoxGeometry(4, 5, 4);
        const cubeMaterial = new THREE.MeshStandardMaterial({ color: 'firebrick',flatShading : true });
       
        const cube = new THREE.Mesh(cubeGemo, cubeMaterial);
        cube.position.z= -5;
        cube.position.y = 2.5
        group.add(cube);


      const  bigheelsGeometry = new THREE.CylinderGeometry(1.8, 1.8, 5.5, 16);
        const bigheelsMaterial = new THREE.MeshStandardMaterial({ color: 'darkslategray',flatShading : true});
        const bigheels = new THREE.Mesh(bigheelsGeometry, bigheelsMaterial);
        bigheels.position.y = 1
        bigheels.position.z = -5
        bigheels.rotateZ(Math.PI / 2)
        group.add(bigheels)


      const sHeelsGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 16);
      const sheels = new THREE.Mesh(sHeelsGeometry, bigheelsMaterial);
    //   sheels.position.y = 1.5
      sheels.rotateZ(Math.PI / 2)
      group.add(sheels)

      const s2 = sheels.clone()
      const s3 = sheels.clone()
      s2.position.z = -2
      s3.position.z = 2
      group.add(s2,s3)

      const yang = new THREE.ConeGeometry(0.5, 2.0, 8, 8);
      const yanMesh = new THREE.Mesh(yang, bigheelsMaterial);
      yanMesh.rotateX(Math.PI )
      yanMesh.position.y =3.7
      yanMesh.position.z =1.5
      group.add(yanMesh)

        // group.scale.set(2,2,2)
        scene.add(group)

        ambientLight.intensity=0.5
        scene.add(ambientLight)
        const directionalLight = createDirectionLight()
        directionalLight.position.x = -20
        scene.add(directionalLight)
        camera.position.set(10, 10, 10);


        const grideHelper = new THREE.GridHelper(100, 10);
        scene.add(grideHelper);
        const controls = new OrbitControls(camera, renderer.domElement);
        const axesHelper = new THREE.AxesHelper(20);
        scene.add(axesHelper);

        controls.enableDamping = true;
        function loop() {
            group.position.z+=0.01
            if (group.position.z > 10) {
                group.position.z = -10
            }

            bigheels.rotation.x += 0.01
            sheels.rotation.x += 0.02
            s2.rotation.x += 0.02
            s3.rotation.x += 0.02
            controls.update();
            renderer.render(scene, camera);
            controls.update();
            requestAnimationFrame(loop);
        }
        loop()

    },[scene])

    return <canvas id="canvas" style={{ 'display': 'block' }}>

    </canvas>
}

export default Geometries