
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import useBasic from '../hooks/useBasic';

function Tween() {
    let { scene, camera, renderer } = useBasic()

    useLayoutEffect(() => {

        const canvas = document.querySelector('#canvas')

        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        scene.add(cube);

        camera.target = cube;
        renderer?.render(scene, camera);

        console.log(scene)

        canvas?.appendChild(renderer?.domElement);

       
        const tween = new TWEEN.Tween(camera.position);//创建一段tween动画
        tween.to({ x: 10, y: 10,z:20 }, 2000);
        //tween动画开始执行
        tween.start();

        function loop() {
            TWEEN.update();
            // 测试tweenjs是否逐渐改变pos对象的x和y属性
            // console.log(pos.x,pos.y);
            // camera.position.set(10, 10, 20);
            renderer?.render(scene, camera);
            requestAnimationFrame(loop);
        }
        loop();

    }, [])


    return <div id='canvas'></div>
}

export default Tween