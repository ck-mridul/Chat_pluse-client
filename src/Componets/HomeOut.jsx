import React from 'react';
import HomeBanner from '../assets/Banner/home-page-banner.png'
import LogoBanner from '../assets/logo/dark-logo-banner.png'
import { useNavigate } from 'react-router-dom';

function HomeOut() {
  const navigate = useNavigate()
  
  return (
    <>
  <section className="mt-16 flex flex-col md:flex-row w-full">
    <div className="hidden md:flex w-2/4 justify-center">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={HomeBanner} style={{ width: '100%', height: 'auto' }} alt="Image" />
      </div>
    </div>

    <section className="w-full md:w-2/4 flex flex-col justify-center items-center gap-10 p-2 md:p-8">
      <div className="w-3/4">
        <img src={LogoBanner} className={'object-cover'} alt="Logo" />
      </div>
      <p className="text-center font-semibold italic text-white">
        Welcome to Our Virtual Classroom! Experience seamless
        online learning with our innovative platform. Connect, engage, and excel with interactive tools,
        rich resources, and a supportive community of passionate learners.</p>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={() => { navigate('/login/') }}>
        Get Started
      </button>
    </section>
  </section>


</>
  );
}

export default HomeOut;
