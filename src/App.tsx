import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Header from './components/Header';
import GuestList from './components/GuestList';
import GiftList from './components/GiftList';
import Footer from './components/Footer';
import guestsData from './data/guests.json';
import giftsData from './data/gifts.json';

// Initialize socket connection
const socket = io('http://localhost:3001');

function App() {
  const [guests, setGuests] = useState(guestsData.guests);
  const [gifts] = useState(giftsData.gifts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to the server
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    // Listen for updated guest list
    socket.on('guestListUpdated', (updatedGuests) => {
      setGuests(updatedGuests);
    });

    // Disconnect when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleConfirmAttendance = (guestId) => {
    socket.emit('confirmAttendance', guestId);
  };

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <GuestList 
            guests={filteredGuests} 
            onConfirm={handleConfirmAttendance} 
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
            isConnected={isConnected}
          />
        </section>
        
        <section className="mb-16">
          <GiftList gifts={gifts} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;