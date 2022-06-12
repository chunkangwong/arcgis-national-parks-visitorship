import {
  CalciteAction,
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
  CalciteTooltip,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
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
import "@esri/calcite-components/dist/components/calcite-tooltip";
import { Map } from "@esri/react-arcgis";
import { useState } from "react";
import FeatureLayerWidget from "./components/FeatureLayerWidget";
import HomeWidget from "./components/HomeWidget";

function App() {
  const [order, setOrder] = useState("DESC");
  const [year, setYear] = useState("TOTAL");
  const [count, setCount] = useState(1);

  function handleOrderChange(event) {
    setOrder(event.target.value);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handleCountChange(event) {
    setCount(event.target.value);
  }

  function handleReset() {
    setOrder("DESC");
    setYear("TOTAL");
    setCount(1);
  }

  return (
    <CalciteShell>
      <CalciteShellPanel slot="primary-panel">
        <CalcitePanel heading="National Park Visitation">
          <CalciteBlock heading="Filters" open>
            <div slot="control">
              <CalciteAction
                {...(order === "DESC" && year === "TOTAL" && count === 1
                  ? {
                      disabled: true,
                      icon: "reset",
                      id: "control-reset-el",
                      onClick: handleReset,
                    }
                  : {
                      indicator: true,
                      icon: "reset",
                      id: "control-reset-el",
                      onClick: handleReset,
                    })}
              ></CalciteAction>
              <CalciteTooltip
                label="Reset to defaults"
                reference-element="control-reset-el"
                position="bottom"
              >
                Reset to defaults
              </CalciteTooltip>
            </div>
            <CalciteLabel>
              Data type, per state
              <CalciteRadioGroup
                width="full"
                value={order}
                onCalciteRadioGroupChange={handleOrderChange}
              >
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
              <CalciteSelect
                value={year}
                onCalciteSelectChange={handleYearChange}
              >
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
                value={count}
                onCalciteSliderChange={handleCountChange}
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
            outFields: ["*"],
            popupTemplate: {
              title: "{Park}",
              content: [
                {
                  type: "fields",
                  fieldInfos: [
                    {
                      fieldName: "TOTAL",
                      label: "Total visits",
                      format: { digitSeparator: true },
                    },
                    {
                      fieldName: "F2018",
                      label: "2018",
                      format: { digitSeparator: true },
                    },
                    {
                      fieldName: "F2019",
                      label: "2019",
                      format: { digitSeparator: true },
                    },
                    {
                      fieldName: "F2020",
                      label: "2020",
                      format: { digitSeparator: true },
                    },
                  ],
                },
              ],
            },
          }}
        />
        <HomeWidget />
      </Map>
    </CalciteShell>
  );
}

export default App;
