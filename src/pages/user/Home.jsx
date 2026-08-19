import React, { useState } from 'react';
import { CircleDollarSign, Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format, setDate, setDay } from 'date-fns'; // for format date

import slideimage from '../../assets/room slide bar.jpg';
import view1 from '../../assets/view1.jpg';
import view2 from '../../assets/view2.jpeg';
import view3 from '../../assets/view3.jpg';
import view4 from '../../assets/view4.jpg';
import view5 from '../../assets/view5.jpg';
import view6 from '../../assets/view6.jpg';

const Home = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const checkInFormatted = checkIn ? format(checkIn, "yyyy-MM-dd") : null;
  const checkOutFormatted = checkOut ? format(checkOut, "yyyy-MM-dd") : null;
  
  console.log(checkInFormatted);
  console.log(checkOutFormatted);
  

  // FIXED: check out atleast greater than check in 1 day
  const checkOutMinDate = checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1);

  return (
    <main className="pt-3 py-14 max-w-7xl mx-auto px-4 lg:px-0">
      {/* Hero Banner Container */}
      <div className="relative h-56 md:h-80 w-full shadow-xl rounded-3xl">
        <img 
          className="absolute inset-0 w-full h-full object-cover rounded-3xl" 
          src={slideimage} 
          alt="Room slider preview"
        />
        
        {/* Banner Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="bg-blue-900/40 backdrop-blur-sm px-6 lg:px-10 py-4 lg:py-6 rounded-2xl border border-white/20">
            <h1 className="text-white font-extrabold text-lg lg:text-4xl leading-tight tracking-tight drop-shadow-md">
              Book your stay at Phnom Penh<br />
              <span className="text-blue-200 text-xs lg:text-2xl font-bold">Welcome to our hotel, book now!</span>
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute flex items-center justify-between bg-white rounded-full -bottom-8 py-3 px-4 lg:px-8 shadow-lg w-[95%] max-w-3xl left-1/2 -translate-x-1/2 border border-gray-100 gap-2 z-10">
          
          <div className="border-r border-gray-200 hidden lg:block pr-4 flex-1">
            <h1 className="font-semibold text-xs lg:text-sm text-gray-800">Location</h1>
            <input 
              type="text" 
              placeholder="Where are you going?" 
              className="border-0 outline-none text-xs text-gray-600 w-full placeholder-gray-400" 
            />
          </div>

          <div className="border-r border-gray-200 pr-2 lg:pr-4 flex-1">
            <h1 className="font-semibold text-xs lg:text-sm text-gray-800">Check-in</h1>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              placeholderText="Add date"
              dateFormat="dd-MMM-yy"
              popperPlacement="bottom-start"
              inputMode="none"
              onFocus={(e) => e.target.blur()}
              className="touch-none text-xs text-gray-600 outline-none cursor-pointer w-full bg-transparent"
            />
          </div>

          <div className="border-r border-gray-200 pr-2 lg:pr-4 flex-1">
            <h1 className="font-semibold text-xs lg:text-sm text-gray-800">Check-out</h1>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkOutMinDate}
              placeholderText="Add date"
              dateFormat="dd-MMM-yy"
              popperPlacement="bottom-start"
              inputMode="none"
              onFocus={(e) => e.target.blur()}
              className="touch-none text-xs text-gray-600 outline-none cursor-pointer w-full bg-transparent"
            />
          </div>

          <div className="pr-2 flex-1">
            <h1 className="font-semibold text-xs lg:text-sm text-gray-800">Guests</h1>
            <input 
              type="number" 
              min="1" 
              placeholder="1 guest" 
              className="border-0 outline-none text-[16px] lg:text-xs text-gray-600 w-full bg-transparent placeholder-gray-400" 
            />
          </div>

          <div>
            <button 
              aria-label="Search Rooms" 
              className="bg-blue-700 p-2.5 lg:p-3.5 rounded-full hover:bg-blue-800 transition shadow-md flex items-center justify-center shrink-0"
            >
              <Search className="text-white" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Hotel Views Gallery */}
      <section className="pt-20 pb-14">
        <div>
          <h2 className="text-base lg:text-xl font-bold text-gray-800">Hotel Views</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          <Link to="/properties" className="relative group overflow-hidden rounded-2xl">
            <img className="w-full h-full object-cover transition transform group-hover:scale-105 duration-300" src={view1} alt="Hotel view 1" />
            <p className="absolute bottom-3 left-3 text-xs lg:text-sm font-medium px-3 py-1 rounded-xl bg-white/80 backdrop-blur-md text-gray-800">Phnom Penh</p>
          </Link>

          <div className="flex flex-col gap-3">
            <Link to="/properties" className="relative group overflow-hidden rounded-2xl flex-1">
              <img className="w-full h-full object-cover transition transform group-hover:scale-105 duration-300" src={view2} alt="Hotel view 2" />
              <p className="absolute bottom-3 left-3 text-xs lg:text-sm font-medium px-3 py-1 rounded-xl bg-white/80 backdrop-blur-md text-gray-800">Phnom Penh</p>
            </Link>
            <Link to="/properties" className="relative group overflow-hidden rounded-2xl flex-1">
              <img className="w-full h-full object-cover transition transform group-hover:scale-105 duration-300" src={view3} alt="Hotel view 3" />
              <p className="absolute bottom-3 left-3 text-xs lg:text-sm font-medium px-3 py-1 rounded-xl bg-white/80 backdrop-blur-md text-gray-800">Phnom Penh</p>
            </Link>
          </div>

          <Link to="/properties" className="relative group overflow-hidden rounded-2xl">
            <img className="w-full h-full object-cover transition transform group-hover:scale-105 duration-300" src={view4} alt="Hotel view 4" />
            <p className="absolute bottom-3 left-3 text-xs lg:text-sm font-medium px-3 py-1 rounded-xl bg-white/80 backdrop-blur-md text-gray-800">Phnom Penh</p>
          </Link>

          <div className="flex flex-col gap-3">
            <Link to="/properties" className="relative group overflow-hidden rounded-2xl flex-1">
              <img className="w-full h-full object-cover transition transform group-hover:scale-105 duration-300" src={view5} alt="Hotel view 5" />
              <p className="absolute bottom-3 left-3 text-xs lg:text-sm font-medium px-3 py-1 rounded-xl bg-white/80 backdrop-blur-md text-gray-800">Phnom Penh</p>
            </Link>
            <Link to="/properties" className="relative group overflow-hidden rounded-2xl flex-1">
              <img className="w-full h-full object-cover transition transform group-hover:scale-105 duration-300" src={view6} alt="Hotel view 6" />
              <p className="absolute bottom-3 left-3 text-xs lg:text-sm font-medium px-3 py-1 rounded-xl bg-white/80 backdrop-blur-md text-gray-800">Phnom Penh</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Sign Up Banner */}
      <section className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 bg-white shadow-md border border-gray-100 rounded-2xl px-6 py-4">
        <div className="flex gap-4 items-center">
          <CircleDollarSign size={36} className="text-blue-600 shrink-0" />
          <div>
            <h3 className="font-bold text-sm lg:text-base text-gray-800">Pssst!</h3>
            <p className="text-xs lg:text-sm text-gray-600">
              Do you want to get secret offers and best prices for amazing stays?
            </p>
            <p className="text-xs lg:text-sm text-gray-500">Sign up to join our Travel Club!</p>
          </div>
        </div>

        <Link 
          to="/login" 
          className="text-xs lg:text-sm font-semibold text-blue-600 border border-blue-600 rounded-xl py-2 px-5 hover:bg-blue-600 hover:text-white transition shrink-0"
        >
          Sign up for bookings
        </Link>
      </section>
    </main>
  );
};

export default Home;