import React, { useLayoutEffect } from "react";

const Cesium = (window as any).Cesium;
export default function Measure() {
    let viewer: any;
  useLayoutEffect(() => {
   
    async function init() {
       
      viewer = new Cesium.Viewer("cesiumContainer", {
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        terrain: Cesium.Terrain.fromWorldTerrain({
          requestWaterMask: true,
        }),
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          //高德矢量图
          url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
          minimumLevel: 3,
          maximumLevel: 18,
        }),
      });
      viewer.scene.globe.depthTestAgainstTerrain = true;
      viewer.scene.screenSpaceCameraController.enableCollisionDetection = true;

      // 添加高德影像图
      let atLayer = new Cesium.UrlTemplateImageryProvider({
        url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        minimumLevel: 3,
        maximumLevel: 18,
      });
     
      let imageryLayer =  viewer.imageryLayers.addImageryProvider(atLayer);
      imageryLayer.alpha = 0.5;

      viewer.camera.flyTo({
        destination:{
            x: -2522541.1550551853,
            y: 5074313.976786005,
            z: 3076543.479017529
        },
        orientation:{
            heading: 0.0,
            pitch: -Math.PI/5.0,
            roll: 0.0
        },
        complete: function () {
          // console.log("flyTo complete",viewer.camera.computeViewRectangle());
        },
      })


      
    }



    init();


    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (event:any) {
      let pick = viewer.scene.camera.pickEllipsoid(event.position) // 获取点击位置的笛卡尔坐标
      console.log("pick", pick)

      let cartographic = Cesium.Cartographic.fromCartesian(pick) //转换为弧度
      let longitude = Cesium.Math.toDegrees(cartographic.longitude) // 转角度
      let latitude = Cesium.Math.toDegrees(cartographic.latitude) // 转角度
      console.log("wgs84", longitude,latitude)

      viewer.entities.add({
        position: pick,
        point: {
          pixelSize: 10,
          color: Cesium.Color.RED,
        },
        

      })

    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    // let measure = new Cesium.Measure(viewer)
    // let clampToGround = true
    // measure.drawLineMeasureGraphics({ clampToGround: clampToGround, callback: () => { } });
   
    return () => {
      if (viewer && !viewer.isDestroyed()) viewer.destroy();
    };
  });


  const copyCameraView = () => {
    if (!viewer) return;
    // // const { position, , up } = viewer.camera;
    // console.log("position",  viewer.camera.position);
    // console.log("heading",  viewer.camera.heading);
    // console.log("roll",  viewer.camera.roll);
    let curResult = viewer.camera.pickEllipsoid(
        new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2), 
       
    );
    console.log("curResult", curResult);
    let curPos = Cesium.Ellipsoid.WGS84.cartesianToCartographic(curResult);
    let lon = curPos.longitude * 180 / Math.PI;
    let lat = curPos.latitude * 180 / Math.PI;
    console.log("当前经纬度:", lon, lat);
  };

  return (
    <div id="cesiumContainer" style={{ width: "100%", height: "100vh" }}>
        <button
        onClick={copyCameraView}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 999,
          padding: "6px 12px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        中心经纬度
      </button>
    </div>
  );
}
