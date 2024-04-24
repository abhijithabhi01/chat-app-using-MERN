import { commonAPI } from "./commonAPI"
import { BASE_URL} from "./base_URL"


//register user
export const registerAPI = async(user)=>{
    return await commonAPI('POST',`${BASE_URL}/register/`,user,"")
}

//login user
export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${BASE_URL}/login/`,user,"")
}