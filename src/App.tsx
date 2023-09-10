import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import TopFeaturesQuery from "@arcgis/core/rest/support/TopFeaturesQuery";
import TopFilter from "@arcgis/core/rest/support/TopFilter";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import {
  CalciteSegmentedControlCustomEvent,
  CalciteSelectCustomEvent,
  CalciteSliderCustomEvent,
} from "@esri/calcite-components";
import {
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { layer, view } from "./arcgis";
import Filter from "./components/Filter";
import Results from "./components/Results";
import { countDefault, orderByDefault, yearDefault } from "./config";

const setRenderer = async () => {
  const symbol = new WebStyleSymbol({
    name: "park",
    styleName: "Esri2DPointSymbolsStyle",
  });

  const cimSymbol = await symbol.fetchCIMSymbol();
  const symbolLayers = cimSymbol.data.symbol
    .symbolLayers as __esri.CIMVectorMarker[];
  symbolLayers[0].size = 24;
  symbolLayers[1].size = 0;

  return new SimpleRenderer({
    symbol: cimSymbol,
  });
};

function App() {
  const viewDiv = useRef<HTMLDivElement>(null);
  const layerView = useRef<__esri.FeatureLayerView>();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(countDefault);
  const [orderBy, setOrderBy] = useState(orderByDefault);
  const [year, setYear] = useState(yearDefault);
  const [graphics, setGraphics] = useState<__esri.Graphic[]>([]);

  useEffect(() => {
    if (viewDiv.current) {
      view.container = viewDiv.current;
      view.when(async () => {
        layer.renderer = await setRenderer();
        layerView.current = await view.whenLayerView(layer);
      });
    }
  }, []);

  useEffect(() => {
    const filterItems = async () => {
      if (!layer || !layerView.current) {
        return;
      }
      setLoading(true);
      const query = new TopFeaturesQuery({
        topFilter: new TopFilter({
          topCount: count,
          groupByFields: ["State"],
          orderByFields: [`${year} ${orderBy}`],
        }),
        orderByFields: [`${year} ${orderBy}`],
        outFields: ["State, F2022, F2021, F2020, F2019, Park"],
        returnGeometry: true,
        cacheHint: false,
      });

      const results = await layer.queryTopFeatures(query);

      query.orderByFields = [""];
      const objectIds = await layer.queryTopObjectIds(query);
      layerView.current.filter = new FeatureFilter({
        objectIds,
      });

      setGraphics(results.features);
      setLoading(false);
    };
    filterItems();
  }, [orderBy, count, year]);

  const handleOrderByChange = (e: CalciteSegmentedControlCustomEvent<void>) => {
    setOrderBy(e.target.value);
  };

  const handleYearChange = (e: CalciteSelectCustomEvent<void>) => {
    setYear(e.target.value);
  };

  const handleCountChange = (e: CalciteSliderCustomEvent<void>) => {
    setCount(Number(e.target.value));
  };

  const handleReset = () => {
    setCount(countDefault);
    setOrderBy(orderByDefault);
    setYear(yearDefault);
  };

  return (
    <CalciteShell>
      <CalciteShellPanel slot="panel-start">
        <CalcitePanel heading="National Park Visitation">
          <Filter
            count={count}
            orderBy={orderBy}
            year={year}
            handleCountChange={handleCountChange}
            handleOrderByChange={handleOrderByChange}
            handleYearChange={handleYearChange}
            handleReset={handleReset}
          />
          <Results year={year} graphics={graphics} loading={loading} />
        </CalcitePanel>
      </CalciteShellPanel>
      <div id="viewDiv" ref={viewDiv} />
    </CalciteShell>
  );
}

export default App;
