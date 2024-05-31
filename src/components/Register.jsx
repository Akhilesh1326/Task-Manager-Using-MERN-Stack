import React, { useState, useContext } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import { userIdContext } from '../context/context';



const Register = () => {
  const changeId = useContext(userIdContext);
  
  const [repeat, setRepeat] = useState(true)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/data/get/register', {
        name,
        email,
        password,
        gender 
      });
  
      console.log("Response from backend:", response.data);
      if(response.data.msg === "Data Repeatation") {
        setRegistrationMessage("Name Already Taken");
        setRepeat(true)
      } else { 
        setRegistrationMessage("Registration successful!");
        console.log("Response from backend:", response.data.userId.id);
        changeId.setC = response.data.userId.id;

        
        // changeId.setC = userId;
        setRepeat(false)
      } 
  
      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
      setGender("");
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form className="bg-sky-950 rounded px-8 pt-6 pb-8 mb-4 shadow-blue-800 shadow-xl" onSubmit={handleSubmit}>
      {registrationMessage && <p className='text-white text-center font-bold '>{registrationMessage}</p>}
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2 text-center" htmlFor="name" >
            UserName
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow-black shadow-md"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2 text-center" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow-black shadow-md"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2 text-center" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow-black shadow-md"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2 text-center" htmlFor="gender">
            Gender
          </label>
          <select
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow-black shadow-md"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
            {repeat?(
              <>
        <div className="flex items-center justify-between">
         <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-14 shadow-black shadow-md"
            type="submit"
            onClick={()=>{handleSubmit, console.log("submiteed")}}
            >
            Register
          </button>
              </div>
          <p className='text-white'>Already Registered <Link to="/login"  className='text-sky-300'>Login</Link> Here </p>
                </>
            ):(
         <Link
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline ml-[20px] shadow-black shadow-md"
            to='/login'
            >
            Go To Login Page
          </Link>
              
            )}
      
      </form>
      
    </div>
  );
};

export default Register;
