import { IUser } from './user';
import { IItem } from './item';

export interface ILend {
    _id: string;
    item: IItem; // pour l'historique, celui ci peut apparait donc encore si l'objet n'existe plus
    dateFrom: Date;
    dateTo: Date;
    dateAsk: Date;
    isDamaged: boolean;
    isLate: boolean;
    accepted: {ask: boolean, message: string}; //  ask askOk Out refused history (confirmIn) --> 7 jours après History
    returned: boolean;
    idUserBorrower: IUser;
    idUserLender: IUser;
      // UserBorrower: {user_id: string, contact: string};
    // UsserLender: {user_id: string, contact: string};
    message: string; // message pouvant accompagner la demande de prêt
  }
