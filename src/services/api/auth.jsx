import axiosAuth,{axiosInstance} from "./axios_config";
import { setUser } from "../../Redux/userSlice";
import { store } from "../../Redux/store";
import { baseURL } from "./axios_config";

export const userlogin = async ({email,password})=>{
    try{
        const response = await axiosInstance.post('/authentication/token/',{email,password},{withCredentials:true})
        const {user,tokens} = response.data
        if(user.image) user.image = baseURL + user.image
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

export const getUser = async()=>{
    try{
        const responce = await axiosAuth.get('/authentication/getuser')

    }
    catch(error){
        localStorage.clear()
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
        console.log(response.data)
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

// export const userLogout = async ()=>{
//     try{
//         const response = await axiosAuth.post('/authentication/logout/')
//         return await Promise.resolve(response);
//     }catch(error){
//         return await Promise.reject(error)
//     }
// }