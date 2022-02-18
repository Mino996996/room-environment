import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../modules/firebase";

export type RoomData = {
  air: number,
  co2: number,
  humidity: number,
  temperature: number
}


export interface iFirebaseRepository {
  latestData: (dayStamp: string) => Promise<void>;
}

export class FirebaseRepository implements iFirebaseRepository{
  constructor() {
  }

  async latestData(dayStamp: string){
    const dataCollectionRef = collection(db, '107', dayStamp, 'environmentData');
    const snapshot = await getDocs(dataCollectionRef);
    const data: RoomData[] =[];
    snapshot.forEach((s) => {
      const singleData: RoomData = s.data() as RoomData;
      data.push(singleData);
    });
    console.log(data.length);
    console.log(data);
  }
}
