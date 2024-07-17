
import React, { useLayoutEffect } from "react";

import * as THREE from 'three';

import useBasic from '../hooks/useBasic';
function PointsMaterial() {
  let { scene, camera, renderer } = useBasic()
  useLayoutEffect(() => {
    if (!renderer || !scene || !camera) {
      return
    }
    camera.position.z = 300;

    const vertextshader = `
          attribute float size;
          varying vec3 vColor;
          void main(){
            vColor = color;
           
           vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_Position = projectionMatrix * mvPosition;
           gl_PointSize = size * ( 300.0 / -mvPosition.z );
          }
  `

    const fragmentshader = `
    uniform sampler2D pointTexture;
    varying vec3 vColor;
    void main(){
        gl_FragColor = vec4( vColor, 1.0 );
				gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
    }

  `
    let uniforms = {

      pointTexture: { value: new THREE.TextureLoader().load('/spark1.png') }

    };
    const vertices: number[] = [];
    const colors = [];
    const sizes = [];
    const color = new THREE.Color();
    let geometry: THREE.BufferGeometry = new THREE.BufferGeometry();


    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertextshader,
      fragmentShader: fragmentshader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true
    })


    const pointsCount = 1000;
    const radius = 300;

    for (let i = 0; i < pointsCount; i++) {
      const x = (Math.random() * 2 - 1) * radius;
      const y = (Math.random() * 2 - 1) * radius;
      const z = (Math.random() * 2 - 1) * radius;

      vertices.push(x, y, z);
      color.setHSL(i / pointsCount, 1.0, 0.5);
      colors.push(color.r, color.g, color.b)
      sizes.push( 20 );

    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setUsage( THREE.DynamicDrawUsage ) );
    const points = new THREE.Points(geometry, shaderMaterial);
    console.log(points)
    scene.add(points);

    function updataPos() {
      // const newList = Array.from(points.geometry.attributes.position.array).map((item, index) => {
      //   if (index % 3 == 2) {
      //     if (item > 100) {
      //       return -150 + Math.floor(Math.random() * 50)
      //     }
      //     return item + 0.5;
      //   } else {
      //     return item
      //   }
      // })
      // geometry.setAttribute('position', new THREE.Float32BufferAttribute(newList, 3))
      const positions  = geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        if (positions[i + 2] > 100) {
          positions[i + 2] = -150 + Math.floor(Math.random() * 50)
        }
        positions[i + 2] += 1;
      }
      geometry.attributes.position.needsUpdate = true;
    }

    function ani() {
      updataPos()
      renderer.render(scene, camera)
      requestAnimationFrame(ani)
    }
    ani()
    // renderer.render(scene,camera)
  }, [scene]);

  return (

    <canvas id="canvas" style={{ 'display': 'block' }}></canvas>
  );
}


export default PointsMaterial;