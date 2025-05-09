import { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import TWEEN from '@tweenjs/tween.js';
import env from '../env.js';
import useBasic from '../hooks/useBasic';
import './style/tween.scss'

function Css3D() {
    let { scene, camera, renderer } = useBasic()
    let css3Renderer = new CSS3DRenderer();
    useLayoutEffect(() => {
        const tagHtml = document.getElementById('tag') as HTMLElement
        if (!renderer || !scene || !camera || !tagHtml) {
            return
        }
        const geometry = new THREE.ConeGeometry(10, 22, 32);

        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const cone = new THREE.Mesh(geometry, material);
        cone.name = 'cone';
        cone.position.set(0, 0, 0);
        scene.add(cone);





        const tag = new CSS3DObject(tagHtml)
        tag.position.y = 11
        tag.scale.set(0.5, 0.5, 0.5)


        cone.add(tag)
        // const css3Renderer = new CSS3DRenderer()
        css3Renderer.setSize(window.innerWidth - env.nav_width, window.innerHeight)
        console.log(css3Renderer)
        css3Renderer.domElement.style.position = 'absolute'
        // css3Renderer.domElement.style.width = window.innerWidth - env.nav_width + 'px'
        css3Renderer.domElement.style.top = '0px'
        // css3Renderer.domElement.style.background = 'red'
        // css3Renderer.domElement.style.left = env.nav_width+'px'

        css3Renderer.render(scene, camera)
        document.querySelector('.tween_wrap')?.appendChild(css3Renderer.domElement)

        css3Renderer.domElement.style.pointerEvents = 'none'

        // camera.position.z =50
        renderer?.render(scene, camera)
        const canvasP = document.querySelector('#canvas') as HTMLElement
        // canvasP?.appendChild(renderer?.domElement)



        const raycaster = new THREE.Raycaster();

        tag.visible = false
        document.addEventListener('click', function (event) {
            let posX = ((event.clientX - env.nav_width) / (window.innerWidth - env.nav_width)) * 2 - 1
            let posY = -(event.clientY / window.innerHeight) * 2 + 1
            raycaster.setFromCamera(new THREE.Vector2(posX, posY), camera);

            // console.log('click')
            const intersects = raycaster.intersectObjects(scene.children);

            if (intersects.length > 0) {

                let right = intersects.some(item => item.object.name === 'cone')
                console.log(right)
                if (right) {
                    tag.visible = true
                }
                else {
                    tag.visible = false
                }
            } else {
                tag.visible = false
            }
        });


    }, [camera])



    useLayoutEffect(() => {
        if ( !camera ) {
            return
        }
        const R = 30 // 半径

        let obj = {
            angle: 0
        }


        const tween = new TWEEN.Tween(obj)
        tween.to({ angle: Math.PI * 2 }, 3000)
        tween.onUpdate((obj) => {
            // camera.position.set(obj.x, obj.y, obj.z)
            camera.position.x = R * Math.sin(obj.angle)
            camera.position.y = R * Math.cos(obj.angle)
            camera.lookAt(0, 0, 0)
        })
        tween.easing(TWEEN.Easing.Quadratic.Out)
        tween.start()

        loop()

    }, [camera])


    const loop = () => {
        TWEEN.update();
        requestAnimationFrame(loop)
        renderer.render(scene, camera)
        css3Renderer.render(scene, camera)
    }

    return <div className="tween_wrap">
        <div id="tag">tag</div>
        <canvas id="canvas" style={{ 'display': 'block' }}></canvas>
    </div>
}


export default Css3D