
import { useLayoutEffect } from "react";
import * as THREE from 'three';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useBasic from '../hooks/useBasic';

function FontDemo() {
    const { scene, camera, renderer } = useBasic();

    useLayoutEffect(() => {
        if (!renderer || !scene || !camera) {
            return
        }

        const textMesh = new THREE.Mesh();
        const material = new THREE.MeshNormalMaterial({ vertexColors : true });
        const loader = new FontLoader();
        loader.load('helvetiker_regular.typeface.json', font => {
            textMesh.geometry = new TextGeometry('ABC', {
                font: font,
                size: 160,
                height: 20,
                curveSegments: 32,
                bevelEnabled: true,
                bevelThickness: 3,
                bevelSize: 12,
                bevelOffset: 1,
                bevelSegments: 12
            });
            textMesh.material = material;
            scene.add(textMesh);
        });
    
          

        
        scene.background = null;
        renderer.setClearAlpha(0)
        camera.position.set(10, 10, 100);
        const controls = new OrbitControls(camera, renderer.domElement);
        function loop(){
            renderer.render(scene, camera);
            requestAnimationFrame(loop);
        }
        loop()




    }, [scene])
    return (
        <div className="font_demo_wrap">
            <canvas id="canvas" style={{ display: 'block' }}></canvas>
        </div>
    );
}


export default FontDemo;