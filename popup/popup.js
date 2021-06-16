var state = {
  page: 0
};

// // When the button is clicked, inject setPageBackgroundColor into current page
// window.onload = () => {

//   let btnSelectVideo = document.getElementById("btn-select-video");
//   let btnJoin = document.getElementById("btn-join");

//   console.log(btnJoin);

//   btnJoin.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     chrome.tabs.sendMessage(tab.id, {action: 'join_session'}, (res) => {
//       console.log(res);
//     });
//   });

//   btnSelectVideo.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     chrome.tabs.sendMessage(tab.id, {action: 'select_video'}, (res) => {
//       console.log(res);
//     });
//   });
  
// };

function onJoin(){
  // attempt to join a session
  let id = document.getElementById("join-id").value;
  let password = document.getElementById("join-password").value;
  joinSession(id, password);
}

function onCreate(){
  // attempt to create a session
  let id = document.getElementById("create-id").value;
  let password = document.getElementById("create-password").value;
  createSession(id, password);
}

function onSelectVideo(){
  // trigger select video element in content
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, {action: 'select_video'}, (res) => {
    console.log(res);
  });
}

function onLeave(){

}

function onJoinCallback(data){
  // handle server response on join session attempt
}

function onCreateCallback(data){
  // handle server response on create session attempt
}
