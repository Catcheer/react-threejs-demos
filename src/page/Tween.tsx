
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import {Button} from 'antd'
import TWEEN from '@tweenjs/tween.js';
import useBasic from '../hooks/useBasic';

import './style/tween.scss'

function Tween() {
    let { scene, camera, renderer } = useBasic()
    let refBtn = useRef<HTMLButtonElement|null>(null)

    let [cubA,setCubA] = useState<THREE.Mesh>()

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


        // const R = 30 // 半径

        // let obj = {
        //     angle: 0
        // }

        



        const geometry1 = new THREE.BoxGeometry(10, 10, 10);

        const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube1 = new THREE.Mesh(geometry1, material1);
        cube1.position.set(30, 0, 0);
        setCubA(cube1)
        scene.add(cube1);
        renderer?.render(scene, camera);


        refBtn.current?.addEventListener('click', () => {
            handleToA()
        })

       

    }, [])

    const handleToA = () => {

     
        const pos = new THREE.Vector3(0, 0, 0)
         cubA?.getWorldPosition(pos)
         console.log(pos)

        let disPos =  pos.clone().addScalar(30);

        console.log(disPos)


       // 相机从当前位置camera.position飞行三维场景中某个世界坐标附近
    new TWEEN.Tween({
        // 相机开始坐标
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
        // 相机开始指向的目标观察点
        tx: 0,
        ty: 0,
        tz: 0,
    })
    .to({
        // 相机结束坐标
        x: disPos.x,
        y: disPos.y,
        z: disPos.z,
        // 相机结束指向的目标观察点
        tx: pos.x,
        ty: pos.y,
        tz: pos.z,
    }, 2000)
    .onUpdate(function (obj) {
        // 动态改变相机位置
        camera.position.set(obj.x, obj.y, obj.z);
        // 动态计算相机视线
        camera.lookAt(obj.tx, obj.ty, obj.tz);
    })
    .start().easing(TWEEN.Easing.Quadratic.Out);

    loop();
        
    }


    const   loop=()=> {
        console.log(1)
        TWEEN.update();
        renderer?.render(scene, camera);
        requestAnimationFrame(loop);
      
    }
   

    return <div className='tween_wrap'>
        <Button className='handle_to_a' ref={refBtn}  >点击</Button>
        
        <div id='canvas'></div>
    </div>
}

export default Tween