

import React, { useLayoutEffect,useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import useBasic from '../hooks/useBasic';

function LightDemoBasic() {
    const { scene, camera, renderer } = useBasic();

   

    useLayoutEffect(() => {
        if(!renderer || !scene || !camera ){
            return 
        }
        function land(){
            const plane = new THREE.PlaneGeometry(1000, 1000);
            const material1 = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
            const planeMesh = new THREE.Mesh(plane, material1);
            planeMesh.rotateX(-Math.PI / 2)
            planeMesh.position.y = -5;
            scene.add(planeMesh)
        }



  
        function cube(){
            const texture =   new THREE.TextureLoader().load('southeast.jpg');

            console.log(texture)
   
            const geometry = new THREE.BoxGeometry(10, 10, 10);
            const material = new THREE.MeshLambertMaterial({ 
               //  color: 0x00ff00,
                map: texture 
            });
            const cube = new THREE.Mesh(geometry, material);
            console.log(cube)
            scene.add(cube);
        }

        function pointLight(){
            
            const pointLight = new THREE.PointLight(0xffffff, 1.0);
            pointLight.intensity = 100.0;//光照强度
            pointLight.position.set(12, 12, 15);
            const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
            scene.add(pointLight);
            scene.add(pointLightHelper);
        }

        function ambientLight(){
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
            scene.add(ambientLight);
        }

        function directionalLight(){
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            directionalLight.position.set(-10, 12, -15);
            const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2);
            scene.add(directionalLight);
            scene.add(directionalLightHelper);
        }
        
        function spotLight(){
            const spotLight = new THREE.SpotLight(0xff0000, 1.0);
            spotLight.position.set(0, 20, 0);
            spotLight.target.position.set(0, 0, 0);
            spotLight.angle = Math.PI / 6;
            spotLight.distance = 20;
            spotLight.intensity =1000;
            const spotLightHelper = new THREE.SpotLightHelper(spotLight);
            scene.add(spotLight);
            scene.add(spotLightHelper);
        }

        land()
        cube()
        pointLight()
        ambientLight()
        directionalLight()
        spotLight()
         camera.position.set(20, 20, 20);
         camera.lookAt(new THREE.Vector3(0, 0, 0));
         renderer.render(scene, camera);
        
     

         const controls = new OrbitControls( camera, renderer.domElement );
       
         function loop(){
            renderer.render(scene, camera);
             requestAnimationFrame(loop);
         }
         loop()
       

    }, [scene, camera, renderer])

    return <canvas id="canvas" style={{'display':'block'}}>

    </canvas>
}

export default LightDemoBasic;