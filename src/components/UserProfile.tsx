import React from "react";

const UserProfile = () => {
  return (
    <div className='flex-col bg-white rounded-md'>
      <p className='font-semibold p-3'>
        My Profile
      </p>

      <div className='flex flex-col pt-2 items-start w-full p-2'>
        <button type='button' className='rounded-lg text-black p-2 hover:bg-gray-100 w-full text-start '>Manage Your Account</button>
        <button type='button' className='rounded-lg text-black  p-2 hover:bg-gray-100 w-full text-start'>Personal Info</button>
        <button type='button' className='rounded-lg text-black  p-2 hover:bg-gray-100  w-full text-start'>Contact Info</button>
        <button type='button' className='rounded-lg text-slate-600 p-1 w-16  m-2 self-end text-16 hover:font-semibold'>Logout</button>
      </div>
    </div>
  )
};

export default UserProfile;
