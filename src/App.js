import { Map } from "@esri/react-arcgis";
import React from "react";

function App() {
  return (
    <Map
      mapProperties={{ basemap: "satellite" }}
      viewProperties={{
        center: [-70, 25],
        zoom: 4,
      }}
    ></Map>
  );
}

export default App;
