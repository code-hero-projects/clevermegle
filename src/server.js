import { WebSocketServer } from 'ws';
import { DataMessageType, NewConnectionMessageType, WebSocketPort } from './consts.js';

const server = new WebSocketServer({ port: WebSocketPort });

const socketConnections = {};

const newConnectionMessageHandler = (message, socket) => {
  const { from } = message;
  console.log('received connection message from: ' + from);
  socketConnections[from] = socket;
};

const dataMessageHandler = (message) => {
  const { to, data } = message;
  console.log('delivering data message to: ' + to);
  socketConnections[to].send(data);
};

const messageHandlers = {
  [NewConnectionMessageType]: newConnectionMessageHandler,
  [DataMessageType]: dataMessageHandler
};

server.on('connection', socket => {
  console.log('connection was established');
  socket.on('message', (rawMessage) => {
    const message = JSON.parse(rawMessage);
    const handler = messageHandlers[message.type];
    handler(message, socket);
  })
});