import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { getRoomByIdService } from '../../services/roomService';
import { Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';

const RoomDetails = () => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const {id} = useParams(); // get dynamic value from parameter path
  const [room, setRoom] = useState({});  
  const [isLoading, setIsLoading] = useState(true);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);


  // Minimum checkout date rule
  const minCheckOutDate = checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1);
  // Maximum checkin date rule
  const maxCheckInDate = checkOut ? addDays(checkOut, -1) : null;

  useEffect(()=>{
    const getRoomDetails = async()=>{
      try {
        const response = await getRoomByIdService(id);
        console.log(response.body);
        
        setRoom(response.body)
      } catch (error) {
        console.error("Fetching error:", error);
      }
      setIsLoading(false);
    }
    getRoomDetails();
  }, [])
  
  if(isLoading){
    return <h1>Loading...</h1>
  }

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: `/properties/details/${room.id}`
        }
      });
      return;
    }

    setShowPayment(true);
  };

  return (
    <main className='p-4 lg:p-12'>
      <div className='grid grid-cols-1 lg:grid-cols-2 p-4 gap-y-6 lg:gap-y-0 shadow-glow-gray lg:shadow-none gap-x-24 rounded-2xl'>
        {/* Image side */}
        <section className='flex justify-center'>
          <img
          src={room?.photoUrl} alt="photo"
          className='rounded-2xl'
          />
        </section>
        {/* info details side */}
        <section className=''>
          {/* top part */}
          <div className='grid gap-y-2'>
            <h1 className='text-2xl font-bold'>{room.description}</h1>
            <p className='flex items-center gap-x-2 font-medium text-sm text-gray-500/80'>
              <Users size={12}/> Capacity: {room.capacity}
            </p>
            {/* Check in and Check out */}
            <div className='grid pt-4 pb-2 gap-y-2'>
              {/* Check-In Row */}
              <div className="grid items-center grid-cols-[30%_70%] lg:grid-cols-[18%_82%]">
                <label htmlFor="check-in" className="text-sm font-medium">
                  Check-in
                </label>
                <div className="w-full">
                  <DatePicker
                    required
                    id="check-in"
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    maxDate={maxCheckInDate}
                    placeholderText="Add date"
                    dateFormat="EEEE, d MMMM yyyy"
                    popperPlacement="bottom-start"
                    popperClassName="-ml-8"
                    inputMode="none"
                    onFocus={(e) => e.target.blur()}
                    wrapperClassName="w-full block"
                    className="w-full text-sm text-gray-600 outline-none cursor-pointer bg-transparent truncate"
                  />
                </div>
              </div>

              {/* Check-Out Row */}
              <div className="grid items-center grid-cols-[30%_70%] lg:grid-cols-[18%_82%]">
                <label htmlFor="check-out" className="text-sm font-medium">
                  Check-out
                </label>
                <div className="w-full">
                  <DatePicker
                    required
                    id="check-out"
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minCheckOutDate}
                    placeholderText="Add date"
                    dateFormat="EEEE, d MMMM yyyy"
                    popperPlacement="bottom-start"
                    popperClassName="-ml-8"
                    inputMode="none"
                    onFocus={(e) => e.target.blur()}
                    wrapperClassName="w-full block"
                    className="w-full text-sm text-gray-600 outline-none cursor-pointer bg-transparent truncate"
                  />
                </div>
              </div>
            </div>
            <hr  className='text-gray-500/40'/>
          </div>
          
          {/* bottom part */}
          <div className='grid gap-y-2 pt-6'>
            <h1 className='text-sm font-medium'>{room?.roomType?.name}</h1>
            <div className='grid grid-cols-[30%_70%]'>
              <div className='grid text-gray-500/95 text-sm'>
                <label htmlFor="">Price Per Night</label>
                <label htmlFor="">{3} nights</label>
                <label htmlFor="">Discount</label>
              </div>
              <div className='grid text-gray-500/95 gap-y-0.5'>
                <p> ${room?.pricePerNight}</p>
                <p> ${(room?.pricePerNight)*3}</p>
                <p> none</p>
              </div>
            </div>
            <hr  className='text-gray-500/40'/>
          </div>

          {/* total part */}
          <div className='pt-4'>
            <div className='grid grid-cols-[30%_70%]'>
              <div className='grid font-medium text-sm'>
                <label htmlFor="">TOTAL</label>
              </div>
              <div className='grid font-medium gap-y-0.5'>
                <p> ${(room?.pricePerNight)*3}</p>
              </div>
            </div>
          </div>
        </section>
        {/* Button side */}
        
        <section className='grid lg:col-start-2 py-3 lg:py-14'>
          <button 
          onClick={handleBooking}
          className='bg-blue-600 text-white/90 py-2 rounded-full hover:bg-blue-700'>
            Book for ${(room?.pricePerNight)*3}
            </button>
        </section>
      </div>
  </main>
  )
}

export default RoomDetails