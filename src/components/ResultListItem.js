import { CalciteListItem, CalciteChip } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-chip";

function ResultListItem({ attributes, index, onResultClick }) {
  const { Park, State, TOTAL } = attributes;

  return (
    <CalciteListItem
      label={Park}
      value={index}
      description={`${TOTAL.toLocaleString()} visitors`}
      onClick={onResultClick}
    >
      <CalciteChip value={State} slot="content-end" scale="s">
        {State}
      </CalciteChip>
    </CalciteListItem>
  );
}

export default ResultListItem;
