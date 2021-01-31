// creer un element video

const videoID = document.getElementById("video");

const videoElement = document.createElement("video");
videoElement.muted = false;
let videoStream;

// demander utiliation de la camera et de l audio
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    // recuperer le flux video
    videoStream = stream;

    addVideoStream(videoElement, stream);
  });

//fonction joue la video du stream

const addVideoStream = (video, stream) => {
  video.srcObject = stream;

  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  console.log(video);
  videoID.append(video);
};
