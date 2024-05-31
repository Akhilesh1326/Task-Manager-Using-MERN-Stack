import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { userIdContext } from '../context/context';

const Event = () => {

  const userIdmain = useContext(userIdContext);
  const userId = userIdmain.setC;
  const [maintaintId, setMaintainId] = useState(userId)


  const [eventListWContext, setEventListWContext] = useState([]);
  const [Id, setId] = useState(1);
  const [btnOn, setBtnOn] = useState(true);
  const [eventText, setEventText] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isEventVisible, setIsEventVisible] = useState(false);

  const [refresh, setRefresh] = useState(0)

  const handleEventText = (e) => {
    setEventText(e.target.value);
  };

  const handleEventDate = (e) => {
    setEventDate(e.target.value);
  };

  const [showRemTime, setShowRemtime] = useState([]);

  const getRemTime = (e) => {
    const targetDate = e;
    const targetYear = parseInt(targetDate.substring(0, 4), 10);
    const targetMonth = parseInt(targetDate.substring(5, 7), 10) - 1;
    const targetDay = parseInt(targetDate.substring(8), 10);
  
    const targetDateTime = new Date(targetYear, targetMonth, targetDay);
    const currentDateTime = new Date();
  
    const timeDifference = targetDateTime - currentDateTime;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    // Construct the remaining time string
    const remainingTime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    return remainingTime;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(eventDate)
    try {
      // await handleEvent();
      const resp = await axios.post("/data/get/event", {
        Id,
        maintaintId,
        eventText,
        eventDate,
      });

      console.log("Backend resp = ",resp)
      setEventDate("");
      setEventText("");
      setBtnOn(!btnOn);
      setIsEventVisible(!isEventVisible);
      setRefresh(refresh+1)
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const [serverData, setServerData] = useState([]);
  
  useEffect(()=>{
    axios.get(`/data/event/${maintaintId}`)
    .then(response =>{
      
      setServerData(response.data);

      console.log("Event data for Event = ",response.data)
      console.log("Server data = ",serverData)
      const Index = response.data.length;
      console.log(response.data.length)
      setId(response.data[Index-1].eventId+1)
      console.log("Current Id = ",response.data[Index-1].eventId+1)
    })
    .catch(error =>{
      console.log("Error while fetching data = ",error);
    })
  },[Id,refresh]);

  const handleDeleteEvent = async (eventId) => {
    console.log("Delete event id = ",eventId)
    try {
      // Send DELETE request to backend API to delete the todo with the specified id
      const response = await axios.delete(`/data/get/event/delete/${maintaintId}/${eventId}`);

      console.log("Response from Backend for deletion = ", response);
      console.log(response.status)
      if(response.status===200){
        console.log("refresh the data")
        setRefresh(refresh+1)

      }
      // If the request is successful, update the eventList state to remove the deleted todo
    } catch (error) {
      console.log("Error while deleting todo:", error);
    }
  };
  // const handleEvent = () => {
  //   setEventListWContext([...eventListWContext, { id: Id, Text: eventText, Date: eventDate }]);
  // };

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className='col-span-2 bg-gray-900 h-40'>
          <button className="h-12 ml-[32rem]  px-4 rounded-md bg-blue-500 font-bold my-2 block text-white  shadow-md hover:bg-blue-600 shadow-sky-300" onClick={() => { setBtnOn(!btnOn); setIsEventVisible(!isEventVisible) }}>{isEventVisible ? "Close Form" : "Add Event"}</button>
          {isEventVisible && (
            <>
              <input type="text" className='my-8 ml-60 w-72 border-4 px-1 py-1 rounded-md border-solid outline-none border-blue-500 shadow-md mr-4' placeholder='Event Text' value={eventText} onChange={handleEventText} />
              <input type="date" className='my-8 ml-70 w-72 border-4 px-1 py-1 rounded-md border-solid outline-none border-blue-500 shadow-md mr-4' placeholder='Date' value={eventDate} onChange={handleEventDate} />
              <button className='bg-blue-600 px-3 py-2 rounded-lg font-bold text-white border-solid border-blue-600 border-2 shadow-md hover:bg-blue-700' onClick={handleSubmit}>Submit</button>
            </>
          )}
        </div>
        <div className='bg-black w-screen h-2'></div>
        <div className='col-span-2 bg-gray-900 h-screen'>

        {serverData.map((outer, outerIndex) => (
          <>
          <div key={outerIndex} className="flex items-center justify-between p-4 rounded-lg shadow-md bg-white mx-28 mt-4 shadow-blue-500">
  <div className="flex flex-col  ">
    <h3 className="max-w-[45rem] text-lg font-bold text-gray-800 text-wrap">
      {outer.title}
    </h3>
    <p className="text-sm text-gray-500">{outer.date}</p>
    <p className='text-sm text-gray-500'>Rem Time = {getRemTime(outer.date)}</p>
  </div>
  <button
    type="button"
    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    onClick={() => handleDeleteEvent(outer.eventId)}
  >
    Delete
  </button>
</div>

        </>
      ))}
        </div>
      </div>
    </div>
  )
}

export default Event;
