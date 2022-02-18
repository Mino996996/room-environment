import {collection, query, where, getDocs, doc, getDoc} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../modules/firebase";

export type RoomData = {
  time: string,
  air: number,
  co2: number,
  humidity: number,
  temperature: number
}

export interface iFirebaseRepository {
  latestData: (dayStamp: string) => Promise<void>;
}

const mail = '';
const pass = '';
const collectionPath = '';
const subCollectionPath = '';

export class FirebaseRepository implements iFirebaseRepository{
  constructor() {
  }

  async latestData(dayStamp: string){
    await signInWithEmailAndPassword(auth, mail, pass).then((user)=> {
      console.log(user.user)
    });
    const dataCollectionRef = collection(db, collectionPath, dayStamp, subCollectionPath);
    const snapshot = await getDocs(dataCollectionRef);
    const data: RoomData[] =[];
    snapshot.forEach((s) => {
      const singleData: RoomData = {
        time: s.id,
        air: s.data().air,
        co2: s.data().co2,
        humidity: s.data().humidity,
        temperature: s.data().temperature
      };
      data.push(singleData);
    });
    console.log(data.length);
    console.log(data);
  }
}
