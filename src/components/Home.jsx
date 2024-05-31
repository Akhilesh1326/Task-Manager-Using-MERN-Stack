import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userIdContext } from '../context/context';
import { useContext, useState } from 'react';
import axios from "axios"

const Home = () => {
  const userIdmain = useContext(userIdContext);
  const userId = userIdmain.setC;
  const [maintaintId, setMaintainId] = useState(userId)
  const [eventCount, setEventCount] = useState(0)
  const [todoCount, setTodoCount] = useState(0)
  const [journalCount, setJournalCount] = useState(0)
  const [name, setName] = useState("");
  useEffect(()=>{
    axios.get(`/data/name/${maintaintId}`)
    .then(response =>{
      console.log("Resopoze = ",response.data[0])
      setName(response.data[0].name)
    })
    .catch(err=>{
      console.log("Error while retriving the name - ",err)
    })
  },[])
  useEffect(()=>{
    axios.get(`/data/all/event/${maintaintId}`)
    .then(response =>{
      console.log("Resopoze for event = ",response.data)

      setEventCount(response.data.count);
    })
    .catch(err=>{
      console.log("Error while retriving the name - ",err)
    })
  },[])
  useEffect(()=>{
    axios.get(`/data/all/todo/${maintaintId}`)
    .then(response =>{
      console.log("Resopoze for todo = ",response.data)

      setTodoCount(response.data.count);
    })
    .catch(err=>{
      console.log("Error while retriving the name - ",err)
    })
  },[])
  useEffect(()=>{
    axios.get(`/data/all/journal/${maintaintId}`)
    .then(response =>{
      console.log("Resopoze for journal = ",response.data)

      setJournalCount(response.data.count);
    })
    .catch(err=>{
      console.log("Error while retriving the name - ",err)
    })
  },[])


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">

      <h1 className="text-4xl font-bold mb-8 mt-10">Hello <p className='inline text-blue-500'>{name}</p>..!</h1>
      <h1 className="text-4xl font-bold mb-8">Welcome to Your Task Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/todo" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-lg shadow-blue-800">
          Todo <p className='text-center'>{todoCount}</p>
        </Link>
        <Link to="/event" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-lg shadow-blue-800">
          Event <p className='text-center'>{eventCount}</p>
        </Link>
        <Link to="/journal" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-lg shadow-blue-800">
          Journal <p className='text-center'>{journalCount}</p>
        </Link>
      </div>
      <p className='mt-40'>Developed By Akhilesh Pimple With &#9829;</p>
    </div>
  );
};

export default Home;
