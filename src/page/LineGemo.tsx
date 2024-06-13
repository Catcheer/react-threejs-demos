
import { useLayoutEffect } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useBasic from '../hooks/useBasic';
import * as dat from 'dat.gui';
import TWEEN from '@tweenjs/tween.js';

function LineGemo() {
    const { scene, camera, renderer } = useBasic();

    useLayoutEffect(() => {
        if (!renderer || !scene || !camera) {
            return
        }


        scene.background = null;
        renderer.setClearAlpha(0)
        camera.position.set(10, 10, 20);
        const controls = new OrbitControls(camera, renderer.domElement);


        let obj = {
            size: 20,
        }
        const gui = new dat.GUI();

        gui.add(obj, 'size', [10, 20, 30]).onChange((val) => {
            update()
        })

        function createPoints() {
            let vertices: Array<number> = [];
            for (let i = 0; i < 120; i++) {
                vertices.push(Math.random() * obj.size - 5);
                vertices.push(Math.random() * obj.size - 5);
                vertices.push(Math.random() * obj.size - 5);
            }
            return vertices
        }

        let group = new THREE.Group();

        let lineMesh: THREE.Line;
        function line() {
            const geometry = new THREE.BufferGeometry();
            const vertices = createPoints()
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
            const lineMat = new THREE.LineBasicMaterial({ color: 0xff0000 });
            lineMesh = new THREE.Line(geometry, lineMat);
            group.add(lineMesh);
            console.log('lineMesh', lineMesh)
        }

       

        function update() {
            const arr = createPoints()
            const tween = new TWEEN.Tween(lineMesh.geometry.attributes.position.array)
            tween.to(arr, 3000)
            tween.onUpdate((newPoints) => {
                lineMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(newPoints, 3))

            })
            tween.easing(TWEEN.Easing.Quadratic.Out)
            tween.start()

            

            for (let i = 0; i < arr.length; i += 3) {
                const ball = group.getObjectByName(`ball_${i}`)
                if (ball) {
                    const tweenBall = new TWEEN.Tween(ball.position)
                    tweenBall.to({x:arr[i],y:arr[i + 1], z:arr[i + 2]}, 3000)
                  
                    tweenBall.easing(TWEEN.Easing.Quadratic.Out)
                    tweenBall.start()
                }
            }

        }



      


        const sphere = new THREE.SphereGeometry(0.1, 12, 12);
        const material = new THREE.MeshNormalMaterial({ wireframe:true });
       

        function smallBoll(){
            const vertices = Array.from(lineMesh.geometry.attributes.position.array)
            
            for (let i = 0; i < vertices.length; i += 3) {
                const ball = new THREE.Mesh(sphere, material);
                ball.position.set(vertices[i], vertices[i + 1], vertices[i + 2])
                // console.log('ball', ball.position)
                ball.name = `ball_${i}`
                group.add(ball)
            }
            
        }
        line()
        smallBoll()
      

        // console.log('group', group)

        scene.add(group)

        function loop() {
            TWEEN.update();
            group.rotateOnAxis(new THREE.Vector3(1, 1, 1), 0.001)
            renderer.render(scene, camera);
            requestAnimationFrame(loop);
        }
        loop()

        return () => {
            gui.destroy()
        }

    }, [scene])
    return (
        <div className="font_demo_wrap">
            <canvas id="canvas" style={{ display: 'block' }}></canvas>
        </div>
    );
}


export default LineGemo;