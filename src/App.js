import {
  CalciteBlock,
  CalciteLabel,
  CalciteList,
  CalciteOption,
  CalcitePanel,
  CalciteRadioGroup,
  CalciteRadioGroupItem,
  CalciteSelect,
  CalciteShell,
  CalciteShellPanel,
  CalciteSlider,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-radio-group";
import "@esri/calcite-components/dist/components/calcite-radio-group-item";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-slider";
import { Map } from "@esri/react-arcgis";
import FeatureLayerWidget from "./components/FeatureLayerWidget";
import HomeWidget from "./components/HomeWidget";

function App() {
  return (
    <CalciteShell>
      <CalciteShellPanel slot="primary-panel">
        <CalcitePanel heading="National Park Visitation">
          <CalciteBlock heading="Filters" open>
            <CalciteLabel>
              Data type, per state
              <CalciteRadioGroup id="control-visited-type-el" width="full">
                <CalciteRadioGroupItem value="DESC" checked>
                  Most visited
                </CalciteRadioGroupItem>
                <CalciteRadioGroupItem value="ASC">
                  Least visited
                </CalciteRadioGroupItem>
              </CalciteRadioGroup>
            </CalciteLabel>
            <CalciteLabel>
              Year data to display
              <CalciteSelect id="control-year-el">
                <CalciteOption
                  label="Total of all time"
                  value="TOTAL"
                ></CalciteOption>
                <CalciteOption label="2018" value="F2018"></CalciteOption>
                <CalciteOption label="2019" value="F2019"></CalciteOption>
                <CalciteOption label="2020" value="F2020"></CalciteOption>
              </CalciteSelect>
            </CalciteLabel>
            <CalciteLabel>
              Max parks per state
              <CalciteSlider
                id="control-count-per-state-el"
                label-ticks
                ticks="1"
                min="1"
                max="5"
              ></CalciteSlider>
            </CalciteLabel>
          </CalciteBlock>
          <CalciteBlock collapsible heading="Results" id="result-block">
            <CalciteList id="result-list"></CalciteList>
          </CalciteBlock>
        </CalcitePanel>
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
