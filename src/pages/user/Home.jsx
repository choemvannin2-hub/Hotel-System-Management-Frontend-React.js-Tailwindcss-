import React, { useState } from 'react'; // 1. Added useState import
import { Bold, Search } from 'lucide-react';
import slideimage from '../../assets/room slide bar.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  return (
    <main className="py-3 max-w-7xl mx-auto">
      {/* Container - maintains the rounded corners */}
      <div className="relative h-50 md:h-70 w-full shadow-xl">
        
        <img 
          className="absolute inset-0 w-full h-full object-cover rounded-3xl" 
          src={slideimage} 
          alt="Room slider preview"
        />
        {/* Text Into  */}
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="bg-blue-900/30 backdrop-blur-[3px] lg:backdrop-blur-sm px-10 py-6 rounded-2xl border border-white/20">
            <h1 className="text-white font-extrabold text-md lg:text-4xl leading-tight tracking-tight drop-shadow-md">
              Book your stay at Phnom Penh<br />
              <span className="text-blue-200 text-xs lg:text-2xl font-bold">Welcome to our hotel, book now! </span>
            </h1>
          </div>
        </div>

        {/* Search and find rooms */}
        <div className='absolute flex items-center justify-evenly lg:justify-between bg-white rounded-4xl -bottom-8 py-2 max-w-90 lg:max-w-3xl px-3 lg:px-8 shadow-md w-full left-1/2 -translate-x-1/2'>
        
          <div className='border-r  border-gray-200 hidden lg:block'>
            <h1 className='font-semibold text-xs lg:text-sm'>Location</h1>
            <input type="text" placeholder='Where are you going?' className='border-0 outline-0 text-[10px] lg:text-xs ' />
          </div>

          <div className='border-r  border-gray-200'>
            <h1 className='font-semibold text-xs lg:text-sm'>Check-in</h1>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              placeholderText="Add date"
              dateFormat="dd-MMM-yy"
              popperPlacement='bottom-end'
              inputMode="none"
              onFocus={(e) => e.target.blur()}
              className="text-[14px] lg:text-xs text-gray-500 outline-none cursor-pointer w-20 lg:w-24"
            />
          </div>

          <div className='border-r  border-gray-200'>
            <h1 className='font-semibold text-xs lg:text-sm'>Check-out</h1>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              placeholderText="Add date"
              dateFormat="dd-MMM-yy"
              popperPlacement='bottom-end'
              inputMode="none"
              onFocus={(e) => e.target.blur()}
              className="text-[14px] lg:text-xs text-gray-500 outline-none cursor-pointer w-20 lg:w-24"
            />
          </div>

          <div className='w-20'>
            <h1 className='font-semibold text-xs lg:text-sm'>Guests</h1>
            <input type="text" placeholder='guests' className='border-0 max-w-20 outline-0 text-base lg:text-xs ' />
          </div>

          <div className=''>
            <button className='bg-blue-700 p-2 lg:p-4 rounded-full hover:bg-blue-800 transition'>
              <Search className='text-white font-bold' size={20} />
            </button>
          </div>
        </div>

      </div>

      {/* Section below */}
      <section className='pt-12'>

      </section>
    </main>
  );
};

export default Home;