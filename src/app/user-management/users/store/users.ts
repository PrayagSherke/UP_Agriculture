// export interface Users {
//   _id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobileNo: string;
//   role:string;
//   gender:string;
//   password:string;
// }


export class Users {
  _id: number=0;
  firstName: string='';
  lastName: string='';
  email: string='';
  mobileNo: string='';
  role:string='';
  gender:string='';
  password:string='';
  [key: string]: any;
}


export class User {
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate: Date
  ) {}

  get expireDate() {
    return this.expirationDate;
  }

  get userToken() {
    return this.token;
  }
}




