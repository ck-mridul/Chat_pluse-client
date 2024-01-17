import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import axiosAuth from '../../../services/api/axios_config';
import { clearPeer } from '../../../Redux/peerSlice';
import { store } from '../../../Redux/store';
import { useChangeEffect } from './Context';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown(threadId) {
  const { changeEffect,setChangeEffect } = useChangeEffect();

    const handleRemove = ()=>{
        console.log(threadId)
        axiosAuth.post('/peerchat/removefriend/',threadId).then(res=>{
            setChangeEffect(res)
            store.dispatch(clearPeer())
        })
    }
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
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
                  Remove Friend
                </button>
              )}
            </Menu.Item>
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}