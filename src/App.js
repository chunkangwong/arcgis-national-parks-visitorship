import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map";
import TopFeaturesQuery from "@arcgis/core/rest/support/TopFeaturesQuery";
import TopFilter from "@arcgis/core/rest/support/TopFilter";
import MapView from "@arcgis/core/views/MapView";
import Home from "@arcgis/core/widgets/Home";
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
import { useEffect, useRef, useState } from "react";
import ResultListItem from "./components/ResultListItem";

function App() {
  const [orderBy, setOrderBy] = useState("DESC");
  const [year, setYear] = useState("TOTAL");
  const [count, setCount] = useState(1);
  const [features, setFeatures] = useState([]);
  const [featureLayer, setFeatureLayer] = useState(null);
  const [view, setView] = useState(null);
  const [layerView, setLayerView] = useState(null);

  const mapDiv = useRef(null);

  useEffect(() => {
    const map = new Map({
      basemap: "topo-vector",
    });

    const view = new MapView({
      container: mapDiv.current,
      map,
      center: [-120, 45],
      zoom: 3,
    });
    setView(view);

    const home = new Home({
      view,
    });
    view.ui.add(home, "top-right");

    const featureLayer = new FeatureLayer({
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
    });
    setFeatureLayer(featureLayer);
    map.add(featureLayer);
    view.whenLayerView(featureLayer).then((layerView) => {
      setLayerView(layerView);
    });
  }, []);

  useEffect(() => {
    if (featureLayer && layerView) {
      filterItems()
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [featureLayer, layerView, year, orderBy, count]);

  async function filterItems() {
    const query = new TopFeaturesQuery({
      topFilter: new TopFilter({
        topCount: count,
        groupByFields: ["State"],
        orderByFields: `${year} ${orderBy}`,
      }),
      orderByFields: `${year} ${orderBy}`,
      outFields: ["State, TOTAL, F2018, F2019, F2020, Park"],
      returnGeometry: true,
      cacheHint: false,
    });

    const results = await featureLayer.queryTopFeatures(query);
    setFeatures(results.features);

    query.orderByFields = [""];
    const objectIds = await featureLayer.queryTopObjectIds(query);
    layerView.filter = { objectIds };
  }

  async function handleOrderByChange(event) {
    setOrderBy(event.target.value);
  }

  async function handleYearChange(event) {
    setYear(event.target.value);
  }

  async function handleCountChange(event) {
    setCount(event.target.value);
  }

  async function handleReset() {
    setOrderBy("DESC");
    setYear("TOTAL");
    setCount(1);
  }

  function handleResultClick(result, index) {
    const popup = features && features[parseInt(index, 10)];
    if (popup) {
      view.popup.open({
        features: [popup],
        location: popup.geometry,
      });
      view.goTo(
        {
          center: [result.geometry.longitude, result.geometry.latitude],
          zoom: 4,
        },
        { duration: 400 }
      );
    }
  }

  return (
    <CalciteShell>
      <CalciteShellPanel slot="primary-panel">
        <CalcitePanel heading="National Park Visitation">
          <CalciteBlock heading="Filters" open>
            <div slot="control">
              <CalciteAction
                {...(orderBy === "DESC" && year === "TOTAL" && count === 1
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
                value={orderBy}
                onCalciteRadioGroupChange={handleOrderByChange}
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
          <CalciteBlock collapsible open heading="Results" id="result-block">
            <CalciteList id="result-list">
              {features.map((feature, index) => (
                <ResultListItem
                  attributes={feature.attributes}
                  index={index}
                  onResultClick={() => handleResultClick(feature, index)}
                  key={index}
                />
              ))}
            </CalciteList>
          </CalciteBlock>
        </CalcitePanel>
      </CalciteShellPanel>
      <div id="mapDiv" ref={mapDiv} style={{ height: "100%" }}></div>
    </CalciteShell>
  );
}

export default App;
