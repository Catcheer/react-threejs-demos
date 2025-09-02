// cesium-tdt.d.ts
import * as Cesium from 'cesium';

declare module 'cesium' {
  export class GeoTerrainProvider extends Cesium.TerrainProvider {
    constructor(options: { urls: string[] });
  }

  export class GeoWTFS {
    constructor(options: any);
    initTDT(params: any): void;
    getTileUrl(): string;
    getIcoUrl(): string;
  }
}