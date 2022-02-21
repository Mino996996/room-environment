import React, {useState, useEffect} from 'react';
import {onValue, ref} from "firebase/database";
import {db} from "./modules/firebase";
import Chart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

type RoomData = {
  time: string,
  air: number,
  co2: number,
  temperature: number,
  humidity: number
}

// 日付文字列　”2022-xx-xx"を返す
const checkDayStamp = (nowDate: Date): string => {
  const year = nowDate.getFullYear();
  const month = ('00' + (nowDate.getMonth()+1)).slice(-2);
  const day = ('00' + (nowDate.getDate())).slice(-2);
  return `${year}-${month}-${day}`;
}

const App: React.FC = () => {

  const [todayStamp, setTodayStamp] = useState<string>(checkDayStamp(new Date()));
  const dbRef = ref(db, todayStamp);
  const [co2Data, setCo2Data] = useState<number[]>([]);
  const [airData, setAirData] = useState<number[]>([]);
  const [tempData, setTempData] = useState<number[]>([]);
  const [humidData, setHumidData] = useState<number[]>([]);
  const [timeData, setTimeData] = useState<string[]>([]);

  // 各データを更新する
  const createArrayData = (data: RoomData[]): void => {
    setCo2Data(data.map(value => value.co2));
    setAirData(data.map(value => value.air));
    setTempData(data.map(value => value.temperature));
    setHumidData(data.map(value => value.humidity));
    setTimeData(data.map(value => value.time));
  }

  useEffect(() => {
    const timer = setInterval(()=>{
      const newDayStamp = checkDayStamp(new Date());
      if (todayStamp !== newDayStamp){
        setTodayStamp(newDayStamp);
      }
    },60000);

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val() as RoomData[];
      createArrayData(Object.values(data));
    });

    return  () => {
      clearInterval(timer);
      setCo2Data([]);
      setAirData([]);
      setTempData([]);
      setHumidData([]);
      setTimeData([]);
      console.log("end");
    };
  },[todayStamp]);

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
      categories: timeData
    }
  };

  return (
    <div className="max-h-screen">
      <h1 className="text-3xl font-bold underline text-red-400">
        107 Room Condition
      </h1>
      <div className="m-1 font-bold">
        <h2>CO2[ppm]</h2>
        <Chart type="line" options={options} series={[{name: "CO2", color: '#FF9800',data: co2Data}]} height={"300"} />
      </div>
      <div className="m-1 font-bold">
        <h2>Air Dust[/cf]</h2>
        <Chart type="line" options={options} series={[{name: "Air Dust", color: '#546E7A',data: airData}]} height={"300"} />
      </div>
      <div className="m-1 font-bold">
        <h2>Temperature[℃]</h2>
        <Chart type="line" options={options} series={[{name: "Temperature", color: '#66DA26',data: tempData}]} height={"300"} />
      </div>
      <div className="m-1 font-bold">
        <h2>Humidity[%]</h2>
        <Chart type="line" options={options} series={[{name: "Humidity", color: '#2E93fA',data: humidData}]} height={"300"} />
      </div>
    </div>
  );
}

export default App;
