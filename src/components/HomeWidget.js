import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";

function HomeWidget(props) {
  const { setView } = props;
  const [home, setHome] = useState(null);

  useEffect(() => {
    loadModules(["esri/widgets/Home"])
      .then(([Home]) => {
        const home = new Home({
          view: props.view,
        });
        setHome(home);
        setView(props.view);
        props.view.ui.add(home, "top-right");
      })
      .catch((err) => {
        console.error(err);
      });
    return function cleanup() {
      props.view.ui.remove(home);
    };
  }, []);
}

export default HomeWidget;
