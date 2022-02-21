import { ref, onValue } from "firebase/database";
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

// reactで.envファイルを使う際は頭にREACT_APP_が必須
const mail = process.env.REACT_APP_EMAIL;
const pass = process.env.REACT_APP_PASS;
const collectionPath = process.env.REACT_APP_COLLECTION_PATH;
const subCollectionPath = process.env.REACT_APP_SUB_COLLECTION_PATH;

export class FirebaseRepository implements iFirebaseRepository{
  constructor() {
  }

  async latestData(dayStamp: string){
    // await signInWithEmailAndPassword(auth, mail!, pass!).then((user)=> {
    //   console.log(user.user)
    // });
    // const dataCollectionRef = collection(db, collectionPath!, dayStamp, subCollectionPath!);
    // const snapshot = await getDocs(dataCollectionRef);
    // const data: RoomData[] =[];
    // snapshot.forEach((s) => {
    //   const singleData: RoomData = {
    //     time: s.id,
    //     air: s.data().air,
    //     co2: s.data().co2,
    //     humidity: s.data().humidity,
    //     temperature: s.data().temperature
    //   };
    //   data.push(singleData);
    // });
    const dbRef = ref(db, '2022-02-21');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
    // console.log(data.length);

  }
}
