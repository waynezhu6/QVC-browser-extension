// handle communication with socket server

// const SERVER_ADDR = "http://localhost:5000";
// const IO_CONFIG = {};
const SERVER_ADDR = "https://waynezhu.ca";
const IO_CONFIG = {path: "/qvc/socket.io"}
var socket; // our socket connection
var player; // reference to the HTMLVideoElement to hook onto

function connect(){
  // establish socket connection to server
  if(socket){
    socket.disconnect();
    socket = null;
  }

  socket = io.connect(SERVER_ADDR, IO_CONFIG);
  setSocketEventHandlers(socket);
}

function joinSession(username, room, password){
  // join a video viewing session
  connect();
  socket.emit('joinRoom', {room, username, password});
}

function createSession(username, room, password){
  connect();
  socket.emit('createRoom', {room, username, password});
}

function leaveSession(){
  if(socket){
    socket.disconnect();
    socket = null;
  }
  player = null;
}

function play(){
  // send a video play event
  if(socket && player){
    socket.emit('play', {id: socket.id, currentTime: player.currentTime});
  }
}

function pause(){
  // send a video pause event
  if(socket && player){
    socket.emit('pause', {id: socket.id, currentTime: player.currentTime});
  }
}
