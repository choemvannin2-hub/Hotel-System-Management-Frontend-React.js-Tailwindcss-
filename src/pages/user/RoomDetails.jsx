import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getRoomByIdService } from '../../services/roomService';
import { ArrowLeft, CircleAlert, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { addDays, differenceInDays, format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { bookingService } from '../../services/bookingService'; // added createPayment service
import { customToast } from '../../utils/toast';
import { paymentsService } from '../../services/paymentService';
import PaymentPopup from '../../components/common/PaymentPopUp';
import ReceiptPopup from '../../components/common/ReceiptPopUp';

const RoomDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isBooking, setIsBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [bookingData, setBookingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  // date validation
  const minCheckOutDate = checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1);
  const maxCheckInDate = checkOut ? addDays(checkOut, -1) : null;

  // handle price
  const totalDates = (checkIn && checkOut) ? differenceInDays(checkOut, checkIn) : null;
  const totalPrice = (totalDates) ? (totalDates * room.pricePerNight) : (room.pricePerNight);

  // handle book date and guests if user search in properties page
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const urlCheckIn = searchParams.get('checkIn');
    const urlCheckOut = searchParams.get('checkOut');
    const urlGuests = searchParams.get('guest');

    if (urlCheckIn && urlCheckOut) {
      setCheckIn(new Date(urlCheckIn));
      setCheckOut(new Date(urlCheckOut));
    }
    if (urlGuests) {
      setGuests(Number(urlGuests));
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

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      setErrorMsg('Please select Check-in and Check-out dates.');
      return;
    }

    if (!guests || Number(guests) < 1) {
      setErrorMsg("Please enter the number of guests.");
      return;
    }

    if (room.capacity && guests > room.capacity) {
      setErrorMsg(`Number of guests cannot exceed room capacity (${room.capacity}).`);
      return;
    }

    setErrorMsg('');
    
    if (!user) {
      toast.error("Please login before booking!", {
        duration: 4000,
        position: 'top-right',
        className: 'bg-slate-900 text-white rounded-2xl p-4 shadow-2xl text-sm font-medium',
        icon: <CircleAlert className="h-5 w-5 text-sky-500 shrink-0" />,
      });
      navigate('/login', {
        state: { from: location }
      });
      return;
    }

    try {
      setIsBooking(true);
      const bookingResult = await bookingService({
        roomId: Number(room.id),
        checkIn: format(checkIn, "yyyy-MM-dd"),
        checkOut: format(checkOut, "yyyy-MM-dd"),
        guest: Number(guests)
      });

      // Save the returned booking result and reveal payment modal
      setBookingData(bookingResult.body || bookingResult);
      customToast.success(bookingResult.message || "Booking created successfully!");
      setShowPayment(true);
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      customToast.error(error.response?.data?.message || error.message);
    } finally {
      setIsBooking(false);
    }
  };

  const handlePayment = async () => {
    const paymentResult = await paymentsService({
      bookingId: Number(bookingData.id)
    });

    setPaymentData(paymentResult.body || paymentResult);
    customToast.success("Payment completed successfully!");
    setShowPayment(false);
    setShowReceipt(true);  // Open Receipt popup
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

            {/* Check in, Check out, and Guests */}
            <div className='grid pt-4 pb-2 gap-y-2'>
              <div className="grid items-center grid-cols-[30%_70%] lg:grid-cols-[18%_82%]">
                <label htmlFor="check-in" className="text-sm font-medium">Check-in</label>
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

              <div className="grid items-center grid-cols-[30%_70%] lg:grid-cols-[18%_82%]">
                <label htmlFor="check-out" className="text-sm font-medium">Check-out</label>
                <div className="w-full">
                  <DatePicker
                    id="check-out"
                    selected={checkOut}
                    onChange={(date) => {
                      setCheckOut(date);
                      setErrorMsg("");
                    }}
                    selectsEnd
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

              <div className="grid items-center grid-cols-[30%_70%] lg:grid-cols-[18%_82%]">
                <label htmlFor="guests" className="text-sm font-medium">Guests</label>
                <div className="w-full">
                  <input
                    id="guests"
                    type="number"
                    min="1"
                    max={room?.capacity || 10}
                    value={guests}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGuests(val === '' ? '' : parseInt(val, 10));
                      setErrorMsg("");
                    }}
                    onBlur={() => {
                      if (!guests || Number(guests) < 1) {
                        setGuests(1);
                      }
                    }}
                    className="w-full text-[16px] text-gray-600 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-xs font-semibold">{errorMsg}</p>
            )}

            <hr className='text-gray-500/40'/>
          </div>

          <div className='grid gap-y-2 pt-6'>
            <h1 className='text-sm font-medium'>{room?.roomType?.name}</h1>
            <div className='grid grid-cols-[30%_70%]'>
              <div className='grid text-gray-500/95 text-sm'>
                <label>Price Per Night</label>
                <label>{totalDates ? totalDates : 0 } nights</label>
                <label>Guests</label>
                <label>Discount</label>
              </div>
              <div className='grid text-gray-500/95 gap-y-0.5 text-sm'>
                <p>${room?.pricePerNight}</p>
                <p>${totalPrice}</p>
                <p>{guests} guest{guests > 1 ? 's' : ''}</p>
                <p> none</p>
              </div>
            </div>
            <hr className='text-gray-500/40'/>
          </div>

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

        <section className='hidden lg:flex items-center'>
          <Link to={'/properties'} className='text-blue-400 flex text-lg items-center gap-x-1 border rounded-full ps-3 pe-5'>
            <ArrowLeft/> Back
          </Link>
        </section>

        <section className='grid lg:col-start-2 py-3 lg:py-14'>
          <button 
            onClick={handleBooking}
            disabled={isBooking}
            className='bg-blue-600 text-white/90 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50'
          >
            {isBooking ? 'Processing...' : `Book for $${totalPrice}`}
          </button>
        </section>
      </div>

      {/* Render Payment */}
      {showPayment && bookingData && (
        <PaymentPopup
          booking={bookingData}
          onPay={handlePayment}
          onClose={() => setShowPayment(false)}
        />
      )}

      {/* Render Receipt  */}
      {showReceipt && bookingData && (
        <ReceiptPopup
          booking={bookingData}
          payment={paymentData}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </main>
  );
};

export default RoomDetails;