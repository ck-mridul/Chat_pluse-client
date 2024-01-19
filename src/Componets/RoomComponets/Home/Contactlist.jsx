import React, { useEffect, useState } from 'react'
import AxiosAuth from '../../../services/api/axios_config'
import axiosAuth, { baseURL } from '../../../services/api/axios_config'
import { setPeer } from '../../../Redux/peerSlice';
import { store } from '../../../Redux/store';
import { clearUser } from '../../../Redux/userSlice';
import {IoPersonAddOutline} from 'react-icons/io5'
import { RxCross2 } from "react-icons/rx";
import { useChangeEffect } from './Context';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";


function Contactlist() {
    const [friends, setFriends] = useState([]);
    const [selectPeer, setSelectPeer] = useState();
    const user = JSON.parse(localStorage.getItem('user'))
    const [search, setSearch] = useState();
    const [searchR, setSearchR] = useState([]);
    const { changeEffect,setChangeEffect } = useChangeEffect();
    const navigate = useNavigate()
 
    useEffect(() => {
        AxiosAuth.get('/peerchat/').then((res)=>{
            console.log(res.data,'friend')
            setFriends(res.data) 
        }).catch((err)=>{
            console.log(err)
            // localStorage.clear()
            // store.dispatch(clearUser())
            // navigate('/login')
            
        })
        
    }, [changeEffect]);

    const handleselectPeer = (userId,Tid,name,email,image) =>{
        console.log(userId)
        setSelectPeer(userId)
        store.dispatch(setPeer({userId,Tid,name,email,image})) 
    }

    const handleSerach = (e)=>{
        const search = e.target.value
        setSearch(search)
        if(!search)return 
         axiosAuth.post('/peerchat/search/',{search}).then((res)=>{
            console.log(res.data,'search')
            setSearchR(res.data) 
         }).catch(()=>{
            setSearchR()
         })
    }
    
    const handleAddFriend = (friendId)=>{
        axiosAuth.post('/peerchat/addfriend/',{friendId}).then(res=>{
            setChangeEffect(res)
            setSearch('')

        }).catch(err=>{
            console.log(err)
        })
    }

  return (
    <div className="w-80 border h-[600px] relative flex flex-col">
        <div className='w-full items-center flex border h-16 '>
            <div className='h-10 ms-2 w-72 m-2 flex items-center bg-slate-200 rounded-md border'>
            <input type="text" onChange={handleSerach} placeholder='Search...' 
            className={'h-full w-64 bg-slate-200 focus:outline-0  p-3 rounded-md'}
            value={search}
            />
            {search && <RxCross2 onClick={()=>setSearch('')} className='text-slate-500' size={20}/>}
            </div>
        </div>
        <div className='border  overflow-y-auto'>

        {!search && friends.map((friend, index) => ( 
            friend.first_person.id === user.id ?(
            <div key={index} onClick={()=>handleselectPeer(
                friend.second_person.id,
                friend.id,
                friend.second_person.name,
                friend.second_person.email,
                friend.second_person.image
                )}
                 className={`h-16 border ${friend.second_person.id == selectPeer ? 'bg-blue-300' : 'hover:bg-slate-200'} items-center flex cursor-pointer`} >
                <div className='rounded-full border overflow-hidden h-14 w-14'>
                {friend.second_person.image ?<img
                        src={baseURL+friend.second_person.image}
                        alt=""
                      /> : <FaUserCircle className='text-stone-400' size={55}/>}
                </div>
                <h3 className='ms-10 tracking-wide text-slate-600 font-medium text-xl font-sans'>{friend.second_person.name}</h3>
            </div>
            ) : (
                <div key={index} onClick={()=>handleselectPeer(
                    friend.first_person.id,
                    friend.id,
                    friend.first_person.name,
                    friend.first_person.email,
                    friend.first_person.image
                )}
                 className={`h-16 border ${friend.first_person.id == selectPeer ? 'bg-blue-300' : 'hover:bg-slate-200'} items-center flex cursor-pointer`}>
                    <div className='rounded-full border overflow-hidden h-14 w-14'>
                    {friend.first_person.image ?<img
                        src={baseURL+friend.first_person.image}
                        alt=""
                      /> : <FaUserCircle className='text-stone-400' size={55}/>}
                    </div>
                    <h3 className='ms-10 tracking-wide text-slate-600 font-medium text-xl font-sans'>{friend.first_person.name}</h3>
                </div>
            )
        ))}

        {search && searchR.map((friend, index) => {
            const isNotLoggedInUser = friend.id !== user.id;
            const isNewFriend1 = friends.filter(existingFriend => existingFriend.first_person.id === friend.id).length === 0;
            const isNewFriend2 = friends.filter(existingFriend => existingFriend.second_person.id === friend.id).length === 0;

            if (isNotLoggedInUser && isNewFriend1 && isNewFriend2) {
                return (
                    <div key={index} 
                        className={`h-16 border hover:bg-slate-200 items-center flex cursor-pointer`} >
                        <div className='rounded-full border overflow-hidden h-14 w-14'>
                            <img className='object-cover' src={baseURL+friend.image} alt="profile" /> 
                        </div>
                        <div className='ms-4'>
                            <h3 className='tracking-wide text-slate-600 font-medium text-xl font-sans'>{friend.name}</h3>
                            <span className='text-sm text-slate-300'>{friend.email}</span>
                        </div>
                        <IoPersonAddOutline onClick={()=>handleAddFriend(friend.id)} className='ms-auto me-3 text-slate-600' alt='add friend' size={15}/>
                    </div>
                );
            }
            return null;
        })}


            
        
        </div>
    
  </div>
  )
}

export default Contactlist