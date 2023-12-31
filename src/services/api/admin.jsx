import axiosAuth,{axiosInstance} from "./axios_config";

export const userlist = async()=>{
    const response = await axiosAuth.get('/admin/listuser')
    return await Promise.resolve(response);
}