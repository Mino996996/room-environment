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
      }
    },
    // tooltip: {
    //   x: {
    //     format: "yyyy/MM/dd HH:mm:ss.f"
    //   }
    // },
    // xaxis: {
    //   type: "datetime",
    //   range: 24*60*60*1000
    // },
    // yaxis: {
    //   labels: {
    //     formatter: val => val.toFixed(0)
    //   },
    //   title: { text: "Value" }
    // }
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

  return <Chart type="line" options={options} series={series} />;
}
