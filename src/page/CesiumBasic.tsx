
import React, { useLayoutEffect } from "react";

import {
  Ion,
  Cartesian3,
  Math as CesiumMath,
  createOsmBuildingsAsync,
  Terrain,
  Viewer,
  HeadingPitchRange,
} from "cesium";

import * as Cesium from "cesium";








export default function CesiumBasic(){

     useLayoutEffect(() => {
    let viewer:any;
    async function init() {
      viewer = new Viewer("cesiumContainer", {
        terrain: Terrain.fromWorldTerrain({
            requestWaterMask: true,
            requestVertexNormals: true,
          // url: Cesium.IonResource.fromAssetId(3956),
        }),
      });
      let osmBuildingsTileset = await Cesium.createOsmBuildingsAsync();
      viewer.scene.primitives.add(osmBuildingsTileset);
      // let pointCloudTileset = await Cesium.createPointCloudTilesetAsync({
      //   url: "https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles",
      // });

      // console.log(pointCloudTileset);
        osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
          color: {
            conditions: [
              ["${name} === '上海中心大厦'", "color('red')"],
              ["true", "color('white')"],
            ],
          },
        });

      // 东方明珠坐标
      const longitude = 121.4998;
      const latitude = 31.2197;
      const height = 1000; // 高度越高越远离地面

      osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
        defines: {
          distanceFromComplex:
            "distance(vec2(${feature['cesium#longitude']}, ${feature['cesium#latitude']}), vec2(121.4998, 31.2197))",
        },
        color: {
          conditions: [
            ["${distanceFromComplex} > 0.10", "color('#d65c5c')"],
            ["${distanceFromComplex} > 0.06", "color('#f58971')"],
            ["${distanceFromComplex} > 0.02", "color('#f5af71')"],
            ["${distanceFromComplex} > 0.001", "color('#f5ec71')"],
            ["true", "color('#ffffff')"],
          ],
        },
      });

      // const wyoming = viewer.entities.add({
      //   name: "wyoming",
      //   polygon: {
      //     hierarchy: Cesium.Cartesian3.fromDegreesArray([
      //       -109.0, 40.0, -95.0, 40.0, -95.0, 50.0, -109.0, 50.0,
      //     ]),
      //     material: Cesium.Color.RED.withAlpha(0.5),
      //   },
      // });

      // viewer.zoomTo(wyoming);

      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(longitude, latitude, height),
        orientation: {
          heading: CesiumMath.toRadians(0), // 摄像头朝向：0°表示正北，可以调成 90 看东方等
          pitch: CesiumMath.toRadians(-25), // 向下看 30 度（负值）
          roll: 0, // 没有滚动
        },
      });
    }

    init();

    return () => {
      viewer.destroy();
    };
  }, []);


    return <div id="cesiumContainer" style={{ width: "100%", height: "100vh" }}></div>
}