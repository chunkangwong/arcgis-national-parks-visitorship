import { CalciteListItem, CalciteChip } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-chip";

function ResultListItem() {
  return (
    <CalciteListItem label="" value="" description="">
      <CalciteChip value="" slot="content-end" scale="s"></CalciteChip>
    </CalciteListItem>
  );
}

export default ResultListItem;
