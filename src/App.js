import {
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import { Map } from "@esri/react-arcgis";
import FeatureLayerWidget from "./components/FeatureLayerWidget";
import HomeWidget from "./components/HomeWidget";

function App() {
  return (
    <CalciteShell>
      <CalciteShellPanel slot="primary-panel">
        <CalcitePanel heading="National Park Visitation"></CalcitePanel>
      </CalciteShellPanel>
      <Map
        viewProperties={{
          center: [-120, 45],
          zoom: 3,
        }}
      >
        <FeatureLayerWidget
          featureLayerProperties={{
            url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/US_National_Parks_Annual_Visitation/FeatureServer/0",
          }}
        />
        <HomeWidget />
      </Map>
    </CalciteShell>
  );
}

export default App;
