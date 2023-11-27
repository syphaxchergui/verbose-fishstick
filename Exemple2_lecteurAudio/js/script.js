window.onload = init;

let player, equalizer, playlist, visualizer;
function init() {
  console.log("page chargée");

  player = document.querySelector("#audioPlayer");
  equalizer = document.querySelector("#equalizer");
  playlist = document.querySelector("#playlist");
  visualizer = document.querySelector("#visualizer-container");
  
  //context
  equalizer.setContext(player.getContext());
  player.connectCustomNode(equalizer.getInput());
  visualizer.setAudioContext(player.getContext(), player.getAnalyser());

  player.setPlaylist(this.playlist.getPlaylist());
  player.setSrc(this.playlist.getCurrentMusic());

  //playlist
  playlist.addEventListener("changeMusic", (event) => {
    player.setSrc(event.detail);
    console.log(event);
  });

  player.addEventListener("nextTrack", () => {
    playlist.next();
  });

  player.addEventListener("prevTrack", () => {
    playlist.prev();
  });
}