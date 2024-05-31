import React, { useContext } from 'react';
import { userIdContext } from '../context/context';

const Profile = () => {
  const { userId } = useContext(userIdContext);

  return (
    <div>
      <h1 onClick={()=>console.log("Used id = ",userId)}>User ID: {userId}</h1>
    </div>
  );
};

export default Profile;