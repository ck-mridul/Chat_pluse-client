import axiosAuth from "./axios_config";



export const createRoom = async ()=>{
    const response = await axiosAuth.get('createroom/')
    console.log(response.data)
    return response.data
}