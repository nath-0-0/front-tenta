import { IItem} from './item';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  avatar: string;
  pseudo: string;
  address: string;
  zip: string;
  state: string;
  country: string;
  homeLocation: {
    type: string; coordinates: [number]
  };
  mobileNumber: string;
  favorites: string[];
  items: IItem[];
  lastlogin: number;
  notifications: {
    user_id: string,
    title: string;
    date: Date | number;
    text: string;
  }[];
  // ajoute t'on dans les propriétés la liste des emrpunts/ prets / objet en emrpunt?
}
/*
notifications: {
    type : {
      lend_id : [String],
      title: {type: String, require: false, minLength: 2, maxLength: 100},
      date: {type: Number, require: true, default : Date.now},
      text: {type: String, require: false, minLength: 5, maxLength: 200},
      contactNotif : {type: String, require: false, minLength: 5, maxLength: 500}
    },
  */