import React, { useEffect, useState } from 'react';
import { PasswordField } from '../Componets/PasswordInput';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import {userRegister} from '../services/api/auth'
import Swal from 'sweetalert2';
import {useSelector} from "react-redux";
import TextInput from '../Componets/TextInput';
import {  toast } from 'react-toastify';



function RegisterPage() {

  const [formData, setFormData] = useState({password: ''});
  const [inputError, setInputError] = useState({});
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate()
  const location = useLocation()

  const errorTost = (errorMsg) => {
    toast.error(errorMsg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
    });
  };
  
  useEffect(() => {
    if(user){
      const previousPath = location.state?.from || '/';
      navigate(previousPath)
    }
    
  }, [user]);

  const sweetalert = ()=>{
    Swal.fire({
      title: 'Successfully Registered ',
      text: 'Varification mail send to your email',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    })
  }

  const formValidation = (name,value)=>{
    switch (name) {
      case 'name':
        if (value.trim() === ''){
          setInputError(prev => ({...prev, name: 'Name can\'t be empty!'}));
        }else{
          setInputError(prev => ({...prev, name: ''}));
        }
        break;
      case 'email':
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        if (regex.test(value)) {
          setInputError(prev => ({...prev, email: ''}));
        }else{
          setInputError(prev => ({...prev, email: 'Email is not valid !'}));
        }
        break;
      case 'password':
        if (value.trim() === '') {
          setInputError(prev => ({ ...prev, password: 'Password can\'t be empty!' }));
        }
        
        else if(value.length < 6){
            setInputError(prev => ({...prev, password: 'Must be at least 6 characters long!'}))
          }else{
            setInputError(prev => ({...prev, password: ''}))
          }
        if (formData.password1){
          if(value !== formData.password1){
            setInputError(prev => ({...prev, password1: 'Password not match!'}))
          }else{
            setInputError(prev => ({...prev, password1: ''}))
          }
        }
        break;
      case 'password1':
          if(value !== formData.password){
            setInputError(prev => ({...prev, password1: 'Password not match!'}))
          }else{
            setInputError(prev => ({...prev, password1: ''}))
          }
        break;
      default:
        break;
    }
  }
  

  const handleChange =(e)=>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value.trim()})
    formValidation(name,value)

  }

  const handleSubmit =  (e) => {
    e.preventDefault();
    formValidation('password1', formData.password1);
  
    if (inputError.name || inputError.email || inputError.password || inputError.password1) {
      return false
    }else{
      
      userRegister(formData).then(()=>{
        sweetalert()
        navigate('/login')
      }).catch((e)=>{
        errorTost(e.response.data)
         
        });
      
    }
    
  };
  
  
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
        Sign up your Account here!
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          
          <TextInput
          id="name"
          name="name"
          type="text"
          placeholder='Full Name' 
          value={formData.name}
          onChange={handleChange}
          />
          {inputError.name && <span className="text-red-500" > {inputError.name} </span>}
        </div>

        <div>
          
          <TextInput
          id="email"
          placeholder='Email'
          name="email"
          type='email'
          onChange={handleChange} 
          />
          {inputError.email && <span className="text-red-500" > {inputError.email} </span>}
        </div>



        <div>
          
          <div className="mt-2">
            
            <PasswordField
              autoComplete="new-password"
              name="password" 
              onChange={handleChange} 
              placeholder={'Password'} 
              required
              />
        {inputError.password && 
        <span className="text-red-500" > 
        {inputError.password}
        </span>
        }

            <PasswordField
            autoComplete="new-password"
            placeholder={'Confirm Password'}
            onChange={handleChange} 
            name="password1" 
            required
            />
            {inputError.password1 && 
          <span className="text-red-500" > 
          {inputError.password1}
          </span>
          }

          </div>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
      Already have an account?{' '}
        <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </p>
    </div>
  </div>


  </>
  );
}

export default RegisterPage;
