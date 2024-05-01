import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

const Chat = () => {
  return (
    <div className='flex-col bg-white rounded-md'>
      <p className='font-semibold p-3'>
        Chats
      </p>

      <div className='flex flex-col pt-2 w-full p-2'>
        <p className='text-gray-400'>You have no active chats yet</p>
      </div>

      <div className='flex flex-row w-full m-2 items-center'>
        <input className='bg-blue-100 rounded-xl p-1 w-3/4 text-center text-white' placeholder='Search'>
        </input>
        <button className='text-xl text-blue-400 self-center mx-4'>
          <FaCirclePlus />
        </button>
      </div>

      <div className='m-4 flex-row'>
        <button type='button' className='rounded-lg text-blue-400 p-3 hover:bg-gray-100 text-start'>My Contacts</button>
        <button type='button' className='rounded-lg text-blue-400 p-3 hover:bg-gray-100 text-start'>Add Contact</button>
      </div>

    </div>)
};

export default Chat;
