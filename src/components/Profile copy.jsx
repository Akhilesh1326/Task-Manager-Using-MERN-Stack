import React, { useState,useContext, useEffect } from 'react';
import axios from "axios"
import { userIdContext } from '../context/context';


const Profile = () => {
    const userIdmain = useContext(userIdContext);
    const userId = userIdmain.setC;
    const [userName, setUsername] = useState("");
    const [todoCount, setTodoCount] = useState(0)

    useEffect(()=>{
        console.log("User Id = ",userIdmain)
        console.log("User Id = ",userId)
        axios.get(`/data/all/todo/${userId}`)
        .then(response=>{
            console.log("Server Response Data = ",response.data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
    },[])

    // useEffect(()=>{
    //     axios.get(`/data/all/event/${userId}`)
    //     .then(response=>{
    //         console.log("Server Response Data = ",response.data)
    //     })
    // })
    // useEffect(()=>{
    //     axios.get(`/data/all/journal/${userId}`)
    //     .then(response=>{
    //         console.log("Server Response Data = ",response.data)
    //     })
    // })

    return (
        <div className="bg-gray-100 min-h-screen py-6">
          <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-blue-500 text-white">
              <h2 className="text-xl font-bold">Your Profile</h2>
              <p className="text-sm">Have a Lovely Day</p>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full mr-4"
                  src="https://via.placeholder.com/150"
                  alt="Profile Picture"
                />
                <div>
                  <h2 className="text-lg font-bold">John Doe's Tasks</h2>
                  <p className="text-sm">Last login: 3 hours ago</p>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold mb-2">Today's Tasks</h3>
                <ul>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <p className="text-gray-800">Finish project proposal</p>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <p className="text-gray-800">Call client for follow-up</p>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <p className="text-gray-800">Review code changes</p>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Upcoming Tasks</h3>
                <ul>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <p className="text-gray-800">Prepare presentation slides</p>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <p className="text-gray-800">Submit weekly report</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Profile;
