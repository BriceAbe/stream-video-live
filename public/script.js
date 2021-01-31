const socket = io("/");

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "443",
});
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
    //
    socket.on("user-connected", (userId) => {
      userConnected(userId, stream);
    });

    peer.on("call", (call) => {
      call.answer(stream);
      socket.emit("join-room", RoomID, id);
    });
  });

peer.on("open", (id) => {
  socket.emit("join-room", RoomID, id);
});

//  noouvelle personne qui rentre sans le steram
const userConnected = (userId, stream) => {
  const call = peer.call(userId, stream);
  const videoElement = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    // addVideoStream(videoElement, userVideoStream);
  });
};

//fonction joue la video du stream

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoID.append(video);
};
