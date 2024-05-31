import * as THREE from 'three';

import env from '../env.js';



import { useLayoutEffect } from 'react';
import TWEEN from '@tweenjs/tween.js';

import useBasic from '../hooks/useBasic';

function AxisTransform() {
    let { scene, camera, renderer } = useBasic()

    useLayoutEffect(() => {

        if (!renderer || !scene || !camera ) {
            return
        }
        const geometry = new THREE.BoxGeometry(10, 10, 10);

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);


        let axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
        renderer?.render(scene, camera)



        // document.querySelector('#canvas')?.appendChild(renderer?.domElement)



        document.addEventListener('click', (e) => {
            const winWidth = window.innerWidth-env.nav_width
            const winHeight = window.innerHeight
            const { clientX, clientY } = e
            // console.log(clientX, clientY)
            let posX = ((clientX-env.nav_width) / winWidth) * 2 - 1
            let posY = -(clientY / winHeight) * 2 + 1


            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(new THREE.Vector2(posX, posY), camera)
            console.log(raycaster)
            const intersects = raycaster.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                console.log(intersects[0].object)
                // intersects[0].object.position.set(10, 0, 0)
                new TWEEN.Tween(intersects[0].object.position).to({
                    x: 10,
                    y: 0,
                    z: 0
                }, 2000).onUpdate((obj) => {
                    intersects[0].object.position.set(obj.x, obj.y, obj.z)
                }).start()
                loop();
            }

        })

        window.onresize = function () {
            renderer.setSize((window.innerWidth-env.nav_width), window.innerHeight);
            camera.aspect =( window.innerWidth-env.nav_width) / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer?.render(scene, camera)
        };


        const loop = () => {
            console.log(1)
            TWEEN.update();
            renderer?.render(scene, camera);
            requestAnimationFrame(loop);

        }
    }, [scene])

    return <canvas id="canvas" style={{ 'display': 'block' }}></canvas>
}

export default AxisTransform;