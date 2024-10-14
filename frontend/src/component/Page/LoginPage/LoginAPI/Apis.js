import { commonrequest } from "./ApiCall";
import {BACKEND_URL} from "./helper";

export const sentOtpFunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/userotp`,data)
}

export const userVerify = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/login`,data)
}


export const Verify = () => {
    // Your implementation here
};