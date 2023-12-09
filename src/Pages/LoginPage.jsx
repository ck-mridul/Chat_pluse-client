import React, { useEffect, useState } from 'react';

import { PasswordField } from '../Componets/PasswordInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userlogin, adminlogin } from '../services/api/auth';
import {useSelector} from "react-redux";


function LoginPage({login,register=false,admin=false}) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(user){
      const previousPath = location.state?.from || '/';
      navigate(previousPath)
    }
    
  }, [user]);
  
  const handleChange =(e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =()=>{
    setErrorMsg('')

    if(admin){
      adminlogin(formData)
    .then(()=>{
      navigate('/admin')
    })
    .catch((e)=>{
      setErrorMsg(e.response.data)
    })
    }
    
    else{
      userlogin(formData)
    .then(()=>{
      navigate('/')
    })
    .catch((e)=>{
      setErrorMsg(e.response.data)
    })
    }
  }

  return (
    <>
  {/* <section className="mt-16 flex flex-col md:flex-row w-full"> */}
  <div className=" flex min-h-screen flex-col justify-center items-center gap-2 p-2 md:p-8">
      
      <p className="text-center font-semibold italic text-white">{login}</p>
      
        <div style={{width:'25%'}}>

          <input placeholder='Email' value={formData.email} 
          onChange={handleChange} name='email'
          className={'h-10 w-full text-white focus:outline-0 mb-4 bg-dark-primary p-3 rounded-md'}
          required/>

          <PasswordField value={formData.password} 
          onChange={handleChange} name={'password'} 
          placeholder={'Password'} required/>

          </div>
          {errorMsg && <p className="text-red-500"> {errorMsg} </p>}
          <button onClick={handleSubmit} className="bg-slate-900 text-white  p-2 rounded" >
            Login
          </button>
     {register && <Link to={'/register'} className='text-white'>New here? Click here</Link>}

      
    </div>
    
  {/* </section> */}


</>
  );
}

export default LoginPage;
