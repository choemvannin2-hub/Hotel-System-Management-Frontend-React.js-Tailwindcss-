import React, { useEffect, useState } from 'react';
import { getRooms } from '../../services/roomService';
import RoomCard from '../../components/user/RoomCard';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
    try {
        setError(null);
        const data = await getRooms();
        
        setRooms(data)
        console.log(data);
    } catch (err) {
        console.error('Failed to fetch rooms:', err);
        setError('Unable to load rooms. Please try again later.');
    } finally {
        setLoading(false);
    }
    };
    loadRooms();
  }, []);


  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadRooms}>Retry</button>
      </div>
    );
  }

  return (
    <div className='p-12'>
      <h1>Rooms</h1>

      <div className='grid gap-y-4'>
        {
          rooms.map(( room ) => (
            <RoomCard key={room.id} room={room} />
          ))
        }
      </div>

    </div>
  );
};

export default Rooms;