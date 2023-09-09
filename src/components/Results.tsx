import {
  CalciteBlock,
  CalciteChip,
  CalciteList,
  CalciteListItem,
} from "@esri/calcite-components-react";
import { view } from "../arcgis";

interface ResultsProps {
  graphics: __esri.Graphic[];
  year: string;
}

const Results = ({ graphics, year }: ResultsProps) => {
  const handleResultClick = (graphic: __esri.Graphic, index: number) => () => {
    const popup = graphics && graphics[index];
    if (popup) {
      const geometry = popup.geometry as __esri.Point;
      view.popup.open({
        features: [popup],
        location: graphic.geometry,
      });
      view.goTo(
        {
          center: [geometry.longitude, geometry.latitude],
          zoom: 4,
        },
        { duration: 400 }
      );
    }
  };

  return (
    <CalciteBlock
      collapsible
      heading={`Results (${graphics.length})`}
      open={graphics.length > 0}
    >
      <CalciteList>
        {graphics.map((graphic, index) => (
          <CalciteListItem
            key={graphic.attributes.Park}
            label={graphic.attributes.Park}
            value={index}
            description={`${graphic.attributes[
              year
            ].toLocaleString()} visitors`}
            onClick={handleResultClick(graphic, index)}
            role="button"
            tabIndex={0}
          >
            <CalciteChip
              scale="s"
              slot="content-end"
              value={graphic.attributes.State}
            >
              {graphic.attributes.State}
            </CalciteChip>
          </CalciteListItem>
        ))}
      </CalciteList>
    </CalciteBlock>
  );
};

export default Results;
