import React, { useEffect, useRef } from "react";
import olMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { ScaleLine, defaults } from "ol/control";
import MousePosition from "ol/control/MousePosition";
import { createStringXY, format } from "ol/coordinate";
import * as olProj from "ol/proj";
import "ol/ol.css";
import "./Map.css";

export const Map: React.FC = () => {
  let mapDivRef = useRef(null);
  let targetMap: any = "";
  let templateMousePos = 'Coordinate is {x} : {y}';

  useEffect(() => {
    console.log("useEffect");


    if (mapDivRef.current) {
      targetMap = mapDivRef.current;
    }
    const map = new olMap({
      target: targetMap,
      controls: defaults().extend([
        new ScaleLine(),
        new MousePosition({
          coordinateFormat: createStringXY(5),
          projection: "EPSG:4326",
        }),
      ]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: olProj.fromLonLat([39.71108, 47.24016]),
        zoom: 17,
      }),
    });
  }, [mapDivRef]);

  return <div className="mapContainer" ref={mapDivRef}></div>;
};

// class Map extends React.Component {
//   private mapDivRef: React.RefObject<HTMLDivElement>;

//   constructor(props: any) {
//     super(props);
//     this.mapDivRef = React.createRef<HTMLDivElement>();
//   }

//   componentDidMount() {
//     if(!this.mapDivRef.current) {
//       return;
//     }

//     const map = new olMap({
//       target: this.mapDivRef.current,
//       layers: [
//         new TileLayer({
//           source: new OSM()
//         })
//       ],
//       view: new View({
//         center: olProj.fromLonLat([39.71108, 47.24016]),
//         zoom: 17
//       })
//     });
//   }

//   render() {
//     return(
//       <div id="map" style={{width: "100%", height: "100%"}} ref={this.mapDivRef}></div>
//     )
//   }

// }

// export default Map;
