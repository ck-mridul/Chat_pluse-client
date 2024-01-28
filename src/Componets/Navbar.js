import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {UserCircleIcon } from '@heroicons/react/24/outline'
import 'tailwindcss/tailwind.css'; //react styles
import {useSelector} from 'react-redux'
import {selectUser} from '../Redux/userSlice'
import { clearUser } from "../Redux/userSlice";
import { store } from "../Redux/store";
import Modal from './Modals/UserUpdate';
import { useNavigate } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";


// import { getUser, userLogout } from '../services/api/auth';





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const user = useSelector(selectUser)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()


  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout =()=>{
      store.dispatch(clearUser())
      localStorage.clear();
      navigate('/')
    
    
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 justify-between">
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-12 items-center justify-between">
              
              <div className="flex flex-1">
                <div className="flex flex-shrink-0">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                {/* {!user.premium && <span onClick={()=>navigate('/subscription')} className='font-mono text-lime-100 me-4 cursor-pointer'>Premium</span>} */}
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {user.image ?<img
                        className="h-8 w-8 rounded-full"
                        src={user.image}
                        alt=""
                      /> : <UserCircleIcon className="w-10 h-10 text-gray-400" />}
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

                    

                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-slate-800 rounded-md  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                    <div className={'flex flex-row w-max justify-center gap-2.5 border border-2 border-primary border-slate-400 shadow p-2.5 rounded m-1'}>
                              <div style={{width: '50px', height: '50px'}}>
                                  {user.image ? <img src={user.image} alt="user"
                                       className={'object-cover rounded h-full w-full border-accent-color-one dark:border-dark-accent-color-one'}/>
                                      :<UserCircleIcon className="w-10 h-10 text-gray-400" />}
                              </div>
                              <div className={'w-max'}>
                                  <p className={ 'block px-4 py-2 text-sm text-slate-400 text-gray-700'}>Logined as</p>
                                  <p className={'block px-4 py-2 text-xl font-bold text-slate-400 text-gray-700'}>{user.name}</p>
                                  
                              </div>
                          </div>

                     
                      
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            onClick={openModal}
                            className={classNames(active ? 'bg-gray-100 text-slate-400' : '', 'block px-4 py-2 text-sm text-slate-400 text-gray-700')}
                          >
                            <IoMdSettings size={20} className='inline-block me-1'/> Settings
                          </p>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            onClick={handleLogout}
                            className={classNames(active ? 'bg-gray-100 text-slate-400' : '', 'block px-4 py-2 text-sm text-slate-400 text-gray-700')}
                          >
                            Sign out
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          
        </>
        <Modal isOpen={isModalOpen} onClose={closeModal} user={user} />

    </Disclosure>
  )
}
