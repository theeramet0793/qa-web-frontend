
import { IUser } from "../../data/interface/IUser";
import jwt_decode from "jwt-decode";

export const GetUserData  = () =>{
  const accToken = localStorage.getItem('qa_access_token');
  if(accToken){
    return( jwt_decode<IUser>(accToken));
  }
  return undefined;
}