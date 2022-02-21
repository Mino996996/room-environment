import React, {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../modules/firebase";
import Chart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

type Prop = {
  path: string
}

type RoomData = {
  time: string,
  air: number,
  co2: number,
  temperature: number,
  humidity: number
}

export const Graph: React.FC = () => {

  // const dbRef = ref(db, path);
  // const [roomData, setRoomData] = useState<RoomData[]>([]);
  //
  // useEffect(()=>{
  //   onValue(dbRef, (snapshot) => {
  //     const data = snapshot.val() as RoomData[];
  //     setRoomData(data);
  //   });
  // }, [path]);
  //
  // const createArrayData = (data: RoomData[]) => {
  //
  // }

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
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  };
  const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: "series-1",
      color: '#66DA26',
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ];

  return <Chart type="line" options={options} series={series} />;
}
