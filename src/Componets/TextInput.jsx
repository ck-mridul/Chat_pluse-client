import React from 'react'

function TextInput(props) {
  return (
    <div className="mt-2">
            <input
              {...props}
              required
              className="block h-10 w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              
            />
          </div>
  )
}

export default TextInput