import React from 'react';

const Route = () => {
  return (
    <div className="flex flex-col justify-center items-center  bg-gray-900 pb-[329px]">
      <div className="text-center">
        <a href="/journal" className="block mb-4 text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 mt-20 bg-black py-4 px-8 rounded-xl">Journal</a>
        <a href="/event" className="block mb-4 text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 bg-black py-4 px-8 rounded-xl">Event</a>
        <a href="/todo" className="block mb-4 text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 bg-black py-4 px-8 rounded-xl">Todo</a>
      </div>
    </div>
  );
};

export default Route;
