import axiosAuth,{axiosInstance} from "./axios_config";

export const userlist = async()=>{
    const response = await axiosAuth.get('/authentication/listuser')
    return await Promise.resolve(response);
}