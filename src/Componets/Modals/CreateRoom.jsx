import React, { useState } from 'react'

function CreateRoom({ isOpen, onClose}) {

  const [topics, setTopics] = useState([
    { id: 1, title: 'Topic 1', description: 'Description for Topic 1' },
    { id: 1, title: 'Topic 1', description: 'Description for Topic 1' },
    { id: 1, title: 'Topic 1', description: 'Description for Topic 1' }
  ]);
  const [topic, settopic] = useState();
  const [discription, setdiscription] = useState();


  const addTopic = () => {
    const newTopic = {
      id: topics.length + 1,
      title: `New Topic ${topics.length + 1}`,
      description: '',
    };
    setTopics([...topics, newTopic]);
  };


  const editTopic = (id, newTitle, newDescription) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === id ? { ...topic, title: newTitle, description: newDescription } : topic
      )
    );
  };

  const removeTopic = (id) => {
    setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id));
  };


  if (!isOpen) return null;
  return (
    <div className="fixed z-10  inset-0 overflow-y-auto">
      <div className="flex items-center  justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="z-50 bg-slate-900 p-6 flex flex-col   justify-center rounded shadow-lg w-1/3">
          <h1 className="text-lg text-white text-center font-semibold mb-4">Create Class room</h1>
          
          <label className='text-white text-left' htmlFor="subject">Subject:</label>
          <input placeholder='Subject' 
           name='subject'
           id='subject'
          className={'h-10 w-full text-white focus:outline-0 mb-4 bg-dark-primary p-3 rounded-md'}
          required/>

          {topics.map((topic)=>(<button style={{'display':'inline'}} className='flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative'>
      {topic.title}
      <span className="absolute  right-1 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </button>))}
          <label className='text-white text-left' htmlFor="topic">Topic:</label>
          <input placeholder='Topic' 
           name='topic'
           id='topic'
          className={'h-10 w-full text-white focus:outline-0 mb-4 bg-dark-primary p-3 rounded-md'}
          required/>

          <label htmlFor="description" className='text-white text-left'>Description:</label>
          <textarea placeholder='Description'  
          name='description'
          id='description'
          className={'h-10 w-full text-white focus:outline-0 mb-4 bg-dark-primary p-3 rounded-md'}
          size="60"
          
          style={{
            minHeight: '120px', 
            fontSize: '16px',
           
          }}
          required/>




        </div>
      </div>
    </div>
  )
}

export default CreateRoom