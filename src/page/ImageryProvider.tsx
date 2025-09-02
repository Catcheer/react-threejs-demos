import React, { useLayoutEffect } from "react";

// import {
//   Ion,
//   Cartesian3,
//   Math as CesiumMath,
//   createOsmBuildingsAsync,
//   Terrain,
//   Viewer,
//   HeadingPitchRange,
// } from "cesium";

// import * as Cesium from "cesium";

const Cesium = (window as any).Cesium;

export default function ImageryProvider() {
  useLayoutEffect(() => {
    let viewer: any;
    async function init() {
      let list = Cesium.Cartesian3.fromDegreesArrayHeights([
        120.0, 30.0, 0.0, 
        35.0, 125.0, 0.0, 
        125.0, 30.0,100
      ]);
      console.log(list);

      const token = "d47fd7dfa69b2cbee4591ead20b6ffea";
      // 服务负载子域
      const subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];

      //       const terrainProvider = new Cesium.CesiumTerrainProvider({
      //     url: './terrains/zz',
      //     // requestWaterMask: true,
      // });
      // terrainProvider.alpha = 0.5;

      const img1 = new Cesium.ImageryLayer(
        new Cesium.UrlTemplateImageryProvider({
          url:
            "https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile" +
            "&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w" +
            "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=" +
            token,
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
          maximumLevel: 18,
        })
      );
      img1.alpha = 0.5;
      viewer = new Cesium.Viewer("cesiumContainer", {
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        // terrainProvider,
        terrain: Cesium.Terrain.fromWorldTerrain({
          requestWaterMask: true,
        }),
        baseLayer: Cesium.ImageryLayer.fromProviderAsync(
          Cesium.ArcGisMapServerImageryProvider.fromBasemapType(
            Cesium.ArcGisBaseMapType.SATELLITE
          )
        ),
        // imageryProvider:new Cesium.WebMapTileServiceImageryProvider({
        //   url: "/tdt/vec_w/wmts?tk="+token,
        //   layer:'tdtBasicPlayer',
        //   style:'default',
        //   format: "image/jpeg",

        //   tileMatrixSetId:'GoogleMapsCompatible'

        // })

        // baseLayer: img1,
      });

      // // 设置 3D 地形
      // const imageryLayer = new Cesium.UrlTemplateImageryProvider({
      //     url : './terrains/zz', // 对应你本地切片路径
      //     maximumLevel: 10 // 根据你切片的最大级别设置
      // });

      // viewer.imageryLayers.addImageryProvider(imageryLayer);

      // 添加天地图矢量中文标注
      const biaozhu = new Cesium.UrlTemplateImageryProvider({
        url:
          "https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile" +
          "&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w" +
          "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=" +
          token,
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 18,
      });
      viewer.imageryLayers.addImageryProvider(biaozhu);
      // 郑州人民公园
      const longitude = 113.6619;
      const latitude = 34.7207;
      const height = 3000; // 高度越高越远离地面

      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        orientation: {
          heading: Cesium.Math.toRadians(0), // 摄像头朝向：0°表示正北，可以调成 90 看东方等
          pitch: Cesium.Math.toRadians(-25), // 向下看 30 度（负值）
          roll: 0, // 没有滚动
        },
      });

      const tileset = await Cesium.createOsmBuildingsAsync();
      viewer.scene.primitives.add(tileset);

      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(113.6519, 34.8007, 300),
        // orientation:{
        //   heading: Cesium.Math.toRadians(90),
        // },
        model: {
          uri: "./mods/boeing_777_airplane.glb",

          minimumPixelSize: 128,
          minimumScale: 0.5,
          silouetteColor: Cesium.Color.RED,
          silouetteSize: 30,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            50000
          ),
          //   silouetteColor: Cesium.Color.WHITE,
          //   silouetteSize: 30
        },
      });

      // const rectangle  = viewer.entities.add({
      //   rectangle:{
      //     coordinates:Cesium.Rectangle.fromDegrees(112.5519, 33.7007, 113.7519, 34.9007),
      //     outline:true,
      //     outlineColor:Cesium.Color.RED,
      //     outlineWidth:5,
      //     material:Cesium.Color.YELLOW.withAlpha(0.5)
      //   }

      // })

      //primtive

      // let material = new Cesium.Material.fromType("Color",{
      //   color: Cesium.Color.YELLOW.withAlpha(0.5)
      // })

      // let appearance = new Cesium.EllipsoidSurfaceAppearance({
      //   material: material,
      //   flat: true,

      // })
      // // 创建几何体

      // const rectGeometry = new Cesium.RectangleGeometry({
      //   rectangle: Cesium.Rectangle.fromDegrees(
      //     112.5519,
      //     33.7007,
      //     113.7519,
      //     34.9007
      //   ),
      //   vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
      //   height: 0,
      // });

      // //创建实例
      // const rectInstance = new Cesium.GeometryInstance({
      //   geometry: rectGeometry,
      //   id: "rect",

      // });

      // //创建图元
      // const rectPrimitive = new Cesium.Primitive({
      //   geometryInstances: rectInstance,
      //   appearance: appearance
      // });

      // viewer.scene.primitives.add(rectPrimitive);

      // //拾取
      // let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      // handler.setInputAction(function (movement:any) {
      //   // console.log(movement.position)
      //   let pickerObject = viewer.scene.pick(movement.position);
      //   if (Cesium.defined(pickerObject)) {
      //     console.log(pickerObject.id)
      //   }

      // }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    }

    init();

    document.addEventListener("keydown", function (e) {
      let height = viewer.camera._positionCartographic.height;
      let moveRate = height / 20;
      if (e.key === "w") {
        //获取相机离地面的高度
        // console.log(viewer.camera._positionCartographic)

        viewer.camera.moveForward(moveRate);
      } else if (e.key === "s") {
        viewer.camera.moveBackward(moveRate);
      } else if (e.key === "a") {
        viewer.camera.moveLeft(moveRate);
      } else if (e.key === "d") {
        viewer.camera.moveRight(moveRate);
      } else if (e.key === "q") {
        viewer.camera.lookLeft(Cesium.Math.toRadians(0.1));
      } else if (e.key === "e") {
        viewer.camera.lookRight(Cesium.Math.toRadians(0.1));
      }
    });

    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div id="cesiumContainer" style={{ width: "100%", height: "100vh" }}></div>
  );
}
