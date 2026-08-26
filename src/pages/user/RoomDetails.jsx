import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getRoomByIdService } from '../../services/roomService';
import { ArrowLeft, CircleAlert, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { addDays, differenceInDays } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const RoomDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // current location path
  const [showPayment, setShowPayment] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  // date validation
  const minCheckOutDate = checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1);
  const maxCheckInDate = checkOut ? addDays(checkOut, -1) : null;
  // handle price
  const totalDates = (checkIn && checkOut) ? differenceInDays(checkOut, checkIn) : null
  const totalPrice = (totalDates) ? (totalDates * room.pricePerNight) : (room.pricePerNight)  

  // handle book date if user search in properties page.
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const urlCheckIn = searchParams.get('checkIn');
    const urlCheckOut = searchParams.get('checkOut');

    if (urlCheckIn && urlCheckOut) {
      setCheckIn(new Date(urlCheckIn));
      setCheckOut(new Date(urlCheckOut));
    }
  }, [searchParams]);


  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const response = await getRoomByIdService(id);
        setRoom(response.body);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    getRoomDetails();
  }, [id]);


  const handleBooking = () => {
    // validation check
    if (!checkIn || !checkOut) {
      setErrorMsg('Please select Check-in and Check-out dates.');
      return;
    }
    setErrorMsg('');
    
    // Auth check
    if (!user) {
      toast.error("Please login before booking!", {
        duration: 4000,
        position: 'top-right',
        className: 'bg-slate-900 text-white rounded-2xl p-4 shadow-2xl text-sm font-medium',
        icon: <CircleAlert className="h-5 w-5 text-sky-500 shrink-0" />,
      });
      navigate('/login', {
        state: {
          from: location,
        }
      });
      return;
    }

    // Proceed to payment
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

        {/* Info details side */}
        <section className=''>
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
                    id="check-in"
                    selected={checkIn}
                    onChange={(date) => {
                      setCheckIn(date);
                      setErrorMsg("");
                    }}
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
                    id="check-out"
                    selected={checkOut}
                    onChange={(date) => {
                      setCheckOut(date);
                      setErrorMsg("");
                    }}
                    selectsEnd  //Fixed property for range selection
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

            {/* Error Message display */}
            {errorMsg && (
              <p className="text-red-500 text-xs font-semibold">{errorMsg}</p>
            )}

            <hr className='text-gray-500/40'/>
          </div>

          {/* Bottom part */}
          <div className='grid gap-y-2 pt-6'>
            <h1 className='text-sm font-medium'>{room?.roomType?.name}</h1>
            <div className='grid grid-cols-[30%_70%]'>
              <div className='grid text-gray-500/95 text-sm'>
                <label>Price Per Night</label>
                <label>{totalDates ? totalDates : 0 } nights</label>
                <label>Discount</label>
              </div>
              <div className='grid text-gray-500/95 gap-y-0.5'>
                <p>${room?.pricePerNight}</p>
                <p>${totalPrice}</p>
                <p> none</p>
              </div>
            </div>
            <hr className='text-gray-500/40'/>
          </div>

          {/* Total part */}
          <div className='pt-4'>
            <div className='grid grid-cols-[30%_70%]'>
              <div className='grid font-medium text-sm'>
                <label>TOTAL</label>
              </div>
              <div className='grid font-medium gap-y-0.5'>
                <p> ${totalPrice}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Back button */}
        <section className='hidden lg:flex items-center'>
          <Link to={'/properties'} className='text-blue-400 flex text-lg items-center gap-x-1 border rounded-full ps-3 pe-5'>
            <ArrowLeft/> Back
          </Link>
        </section>

        {/* Button side */}
        <section className='grid lg:col-start-2 py-3 lg:py-14'>
          <button 
            onClick={handleBooking}
            className='bg-blue-600 text-white/90 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50'
          >
            Book for ${totalPrice}
          </button>
        </section>
      </div>
    </main>
  );
};

export default RoomDetails;