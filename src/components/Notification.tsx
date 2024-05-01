import React from "react";

const Notification = () => {
  
  return (
  <div className='flex-col bg-white rounded-md'>
  <p className='font-semibold p-3'>
  My Notification (0)
      </p>
  
      <div className='flex flex-col pt-2 items-start w-full p-2'>
      <p className='text-blue-400'>There are no new notifications</p>
    <button type='button' className='rounded-lg text-slate-600 p-1 m-2 self-end text-16 hover:font-semibold'>Clear</button>
  </div>
</div>)
};

export default Notification;
