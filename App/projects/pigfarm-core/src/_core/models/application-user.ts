import { HttpStatusCode } from "../_enums/http.statuscode.enum";

export interface ApplicationUser {
  token: string;
  user: User;
  refreshToken: string;
}
export interface FunctionSystem {
  name: string;
  url: string;
  functionCode: string;
  childrens: Action[];
}
export interface Action {
  id: number;
  url: string;
  code: string;
}


export interface UserForLogin {
  username: string;
  password: string;

}
export interface User {
  id: any;
  username: string;
  guid: string;
  nickName: string;
  email: string;
  groupCode: string;
  groupID: any;
  token: any;
  refresToken: any;
}


export interface OperationResult {
  statusCode: HttpStatusCode;
  message: string;
  success: boolean;
  data: any;
  errorCode: any;
}
