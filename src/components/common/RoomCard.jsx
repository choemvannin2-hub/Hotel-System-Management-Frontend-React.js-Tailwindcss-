import { Heart, Star, Users } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const RoomCard = ({ room }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const rating = room?.rating || 9.5
  const originalPrice = room?.pricePerNight ? (room.pricePerNight * 1.3).toFixed(0) : 0
  const location = useLocation()
  const navigate = useNavigate()

  console.log(location.search);
  

  const handleBookNow = () => {
    if (!room?.id) return;

    navigate(`details/${room.id}${location?.search}`);
  };

  return (
    <div className="flex flex-col md:flex-row rounded-3xl bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Photo Section */}
      <div className="relative md:w-72 shrink-0 p-3">
        <button
          type="button"
          aria-label="Add to favorites"
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute right-6 top-6 z-10 p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-all"
        >
          <Heart
            size={20}
            className={isFavorite ? 'text-rose-500 fill-rose-500' : 'text-white'}
          />
        </button>
        <img
          src={room?.photoUrl || '/placeholder-room.jpg'}
          alt={room?.description || 'Room preview'}
          className="w-full h-48 md:h-full object-cover rounded-2xl"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-5 flex-1 gap-4">
        {/* Top Info Header */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
              {room?.description || 'Luxury Room'}
            </h2>
            <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
              <Users size={16} /> Capacity: {room?.capacity || 2} Guests
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 shrink-0 bg-yellow-50 px-2.5 py-1 rounded-full">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-yellow-700">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Amenities */}
        {room?.roomType?.amenities?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2">
              {room?.roomType?.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {room.roomType.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing & Call to Action */}
        <div className="flex items-center justify-between border-t pt-4 mt-auto">
          <div>
            <span className="text-xs text-gray-400 line-through">
              ${originalPrice}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">
                ${room?.pricePerNight}
              </span>
              <span className="text-xs text-gray-500">/ night</span>
            </div>
          </div>

          <button 
            onClick={handleBookNow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors duration-200"
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard