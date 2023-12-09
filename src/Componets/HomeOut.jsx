import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeOut() {
  const navigate = useNavigate()
  
  return (
    <>
  
    <div className="w-2/3 flex flex-col justify-center items-center gap-10 p-2 md:p-8">
      
      <p className="text-center font-semibold italic text-white">
        Welcome to Our Virtual Classroom! Experience seamless
        online learning with our innovative platform. Connect, engage, and excel with interactive tools,
        rich resources, and a supportive community of passionate learners.</p>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={() => { navigate('/login/') }}>
        Get Started
      </button>
    </div>
 


</>
  );
}

export default HomeOut;
