import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";

function FeatureLayerWidget(props) {
  const [featureLayer, setFeatureLayer] = useState(null);

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"])
      .then(([FeatureLayer]) => {
        const featureLayer = new FeatureLayer({
          url: props.featureLayerProperties.url,
        });
        setFeatureLayer(featureLayer);
        props.map.add(featureLayer);
      })
      .catch((err) => {
        console.error(err);
      });
    return function cleanup() {
      props.map.remove(featureLayer);
    };
  }, [props]);
}

export default FeatureLayerWidget;
