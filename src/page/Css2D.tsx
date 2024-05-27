import { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


import useBasic from '../hooks/useBasic';
import './style/tween.scss'

function Css2D() {
    let { scene, camera, renderer } = useBasic()
    useEffect(() => {
        const geometry = new THREE.ConeGeometry(6, 20);

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);


        let axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
        renderer?.render(scene, camera)

        const canvasP = document.querySelector('#canvas') as HTMLElement

        canvasP?.appendChild(renderer?.domElement)

        const tagHtml = document.querySelector('#tag') as HTMLElement
        console.log(tagHtml)
        const tag = new CSS2DObject(tagHtml);
       
        cube.add(tag);
        console.log(cube)
        
        tag.position.set(0, 10, 0);
        // cube.position.set(0, -10, 0);
        // cube.rotateZ(Math.PI / 4);
        const css2Renderer = new CSS2DRenderer();
        css2Renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(css2Renderer.domElement);
        // 渲染HTML标签对应的CSS2DObject模型对象
        css2Renderer.render(scene, camera);
        renderer?.render(scene, camera)
        css2Renderer.domElement.style.position = 'absolute';
        css2Renderer.domElement.style.top = '0px';
        css2Renderer.domElement.style.pointerEvents = 'none';
    }, [])

    // useLayoutEffect(() => {
        
    //     // console.log(tag)
    // }, [])

    return <div>
        <div id='tag'>这是个标签</div>
        <div id="canvas"></div>
    </div>
}


export default Css2D