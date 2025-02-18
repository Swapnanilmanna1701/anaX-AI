import React from 'react';

const Input = () => {
  return (
    <div>
      <input className="bg-transparent text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-xl ml-5 mr-20 px-12 py-3 shadow-md focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500" autoComplete="off" placeholder="Search here..." name="text" type="text" />
      
    </div>
  );
}

export default Input;
