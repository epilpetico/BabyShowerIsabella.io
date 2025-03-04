import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Path to the guests data file
const guestsFilePath = path.join(__dirname, 'src', 'data', 'guests.json');

// Function to read guests data
async function readGuestsData() {
  try {
    const data = await fs.readFile(guestsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading guests data:', error);
    return { guests: [] };
  }
}

// Function to write guests data
async function writeGuestsData(data) {
  try {
    await fs.writeFile(guestsFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing guests data:', error);
  }
}

// Socket.io connection
io.on('connection', async (socket) => {
  console.log('A user connected');
  
  // Send current guest list to the newly connected client
  const guestsData = await readGuestsData();
  socket.emit('guestListUpdated', guestsData.guests);
  
  // Handle attendance confirmation
  socket.on('confirmAttendance', async (guestId) => {
    try {
      const guestsData = await readGuestsData();
      
      // Find and update the guest's confirmation status
      const updatedGuests = guestsData.guests.map(guest => {
        if (guest.id === guestId) {
          return { ...guest, confirmed: true };
        }
        return guest;
      });
      
      // Update the data file
      await writeGuestsData({ guests: updatedGuests });
      
      // Broadcast the updated list to all connected clients
      io.emit('guestListUpdated', updatedGuests);
    } catch (error) {
      console.error('Error confirming attendance:', error);
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});