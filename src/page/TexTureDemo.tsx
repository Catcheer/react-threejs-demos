
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useBasic from '../hooks/useBasic';
import createDirectionLight from './lights/createDirectionLight'
import ambientLight from './lights/AmbientLight'
import PlaneLand from './land/PlaneLand'

function TexTureDemo() {

    const { scene, camera, renderer } = useBasic();

    useLayoutEffect(() => {
        if (!renderer || !scene || !camera) {
            return
        }


        // const loader = new THREE.CubeTextureLoader().setPath( '/cubeMaps/' )
        // const uvTestBw =  loader.load([
        //     'posx.jpg',
        //     'negx.jpg',
        //     'posy.jpg',
        //     'negy.jpg',
        //     'posz.jpg',
        //     'negz.jpg'
        // ])

        const loader = new THREE.TextureLoader()
        const uvTestBw = loader.load('uv-test-bw.png')
        console.log(uvTestBw)
        uvTestBw.wrapS = THREE.RepeatWrapping
        uvTestBw.wrapT = THREE.RepeatWrapping
        uvTestBw.repeat.set(4, 4);
        uvTestBw.offset.set(0.5, 0)
        const geometry = new THREE.BoxGeometry(10, 10, 10)
        const material = new THREE.MeshLambertMaterial({
            map: uvTestBw,
            // alphaMap: uvTestBw,

            // roughness: 0.1,
            // metalness:0.8
        })
        const mesh = new THREE.Mesh(geometry, material)
        // material.transparent  = true
        mesh.castShadow = true
        scene.add(mesh)

        scene.add(ambientLight)
        scene.add(createDirectionLight())
        // PlaneLand.receiveShadow = true
        scene.add(PlaneLand)


        // const light = new THREE.HemisphereLight(0xff0000, 0x00ff00, 1);
        // scene.add(light);
        renderer.shadowMap.enabled = true;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;

        function loop() {

            renderer.render(scene, camera)
            controls.update()
            requestAnimationFrame(loop)
        }
        loop()


    }, [scene])

    return <canvas id="canvas" style={{ 'display': 'block' }}>

    </canvas>
}


export default TexTureDemo;