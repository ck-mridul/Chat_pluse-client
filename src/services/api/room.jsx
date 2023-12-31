import axiosAuth from "./axios_config";
import { clearUser } from "../../Redux/userSlice";
import { store } from "../../Redux/store";


export const createRoom = async ()=>{
    try{
        const response = await axiosAuth.get('createroom/')
        return response.data
    }catch{
        store.dispatch(clearUser())
        localStorage.clear()
    }
    
}