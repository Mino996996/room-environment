import React from "react";
import Chart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

type Props = {
  data: number[],
  xItems: string[],
  color: string,
  label: string
}

export const Graph: React.FC<Props> = (prop) => {

  const options: ApexOptions = {
    chart: {
      zoom: {
        enabled: false
      },
      animations: {
        easing: "linear",
        dynamicAnimation: {
          speed: 500
        }
      },
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: prop.xItems
    }
  };
  const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: prop.label,
      color: prop.color,
      data: prop.data
    }
  ];

  return (
    <div className="m-3">
      <Chart type="line" options={options} series={series} height={"300"} />
    </div>

  );
}
