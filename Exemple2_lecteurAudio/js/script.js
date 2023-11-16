window.onload = init;

let player, equalizer;
function init() {
  console.log("page chargée");

  player = document.querySelector("#audioPlayer");
  equalizer = document.querySelector("#equalizer");
  playlist = document.querySelector("#playlist");

  //context
  equalizer.setContext(player.getContext());
  player.connectCustomNode(equalizer.getInput());

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