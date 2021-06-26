// // When the button is clicked, inject setPageBackgroundColor into current page
window.onload = async() => {
  // initialize dom event handlers
  let btnJoin = document.getElementById("btn-join");
  let btnCreate = document.getElementById("btn-create");
  let btnSelectVideo = document.getElementById("btn-select-video");
  let btnLeave = document.getElementById("btn-leave");

  btnJoin.addEventListener("click", onJoin);
  btnCreate.addEventListener("click", onCreate);
  btnSelectVideo.addEventListener("click", onSelectVideo);
  btnLeave.addEventListener("click", onLeave)

  let tabBtnJoin = document.getElementById("tab-btn-join");
  let tabBtnCreate = document.getElementById("tab-btn-create");
  tabBtnJoin.addEventListener("click", () => changeTabs(0));
  tabBtnCreate.addEventListener("click", () => changeTabs(1));

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // chrome.tabs.sendMessage(tab.id, {action: 'has_session'}, (response) => {
  //   console.log(response);
  //   if(response.hasSession){
  //     changePages(1);
  //   }
  // });
};

async function onJoin(){
  // attempt to join a session
  let room = document.getElementById("join-room").value;
  let username = document.getElementById("join-username").value;
  let password = document.getElementById("join-password").value;
  console.log(room, username, password);

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(
    tab.id, 
    {action: 'join_room', payload: {room, username, password}}
  );
}

async function onCreate(){
  // attempt to create a session
  let room = document.getElementById("create-room").value;
  let username = document.getElementById("create-username").value;
  let password = document.getElementById("create-password").value;

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(
    tab.id, 
    {action: 'create_room', payload: {room, username, password}}
  );
}

async function onLeave(){
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(
    tab.id, 
    {action: 'leave_room'}
  );
  changePages(0);
}

async function onSelectVideo(){
  // trigger select video element in content
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, {action: 'select_video'}, (res) => {
    console.log(res);
  });
}

function onJoinCallback(result){
  // handle server response on join session attempt
  if(result){
    changePages(1);
  }
  else{

  }
}

function onCreateCallback(result){
  // handle server response on create session attempt
  if(result){
    changePages(1);
  }
  else{
    
  }
}

function changeTabs(index){
  // switch between join and create tabs
  let joinTab = document.getElementById("join-tab");
  let createTab = document.getElementById("create-tab");

  let tabBtnJoin = document.getElementById("tab-btn-join");
  let tabBtnCreate = document.getElementById("tab-btn-create");

  switch(index){
    case 0: {
      joinTab.classList.remove('hidden');
      createTab.classList.add('hidden');

      tabBtnJoin.classList.add('is-active');
      tabBtnCreate.classList.remove('is-active');
      break;
    }
    case 1: {
      joinTab.classList.add('hidden');
      createTab.classList.remove('hidden');

      tabBtnJoin.classList.remove('is-active');
      tabBtnCreate.classList.add('is-active');
      break;
    }
  }
}

function changePages(index){
  let loginPage = document.getElementById("login-page");
  let controlPage = document.getElementById("control-page");

  switch(index){
    case 0: {
      loginPage.classList.remove('hidden');
      controlPage.classList.add('hidden');
      break;
    }
    case 1: {
      loginPage.classList.add('hidden');
      controlPage.classList.remove('hidden');
      break;
    }
  }
}

function onFailure(){
  
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log("runtime event: " + request.action);
    console.log(request);

    switch(request.action){
      case 'join_callback': {
        let {result} = request.payload;
        onJoinCallback(result);
        break;
      }
      case 'create_callback': {
        let {result} = request.payload;
        onJoinCallback(result);
        break;
      }
    }
  }
)
