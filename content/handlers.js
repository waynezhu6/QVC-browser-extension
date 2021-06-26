// socket functions hooking onto video

function onPlay(data){
  // handling receiving a play event
  if(data.id !== socket.id && player){
    toggle = false;
    player.currentTime = data.currentTime;
    player.play();
  }
}

function onPause(data){
  // handling recieving a pause event
  if(data.id !== socket.id && player){
    toggle = false;
    player.pause();
    player.currentTime = data.currentTime;
  }
}

function onJoinRoom(data){
  // handle server response on join session attempt
  chrome.runtime.sendMessage({
    action: 'join_callback', 
    payload: {result: data.result}
  });
}

function onCreateRoom(data){
  // handle server response on create session attempt
  chrome.runtime.sendMessage({
    action: 'create_callback', 
    payload: {result: data.result}
  });
}

function setSocketEventHandlers(socket){
  // sets this socket object's event handlers for our media events
  socket.on('play', onPlay);
  socket.on('pause', onPause);
  socket.on('joinRoom', onJoinRoom);
  socket.on('createRoom', onCreateRoom);
}
