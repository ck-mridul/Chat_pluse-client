import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiOutlineDotsVertical } from "react-icons/hi";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DeleteDropdwon({id,DeleteMsg}) {

    const handleRemove = ()=>{
        console.log(id)
        DeleteMsg(id)
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  Delete
                </button>
              )}
            </Menu.Item>
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}