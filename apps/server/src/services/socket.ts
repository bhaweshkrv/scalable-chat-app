import { Server } from 'socket.io';
import Redis from 'ioredis';

const redisConfig = {
  host: 'redis-test-test505.a.aivencloud.com',
  port: 18860,
  username: 'default',
  password: 'AVNS_m4jk90d1EMd0ffdqo4w',
};

const pub = new Redis(redisConfig);
const sub = new Redis(redisConfig);

class SocketService {
  private _io: Server;

  constructor() {
    console.log('Init Socket Service...');
    this._io = new Server({
      cors: {
        allowedHeaders: ['*'],
        origin: '*',
      },
    });
    sub.subscribe('MESSAGES');
  }

  public initListeners() {
    const io = this.io;
    console.log('Init Socket Listeners...');

    io.on('connect', (socket) => {
      console.log(`New Socket Connected`, socket.id);
      socket.on('event:message', async ({ message }: { message: string }) => {
        console.log('New Message Rec.', message);
        // publish this message to redis
        await pub.publish('MESSAGES', JSON.stringify({ message }));
      });
    });

    sub.on('message', (channel, message) => {
      if (channel === 'MESSAGES') {
        console.log('new message from redis', message);
        io.emit('message', message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
