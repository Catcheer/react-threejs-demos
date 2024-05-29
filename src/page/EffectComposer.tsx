import * as THREE from 'three';

import { useLayoutEffect } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import env from '../env.js';

import useBasic from '../hooks/useBasic';

function EffectComposerDemo() {
    let { scene, camera, renderer } = useBasic();

    useLayoutEffect(() => {


        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene?.add(cube);


        renderer?.render(scene, camera)

        const composer = new EffectComposer(renderer);
        // 创建一个渲染器通道，场景和相机作为参数
        const renderPass = new RenderPass(scene, camera);
        // 设置renderPass通道
        composer.addPass(renderPass);

        // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
        const v2 = new THREE.Vector2(window.innerWidth - env.nav_width, window.innerHeight);
        // const v2 = new THREE.Vector2(800, 600);
        const outlinePass = new OutlinePass(v2, scene, camera);
        // 一个模型对象
        outlinePass.selectedObjects = [cube];

        // 设置OutlinePass通道
        composer.addPass(outlinePass);

        const canvasP = document.querySelector('#canvas') as HTMLElement
        canvasP?.appendChild(renderer?.domElement)

        camera.position.set(30, 30, 30)
        camera.lookAt(0, 0, 0)


        outlinePass.visibleEdgeColor.set(0xffff00);
        outlinePass.edgeThickness = 4;
        outlinePass.edgeStrength = 6;
        outlinePass.pulsePeriod = 0;


        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth - env.nav_width, window.innerHeight), 6, 6, 6);

        // const glitchPass = new GlitchPass();
        // // 设置glitchPass通道
        // composer.addPass(glitchPass);
        // 渲染循环
       
        composer.render();


    }, [scene, camera, renderer])

    return (<div id='canvas'></div>)
}

export default EffectComposerDemo