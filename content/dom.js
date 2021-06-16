// dom manipulating functions live here
var player; // store video player element

function selectVideoElement(){
  // select a video to hook onto

  const onmouseover = (e) => {
    let previousElement = e.fromElement;
    let hoverElement = e.toElement;
    previousElement.classList.remove("hover-highlight");
    hoverElement.classList.add("hover-highlight");
  }

  const onclick = (e) => {
    e.target.classList.remove('hover-highlight');
    document.removeEventListener('mouseover', onmouseover);
    document.removeEventListener('click', onclick);

    if(e.target instanceof HTMLVideoElement)
      resetVideoElement(player);
      player = e.target; // set video to user selection
      setVideoElement(player);
  }

  document.addEventListener("mouseover", onmouseover);
  document.addEventListener('click', onclick);
  
}

function setVideoElement(elem){
  // add socket event hooks to video element
  console.log(elem);
  if(elem instanceof HTMLVideoElement){
    elem.addEventListener('play', play);
    elem.addEventListener('pause', pause);
    console.log('set video hooks')
  }
}

function resetVideoElement(elem){
  // remove socket event hooks from video element
  if(elem instanceof HTMLVideoElement){
    elem.removeEventListener("play", play);
    elem.removeEventListener("pause", pause);
  }
}

console.log("content script dom.js loaded");

chrome.runtime.onMessage.addListener(
  // handle communication with popup
  function(request, sender, sendResponse){
    console.log("runtime event: " + request.action);
    if(request.action == "select_video")
      selectVideoElement();
    sendResponse({});
  }
);
