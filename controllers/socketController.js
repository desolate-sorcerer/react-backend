import { getIO } from '../socket/index.js';

const notify = ((req, res) => {
  const { room, message } = req.body;
  const io = getIO();
  io.to(room).emit('notification', { message });
  res.json({ success: true, message: 'Notification sent' });
});


export default {
  notify
};
