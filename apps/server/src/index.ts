import dotenv from 'dotenv';
import http from 'http';
import SocketService from './services/socket';

dotenv.config();

function init() {
  const socketService = new SocketService();
  const server = http.createServer();
  const PORT = process.env.PORT ?? 5000;

  socketService.io.attach(server);

  server.listen(PORT, () => {
    console.log(`🟢 Server running on port ${PORT}`);
  });

  socketService.initListeners();
}

init();
