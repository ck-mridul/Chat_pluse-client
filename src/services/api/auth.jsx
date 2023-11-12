import {axiosInstance} from "./axios_config";
import { setUser } from "../../Redux/userSlice";
import { store } from "../../Redux/store";

export const userlogin = async ({email,password})=>{
    try{
        const response = await axiosInstance.post('/authentication/token/',{email,password})
        const {user,tokens} = response.data
        localStorage.setItem('accessToken', tokens.access)
        localStorage.setItem('refreshToken', tokens.refresh)
        localStorage.setItem('user', JSON.stringify(user))
        store.dispatch(setUser(user))
        return await Promise.resolve(response);
    }catch(error){
        return await Promise.reject(error)
    }
}

export const userRegister = async ({name,email,password})=>{
    try{
        const response = await axiosInstance.post('/authentication/register/', {name, email, password});
        
        return await Promise.resolve(response);
    }
    catch(error){
        console.log(error)
        return await Promise.reject(error);
    }
}
