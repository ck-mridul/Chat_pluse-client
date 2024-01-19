import React, { useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import { PasswordField } from '../Componets/PasswordInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userlogin } from '../services/api/auth';
import {useSelector} from "react-redux";

 
function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(user){
      const previousPath = location.state?.from || '/';
      navigate(previousPath)
    }
    
  }, [user]);

  const errorTost = (errorMsg) => {
    toast.error(errorMsg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
    });
  };
  
  const handleChange =(e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =(e)=>{
    e.preventDefault()
    if (!formData.password) return
    userlogin(formData)
    .then(()=>{
      navigate('/')
    })
    .catch((e)=>{
      errorTost(e.response.data)

    })
  
  }

  return (
    <>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block h-10 w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  placeholder='Email' 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                
                <PasswordField
                value={formData.password} 
                onChange={handleChange}
                name={'password'} 
                placeholder={'Password'}
                />

              </div>
            </div>

            <div>
              <button
                
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a user?{' '}
            <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>


</>
  );
}

export default LoginPage;
