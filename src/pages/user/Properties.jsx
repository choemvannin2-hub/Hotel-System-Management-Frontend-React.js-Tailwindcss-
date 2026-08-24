import { addDays, format } from 'date-fns';
import { ArrowLeft, CalendarCheck, CalendarX, MapPin, Users, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAvailableRoomsService, getRoomsService } from '../../services/roomService';
import RoomCard from '../../components/common/RoomCard';
import RoomLoading from '../../components/common/RoomLoading';

const Properties = () => {
  // Local form state
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guest, setGuest] = useState("1");
  const [sort, setSort] = useState('');
  const [title, setTitle] = useState('All Properties');

  // Data fetching
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Sync URL parameters with local state & fetch data when URL changes
  useEffect(() => {
    const urlLocation = searchParams.get('location') || '';
    const urlCheckIn = searchParams.get('checkIn');
    const urlCheckOut = searchParams.get('checkOut');
    const urlGuest = searchParams.get('guest') || '1';

    // parse date strings into Date objects for DatePicker
    const parsedCheckIn = urlCheckIn ? new Date(urlCheckIn) : null;
    const parsedCheckOut = urlCheckOut ? new Date(urlCheckOut) : null;

    setDestination(urlLocation);
    setCheckIn(parsedCheckIn);
    setCheckOut(parsedCheckOut);
    setGuest(Number(urlGuest));

    // Update main header title
    if (parsedCheckIn && parsedCheckOut) {
      const inFormatted = format(parsedCheckIn, 'MMM d');
      const outFormatted = format(parsedCheckOut, 'MMM d');
      setTitle(`${inFormatted} - ${outFormatted}, ${urlGuest} ${Number(urlGuest) > 1 ? 'guests' : 'guest'}`);
    } else {
      setTitle('All Properties');
    }


    // LOAD ALL ROOMS
    const loadRooms = async () => {
      try {
        setIsLoading(true);
        
        const data = await getRoomsService();
        const result = data?.body ?? data;

        setRooms(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error(error);
        navigate('/errorServer');
      } finally {
        setIsLoading(false);
      }
    }

    
    // Fetch available rooms
    const findAvailableRooms = async () => {
      setIsLoading(true);
      try {
        const response = await getAvailableRoomsService({
          checkIn: urlCheckIn,
          checkOut: urlCheckOut,
          guest: urlGuest,
        });
        setRooms(response.body);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        navigate('/errorServer');
      } finally {
        setIsLoading(false);
      }
    };


    // Only search availability if dates were provided
    if ((urlCheckIn && urlCheckOut) || urlGuest) {
        findAvailableRooms();
    } else{
      loadRooms();
    }
  }, [searchParams, navigate]);

  // Sort method
  const sortedRooms = [...rooms].sort((a,b) => {
    if (sort === 'price-asc') {
      return Number(a.pricePerNight) - Number(b.pricePerNight);
    }

    if (sort === 'price-desc') {
      return Number(b.pricePerNight) - Number(a.pricePerNight)
    }

    return 0;
  });

  // Minimum checkout date rule
  const minCheckOutDate = checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1);
  // Maximum checkin date rule
  const maxCheckInDate = checkOut ? addDays(checkOut, -1) : null;

  // Update URL search params when user submits a new search
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (destination) params.set('location', destination);
    if (checkIn) params.set('checkIn', format(checkIn, 'yyyy-MM-dd'));
    if (checkOut) params.set('checkOut', format(checkOut, 'yyyy-MM-dd'));
    if (guest) params.set('guest', guest.toString());

    setSearchParams(params);
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[30%_70%]">
      {/* Search Sidebar / Dropdown Container */}
      <section className="py-6 lg:py-8 px-14 bg-black/5 border-r border-gray-300">
        <Link to="/">
          <ArrowLeft strokeWidth={3} className="cursor-pointer lg:mb-4" />
        </Link>

        {/* Collapsible Search Accordion */}
        <details open className="group">
          <summary className="flex border-b border-gray-400 pb-2 items-center justify-between font-bold text-lg pt-4 cursor-pointer list-none select-none">
            <span>Your search</span>
            <ChevronDown size={28} color='blue' className="block lg:hidden transition-transform duration-200 group-open:rotate-180 text-gray-600 animate-bounce group-open:animate-none" />
          </summary>

          <div className="grid grid-cols-1 gap-y-3 lg:gap-y-4 pt-4">
            {/* Destination */}
            <div className="hidden lg:grid gap-y-3">
              <label htmlFor="destination" className="text-sm font-medium">
                Destination
              </label>
              <div className="flex items-center gap-x-2 bg-white px-4 py-2 rounded-full border border-gray-200">
                <MapPin size={18} className="text-gray-500 shrink-0" />
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  className="text-[16px] outline-none w-full bg-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Check In */}
            <div className="grid gap-y-3">
              <label htmlFor="check-in" className="text-sm font-medium">
                Check-in date
              </label>
              <div className="flex items-center gap-x-2 bg-white px-4 py-2 rounded-full border border-gray-200">
                <CalendarCheck size={18} className="text-gray-500 shrink-0" />
                <DatePicker
                  id="check-in"
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={new Date()}
                  maxDate={maxCheckInDate}
                  placeholderText="Add date"
                  dateFormat="MMMM d, yyyy"
                  popperPlacement="bottom-start"
                  popperClassName="-ml-8"
                  inputMode="none"
                  onFocus={(e)=> e.target.blur()}
                  className="touch-none text-sm text-gray-600 outline-none cursor-pointer w-full bg-transparent"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="grid grid-cols-1 gap-y-3">
              <label htmlFor="check-out" className="text-sm font-medium">
                Check-out date
              </label>
              <div className="flex items-center gap-x-2 bg-white px-4 py-2 rounded-full border border-gray-200">
                <CalendarX size={18} className="text-gray-500 shrink-0" />
                <DatePicker
                  id="check-out"
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={minCheckOutDate}
                  placeholderText="Add date"
                  dateFormat="MMMM d, yyyy"
                  popperPlacement="bottom-start"
                  popperClassName="-ml-8"
                  inputMode="none"
                  onFocus={(e)=> e.target.blur()}
                  className="touch-none text-sm text-gray-600 outline-none cursor-pointer w-full bg-transparent"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="grid gap-y-3">
              <label htmlFor="guest" className="text-sm font-medium">
                Guests
              </label>
              <div className="flex items-center gap-x-2 bg-white px-4 py-2 rounded-full border border-gray-200">
                <Users size={18} className="text-gray-500 shrink-0" />
                <input
                  id="guest"
                  type="number"
                  min="1"
                  value={guest}
                  onChange={(e) => setGuest(e.target.value)}
                  onBlur={() => {
                      if (guest === "" || Number(guest) < 1) {
                          setGuest("1");
                      }
                  }}
                  placeholder="1 guest"
                  className="text-[16px] outline-none w-full bg-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="grid justify-center mt-6">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-26 lg:px-37 py-2 rounded-full font-medium hover:bg-blue-700 cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        </details>
      </section>

      {/* Properties Display Side */}
      <section className="py-8 px-12">
        {/* Header */}
        <header className=''>
          <p className="text-sm text-gray-500">search result for</p>
          <div className="grid lg:grid-cols-2 items-center">
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            {/* Sort function */}
            <div className="text-end ">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="outline-none border mt-6 lg:mt-0 border-gray-400 px-4 py-1 rounded-full text-gray-700 cursor-pointer"
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </header>

        {/* Room List */}
        <main className="grid grid-cols-1 gap-y-4 py-6">
          {isLoading ? (
            [...Array(2)].map((_, index) => <RoomLoading key={index} />)
          ) : rooms.length > 0 ? (
            sortedRooms.map((room) => <RoomCard key={room.id} room={room} />)
          ) : (
            <div className="py-12 text-center text-gray-500">
              No properties match your search criteria.
            </div>
          )}
        </main>
      </section>
    </main>
  );
};

export default Properties;