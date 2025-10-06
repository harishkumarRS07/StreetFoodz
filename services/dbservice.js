// /src/services/dbService.js
import { ref, set, onValue } from 'firebase/database';
import { db } from './firebase'; // Import the initialized Firebase app

// Function to update hotel data
export const updateHotelData = async (hotelId, hotelData) => {
  const hotelRef = ref(db, 'hotels/' + hotelId);
  try {
    await set(hotelRef, hotelData);
    console.log('Hotel data updated successfully');
  } catch (error) {
    console.error('Error updating hotel data:', error);
  }
};

// Function to fetch hotel data
export const fetchHotelData = (hotelId, callback) => {
  const hotelRef = ref(db, 'hotels/' + hotelId);
  onValue(hotelRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      console.log('No data available');
    }
  });
};
