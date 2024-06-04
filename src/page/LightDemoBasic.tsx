

import React, { useLayoutEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import useBasic from '../hooks/useBasic';
import ambientLight from './lights/AmbientLight'
import PlaneLand from './land/PlaneLand'

function LightDemoBasic() {
    const { scene, camera, renderer } = useBasic();



    useLayoutEffect(() => {
        if (!renderer || !scene || !camera) {
            return
        }





        function cube() {
            const texture = new THREE.TextureLoader().load('southeast.jpg');

            console.log(texture)

            const geometry = new THREE.BoxGeometry(10, 10, 10);
            const material = new THREE.MeshStandardMaterial({
                //  color: 0x00ff00,
                map: texture,
                roughness: 0.1,
                metalness:0.8
                
            });
            const cube = new THREE.Mesh(geometry, material);
            // console.log(cube)
            cube.castShadow = true;
            scene.add(cube);
        }

        function pointLight() {

            const pointLight = new THREE.PointLight(0xffffff, 1.0);
            pointLight.intensity = 400.0;//光照强度
            pointLight.position.set(12, 12, 15);
            const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
            scene.add(pointLight);
            scene.add(pointLightHelper);
        }

       

        function directionalLight() {
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            directionalLight.position.set(-10, 12, -15);
            const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2);
            directionalLight.castShadow = true;
            // const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
            // scene.add(cameraHelper);
            // directionalLight.shadow.mapSize = new THREE.Vector2(2048,2048);
            // console.log('阴影默认像素',directionalLight.shadow.mapSize);
            // directionalLight.shadow.radius = 3000;
            scene.add(directionalLight);
            scene.add(directionalLightHelper);
        }

        function spotLight() {
            const spotLight = new THREE.SpotLight(0xff0000, 1.0);
            spotLight.position.set(0, 20, 0);
            spotLight.target.position.set(0, 0, 0);
            spotLight.angle = Math.PI / 6;
            spotLight.distance = 20;
            spotLight.intensity = 1000;
            const spotLightHelper = new THREE.SpotLightHelper(spotLight);
            scene.add(spotLight);
            scene.add(spotLightHelper);
        }

    
        cube()
        pointLight()
        
        directionalLight()
        spotLight()
        scene.add(ambientLight)
        scene.add(PlaneLand)
        camera.position.set(20, 20, 20);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        renderer.physicallCorrectLights = true;
        renderer.shadowMap.enabled = true;
        renderer.render(scene, camera);



        const controls = new OrbitControls(camera, renderer.domElement);
        
        function loop() {
           
          
            renderer.render(scene, camera);
            requestAnimationFrame(loop);
        }
        loop()


    }, [scene, camera, renderer])

    return <canvas id="canvas" style={{ 'display': 'block' }}>

    </canvas>
}

export default LightDemoBasic;