import React, { useCallback, useEffect, useState } from 'react'
import AxiosAuth from '../../../services/api/axios_config'
import axiosAuth, { baseURL } from '../../../services/api/axios_config'
import {IoPersonAddOutline} from 'react-icons/io5'
import { RxCross2 } from "react-icons/rx";
import { useChangeEffect } from './Context';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
// import debounce from 'lodash/debounce';


function Contactlist() {
    const [friends, setFriends] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'))
    const [search, setSearch] = useState('');
    const [searchR, setSearchR] = useState([]);
    const { changeEffect,setChangeEffect,setPeer,selectPeer,setSelectPeer } = useChangeEffect();
    const navigate = useNavigate()
 
    useEffect(() => {
        AxiosAuth.get('/peerchat/').then((res)=>{
            console.log(res.data,'friend')
            setFriends(res.data) 
        }).catch((err)=>{
            console.log(err)
            localStorage.clear()
            setPeer({})
            navigate('/login')
             
        })
        
    }, [changeEffect]);

    const handleselectPeer = (
        userId,
        Tid,
        name,
        email,
        image,
        block_by,
        )=>
        {
        if (selectPeer === userId) return
        console.log(userId)
        setSelectPeer(userId)
        setPeer({
            userId,
            Tid,
            name,
            email,
            image,
            block_by,
        })
    }

    const debounce = (func)=>{
        let timer;
        return function (...args){
            const context = this;
            if(timer) clearTimeout(timer)
            timer = setTimeout(()=>{
                timer = null
                func.apply(context,args);
            },500);
        }
    }




    const handleSerach = (e) => {
        const {value} = e.target
        if (value.trim() === '') return;
      
        axiosAuth.get(`/peerchat/search/?search=${value}`).then((res) => {
          setSearchR(res.data);
        }).catch(() => {
          setSearchR();
        });
      };

      
      const handleChange = useCallback(debounce(handleSerach),[])
      
      const onInputChange = (e)=>{
        setSearch(e.target.value)
        handleChange(e)
      }
    
    const handleSelectCondact = (contact)=>{
        console.log(contact,'contact',selectPeer)
        axiosAuth.get(`/peerchat/addfriend/?friendId=${contact.id}`).then(res=>{
            console.log(res.data,'kkkokokokok')
            setChangeEffect(res)
            setSearch('')
            handleselectPeer(
                contact.id,
                res.data.Tid,
                contact.name,
                contact.email,
                contact.image,
                res.data.block_by

            )

        }).catch(err=>{
            console.log(err,'errerre')
        })
    }

  return (
    <div className="w-80 border h-[600px] relative flex flex-col">
        <div className='w-full items-center flex border h-16 '>
            <div className='h-10 ms-2 w-72 m-2 flex items-center bg-slate-200 rounded-md border'>
            <input type="text" onChange={onInputChange} placeholder='Search...' 
            className={'h-full w-64 bg-slate-200 focus:outline-0  p-3 rounded-md'}
            value={search}
            />
            {search && <RxCross2 onClick={()=>setSearch('')} className='text-slate-500' size={20}/>}
            </div>
        </div>
        <div className='border  overflow-y-auto'>

        {!search && friends.map((friend, index) => ( 
            friend.first_person.id === user.id && !friend.hide_by_frst ?(
            <div key={index} onClick={()=>handleselectPeer(
                friend.second_person.id,
                friend.id,
                friend.second_person.name,
                friend.second_person.email,
                friend.second_person.image,
                friend.block_by,
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
            )  : (
                friend.first_person.id !== user.id && !friend.hide_by_second && (
                <div key={index} onClick={()=>handleselectPeer(
                    friend.first_person.id,
                    friend.id,
                    friend.first_person.name,
                    friend.first_person.email,
                    friend.first_person.image,
                    friend.block_by,
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
            )
        ))}

        {search && searchR.map((contact, index) => {
            const isNotLoggedInUser = contact.id !== user.id
            if (isNotLoggedInUser) {
                return (
                    <div key={index} 
                        className={`h-16 border hover:bg-slate-200 items-center flex cursor-pointer`} 
                        onClick={()=>handleSelectCondact(contact)} 
                        >
                        <div className='rounded-full border overflow-hidden h-14 w-14'>
                        {contact.image ?<img
                        src={baseURL+contact.image}
                        alt=""
                      /> : <FaUserCircle className='text-stone-400' size={55}/>}
                        </div>
                        <div className='ms-4'>
                            <h3 className='tracking-wide text-slate-600 font-medium text-xl font-sans'>{contact.name}</h3>
                            <span className='text-sm text-slate-300'>{contact.email}</span>
                        </div>
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