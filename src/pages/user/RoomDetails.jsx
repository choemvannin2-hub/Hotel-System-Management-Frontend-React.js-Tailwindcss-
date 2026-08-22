import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getRoomById } from '../../services/roomService';

const RoomDetails = () => {

    const {id} = useParams(); // get dynamic value from parameter path
    const [room, setRoom] = useState({});  
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
      const getRoomDetails = async()=>{
        try {
          const data = await getRoomById(id);
          setRoom(data)
        } catch (error) {
          console.error("Fetching error:", error);
        }
        setIsLoading(false);
      }
      getRoomDetails();
    }, [])
    

  return (
    <main>
      
    </main>
  )
}

export default RoomDetails