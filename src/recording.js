// Spec is at http://dvcs.w3.org/hg/dap/raw-file/tip/media-stream-capture/RecordingProposal.html

// This demo is based on https://github.com/PinZhang/sample-codes/blob/master/html5/media_recording.html

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// video not implemented yet
var constraints = {audio: true, video: true};
var videoElement = document.querySelector('video');
//var dataElement = document.querySelector('#data');
//var downloadLink = document.querySelector('a#downloadLink');


function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

var count = 0;
function startRecording(stream) {
  console.log('Starting...');
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function(e) {
    console.log('Data available...');
    count++;
    if (count > 1) {
      return;
    }
    console.log(e);
    videoElement.src = window.URL.createObjectURL(e.data);
  };

  mediaRecorder.start();

}

window.onload = function(){
  if (typeof MediaRecorder === 'undefined' || !navigator.getUserMedia) {
    console.log('Sorry! This demo requires Firefox Nightly.');
  } else {
    navigator.getUserMedia(constraints, startRecording, errorCallback);
    console.log("started recording");

    var button = document.getElementById("trash-button");
    button.onclick = function(){
      console.log("Stopped recording");
      mediaRecorder.stop();
    }
  }
};


function log(message){
  //dataElement.innerHTML = message + '<br>' + dataElement.innerHTML ;
}