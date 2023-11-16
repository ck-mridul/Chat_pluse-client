import axiosAuth,{axiosInstance} from "./axios_config";
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
        return await Promise.reject(error);
    }
}

export const emailVerification = async ({token})=>{
    try{
        await axiosInstance.post('/authentication/verify/', {token});
    }catch(error){
        return await Promise.reject(error);
    }
}
export const userProfileUpdate = async (formData)=>{
    try{
        const response = await axiosAuth.put('/authentication/update/',formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
        },})
        localStorage.setItem('user', JSON.stringify(response.data))
        store.dispatch(setUser(response.data))

        return await Promise.resolve(response);
    }
    catch(error){
        return await Promise.reject(error);
    }
}

export const adminlogin = async ({email,password})=>{
    try{
        const response = await axiosInstance.post('/authentication/adminlogin/',{email,password})
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