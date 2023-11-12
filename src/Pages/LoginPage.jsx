import React, { useState } from 'react';
import LoginBanner from '../assets/Banner/login-page-banner.png'
import LogoBanner from '../assets/logo/dark-logo-banner.png'
import { PasswordField } from '../Componets/PasswordInput';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userlogin } from '../services/api/auth';



function LoginPage() {
  

  const [formData, setFormData] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate()
  const location = useLocation()

  
  const handleChange =(e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =()=>{
    setErrorMsg('')

    userlogin(formData)
    .then(()=>{
      navigate('/')
    })
    .catch((e)=>{
      setErrorMsg(e.response.data)
    })
  }

  return (
    <>
  <section className="mt-16 flex flex-col md:flex-row w-full">
  <section className="w-full md:w-2/4 flex flex-col justify-center items-center gap-2 p-2 md:p-8">
      <div className="w-3/4">
        <img src={LogoBanner} className={'object-cover'} alt="Logo" />
      </div>
      <p className="text-center font-semibold italic text-white">Login to your Account</p>
      
        <div style={{width:'50%'}}>

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
      <Link to={'/register'} className='text-white'>New here? Click here</Link>

      
    </section>
    <div className="hidden md:flex w-2/4 justify-center">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={LoginBanner} style={{ width: '100%', height: 'auto' }} alt="Login" />
      </div>
    </div>
  </section>


</>
  );
}

export default LoginPage;
