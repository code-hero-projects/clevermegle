import { WebSocketServer } from 'ws';

const webSocketPort = 8080;

const server = new WebSocketServer({ port: webSocketPort });

server.on('open', () => console.log('websocket opened'));

server.on('connection', socket => {
  console.log('connection was established');

  socket.on('message', (message) => {
    console.log('new message: ' + message);
    socket.send('ack');
  })
});