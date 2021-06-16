// socket functions hooking onto video

function onPlay(data){
  // handling receiving a play event
  if(data.id !== socket.id && player.current){
    toggle = false;
    player.current.currentTime = data.currentTime;
    player.current.play();
  }
}

function onPause(data){
  // handling recieving a pause event
  if(data.id !== socket.id && player.current){
    toggle = false;
    player.current.pause();
    player.current.currentTime = data.currentTime;
  }
}

function setSocketEventHandlers(socket){
  // sets this socket object's event handlers for our media events
  socket.on('play', onPlay);
  socket.on('pause', onPause);
  socket.on('joinSession', onJoinSession);
  socket.on('createSession', onCreateSession);
}
