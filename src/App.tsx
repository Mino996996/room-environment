import React, {useState, useEffect} from 'react';
import {Graph} from "./components/Graph";
import {onValue, ref} from "firebase/database";
import {db} from "./modules/firebase";

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

    return  () => {
      clearInterval(timer);
      console.log("end");
    };
  },[]);

  useEffect(()=>{
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val() as RoomData[];
      // setRoomData(data);
      createArrayData(Object.values(data));
    });
    return () => {
      setCo2Data([]);
      setAirData([]);
      setTempData([]);
      setHumidData([]);
      setTimeData([]);
    };
  }, [todayStamp]);


  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-400">
        107 Room Condition
      </h1>
      <div className="h-1/4">
        <Graph label={"CO2"} data={co2Data} color={'#FF9800'} xItems={timeData}/>
      </div>

      <Graph label={"Air Dust"} data={airData} color={'#546E7A'} xItems={timeData}/>
      <Graph label={"Temperature"} data={tempData} color={'#66DA26'} xItems={timeData}/>
      <Graph label={"Humidity"} data={humidData} color={'#2E93fA'} xItems={timeData}/>
    </>

  );
}

export default App;
