import React from "react";
import {
  SparklineComponent,
  Inject,
  SparklineTooltip,
  SparklineType
} from "@syncfusion/ej2-react-charts";

type TProps = {
  id: string;
  height: string;
  width: string;
  color: string;
  data: Object[]
  type: SparklineType;
  currentColor: string;
}

class SparkLine extends React.PureComponent<TProps> {
  render() {
    const { id, height, width, color, data, type, currentColor } = this.props;
    return (
      <SparklineComponent
        id={id}
        height={height}
        width={width}
        lineWidth={1}
        valueType="Numeric"
        fill={color}
        border={{ color: currentColor, width: 2 }}
        dataSource={data}
        xName="x"
        yName="yval"
        type={type}
        tooltipSettings={{
          visible: true,
          format: "${x} : data ${yval}",
          trackLineSettings: { visible: true },
        }}
      >
        <Inject services={[SparklineTooltip]} />
      </SparklineComponent>
    );


  }
}

export default SparkLine;
