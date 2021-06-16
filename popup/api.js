// handle communication with socket server

const SERVER_ADDR = "http://localhost:8080";
var socket; // our socket connection
var player; // reference to the HTMLVideoElement to hook onto
console.log("content script api.js loaded");

function connect(){
  // establish socket connection to server
  if(socket) 
    socket.disconnect();

  socket = io.connect(SERVER_ADDR);
  setSocketEventHandlers(socket)
}

function joinSession(id, password){
  // join a video viewing session
  connect();
  socket.emit('joinRoom', {room: id, password});
}

function createSession(){
  connect();
  socket.emit('createRoom', {room: '', password: ''});
}

function play(){
  // send a video play event
  if(socket && video){
    socket.emit('play', {id: socket.id, currentTime: player.current.currentTime});
  }
}

function pause(){
  // send a video pause event
  if(socket && video){
    socket.emit('pause', {id: socket.id, currentTime: player.current.currentTime});
  }
}
