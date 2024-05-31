import React, { useState, useEffect, useContext } from 'react';
import { useHref, Link } from 'react-router-dom';
import axios from 'axios'
import { userIdContext } from  '../context/context';

const Login = () => {
  const changeId = useContext(userIdContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [present, setPresent] = useState(false);
  const [userId, setUserId] = useState(90); // Initialize with null
  const [c,setC] = useState(0);

  useEffect(() => {
    console.log("Updated userId:", userId);
  }, [userId]); // Dependency array ensures this effect only runs when userId changes

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/data/get/login', {
        username,
        password
      });
      
      console.log("Response from backend:", response.data);
      if(response.data.msg === 'present'){
        setLoginMessage("Logged In Successfully")
        
        const userId = response.data.id;
        setUserId(userId);
        changeId.setC = userId;
        setPresent(true)

        console.log("The id = ",userId)
      } else {
        setLoginMessage("Wrong Id or Password")
        setPresent(false)
      }
  
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
    <userIdContext.Provider value={userId}>
    <div className="flex justify-center items-center h-screen bg-gray-900 ">
      <form className="bg-sky-950  rounded px-8 pt-6 pb-8 mb-4 shadow-blue-800 shadow-xl" onSubmit={handleSubmit}>
      {loginMessage && <p className='text-white text-center font-bold '>{loginMessage}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2 text-center" htmlFor="username">
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow-black shadow-md"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 text-sm font-bold mb-2 text-center" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline shadow-black shadow-md  "
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          {present?(
            <>
         <Link
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[20px] shadow-black shadow-md"
            to="/home"
          >
            Go to Home Page
          </Link>

            </>

          ):(
         <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-14 shadow-black shadow-md"
            type="submit"
            onClick={()=>{handleSubmit}}
          >
            Sign In
          </button>
          )}
        </div>
        <p className='font-bold text-white text-center mt-2'>New Here <Link className='text-blue-500' to='/register'>Register</Link> Here</p>
      </form>
      
    </div>
    </userIdContext.Provider>
   </>
  );
};

export default Login;
