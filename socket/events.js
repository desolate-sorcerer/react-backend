const registerSocketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a room
    socket.on('join_room', (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    });

    // Leave a room
    socket.on('leave_room', (room) => {
      socket.leave(room);
      console.log(`User ${socket.id} left room ${room}`);
    });

    // Send message to a room
    socket.on('send_message', (data) => {
      io.to(data.room).emit('receive_message', data);
    });

    // Disconnect event
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default registerSocketEvents;
