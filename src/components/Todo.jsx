import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { userIdContext } from '../context/context';


const Todo = () => {
  const userIdmain = useContext(userIdContext);
  const userId = userIdmain.setC;
  const [maintaintId, setMaintainId] = useState(userId)
  const [eventList, setEventList] = useState([]);
  const [id, setId] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [eventText, setEventText] = useState("");
  const [refresh, setRefresh] = useState(0)

  const handleEventText = (e) => {
    setEventText(e.target.value);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    setId(id + 1); // Incrementing id
    console.log("user id = ",userId) 
    console.log("user id todo vala = ",id) 

    try {
      const response = await axios.post("/data/get/todo", {
        id,
        userId,
        eventText
      });

      console.log("Response from Backend = ", response);
      // Update eventList with the newly added todo
      // setEventList([...eventList, { id, text: eventText }]);

    } catch (error) {
      console.log("Error while sending data to Backend = ", error);
    }
    setEventText("");
    setIsFormVisible(false);
  };

  const handleDeleteTodo = async (eventId) => {
    console.log("Delete event id = ",eventId)
    try {
      // Send DELETE request to backend API to delete the todo with the specified id
      const response = await axios.delete(`/data/get/todo/delete/${userId}/${eventId}`);

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
  

  const [serverData, setServerData] = useState([]);
  useEffect(() => {
    axios.get(`/data/todo/${maintaintId}`)
      .then(response => {
        setServerData(response.data);
        // Setting id based on the length of existing todos
        console.log("userevffec = ",response.data)

        const getIndex = response.data[0].length;
        setId(response.data[0][getIndex-1].todoId+1);

        // console.log("data that got",response.data[0][getIndex-1].eventId+1)
        // console.log("litral = ",response.data[0].length + 2)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id,refresh]);
  

  return (
    <div className="container mx-auto mt-10 bg-white h-screen ">
      <div className="flex justify-center items-center ">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? "Close Form" : "Add Todo"}
        </button>
      </div>
      {isFormVisible && (
        <div className="mt-6 bg-gray-200 p-4 rounded mx-8 shadow-black shadow-md">
          <input type="text" className=" block w-full rounded border border-gray-300 p-2 mb-2" placeholder="Write Todo Here" value={eventText} onChange={handleEventText} />
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={handleEventSubmit}>
            Add Todo
          </button>
        </div>
      )}
      <div className="mt-6">
        {serverData.map((outer, outerIndex) => (
          <div key={outerIndex} className="p-4 mb-2 rounded mx-10">
            {outer.map((inner, innerIndex) => (
              <div key={innerIndex} className="flex items-center my-2 border-2 shadow-black shadow-md px-4 py-2 text-lg rounded-lg bg-gray-200 text-black">
                <input type="checkbox" className="mr-2 "/>
                <div className="font-bold">{inner.todoText}</div>
                <button className="ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded" onClick={() => handleDeleteTodo(inner.todoId)}>Delete</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
