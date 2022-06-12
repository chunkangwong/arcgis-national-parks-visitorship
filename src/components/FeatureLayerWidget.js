import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";

function FeatureLayerWidget(props) {
  const { featureLayer, setFeatureLayer, setLayerView } = props;
  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"])
      .then(([FeatureLayer]) => {
        const featureLayer = new FeatureLayer({
          ...props.featureLayerProperties,
        });
        setFeatureLayer(featureLayer);
        props.map.add(featureLayer);
        props.view.whenLayerView(featureLayer).then((layerView) => {
          setLayerView(layerView);
        });
      })
      .catch((err) => {
        console.error(err);
      });
    return function cleanup() {
      props.map.remove(featureLayer);
    };
  }, []);
}

export default FeatureLayerWidget;
