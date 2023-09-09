import {
  CalciteSegmentedControlCustomEvent,
  CalciteSelectCustomEvent,
  CalciteSliderCustomEvent,
} from "@esri/calcite-components";
import {
  CalciteAction,
  CalciteBlock,
  CalciteLabel,
  CalciteOption,
  CalciteSegmentedControl,
  CalciteSegmentedControlItem,
  CalciteSelect,
  CalciteSlider,
  CalciteTooltip,
} from "@esri/calcite-components-react";
import { countDefault, orderByDefault, yearDefault } from "../config";

interface FilterProps {
  orderBy: string;
  year: string;
  count: number;
  handleOrderByChange: (
    event: CalciteSegmentedControlCustomEvent<void>
  ) => void;
  handleYearChange: (event: CalciteSelectCustomEvent<void>) => void;
  handleCountChange: (event: CalciteSliderCustomEvent<void>) => void;
  handleReset: () => void;
}

const Filter = ({
  orderBy,
  year,
  count,
  handleOrderByChange,
  handleYearChange,
  handleCountChange,
  handleReset,
}: FilterProps) => {
  const isDefault =
    orderBy === orderByDefault &&
    year === yearDefault &&
    count === countDefault;

  return (
    <CalciteBlock heading="Filters" open>
      <div slot="control">
        <CalciteAction
          icon="reset"
          id="control-reset-el"
          onClick={handleReset}
          text="Reset to defaults"
          {...(isDefault
            ? {
                disabled: true,
              }
            : {
                indicator: true,
              })}
        />
        <CalciteTooltip reference-element="control-reset-el" placement="bottom">
          Reset to defaults
        </CalciteTooltip>
      </div>
      <CalciteLabel>
        Data type, per state
        <CalciteSegmentedControl
          width="full"
          value={orderBy}
          onCalciteSegmentedControlChange={handleOrderByChange}
        >
          <CalciteSegmentedControlItem value="DESC" checked>
            Most visited
          </CalciteSegmentedControlItem>
          <CalciteSegmentedControlItem value="ASC">
            Least visited
          </CalciteSegmentedControlItem>
        </CalciteSegmentedControl>
      </CalciteLabel>
      <CalciteLabel>
        Year data to display
        <CalciteSelect
          label="Year data to display"
          value={year}
          onCalciteSelectChange={handleYearChange}
        >
          <CalciteOption label="2022" value="F2022" />
          <CalciteOption label="2021" value="F2021" />
          <CalciteOption label="2020" value="F2020" />
          <CalciteOption label="2019" value="F2019" />
        </CalciteSelect>
      </CalciteLabel>
      <CalciteLabel>
        Max parks per state
        <CalciteSlider
          label-ticks
          ticks={1}
          min={1}
          max={5}
          value={count}
          onCalciteSliderChange={handleCountChange}
        />
      </CalciteLabel>
    </CalciteBlock>
  );
};

export default Filter;
