import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import axiosAuth from '../../../services/api/axios_config';
import { useChangeEffect } from './Context';
import {  toast } from 'react-toastify';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown(props) {
  const { setChangeEffect,peer,setPeer,setSelectPeer } = useChangeEffect();
  const user = JSON.parse(localStorage.getItem('user'))
  
    const handleRemove = ()=>{
        console.log(props)
        axiosAuth.post('/peerchat/removefriend/',props).then(res=>{
            setChangeEffect(res)
            setPeer({})
            setSelectPeer()
        })
    }

    const handleBlock = ()=>{
      console.log(props)
      axiosAuth.post('/peerchat/blockcontact/',props).then(res=>{
          console.log(res.data.message,'rsponehjhj')
          if(res.data.message === 'blocked'){
            setPeer({...peer,block_by:res.data.block_by})
          }else{
            setPeer({...peer,block_by:null})
          }
          setChangeEffect(new Date())
      }).catch(err=>{
        console.log(err)
        errorNotification(err.response.data.error)
      })
  }

  const errorNotification = (err_msg) => {
    toast.error(err_msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
      <Menu.Button>
        <HiOutlineDotsVertical className='text-slate-500'size={30}/>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 inline-block">
            <Menu.Item>
              {({ active }) => (
                <button
                type='button'
                onClick={handleRemove}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Remove Contact
                </button>
              )}
            </Menu.Item>

            {(peer.block_by == user.id || !peer.block_by) && <Menu.Item>
              {({ active }) => (
                <button
                type='button'
                onClick={handleBlock}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {!peer.block_by ? 'Block Contact' :'Unblock Contact'}
                </button>
              )}
            </Menu.Item>}
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}