window.onload = init;

let player, equalizer;
function init() {
    console.log('page chargée');
    
    player = document.querySelector('#audioPlayer');
    equalizer = document.querySelector('#equalizer');
    playlist = document.querySelector('#playlist');

    //context
    equalizer.setContext(player.getContext());
    player.connectCustomNode(equalizer.getInput());


    //playlist
    playlist.addEventListener('changeMusic', (event) => {
        player.setAttribute('src', event.detail);
        console.log(event)
    });
    player.setAttribute('playlist', this.playlist.getPlaylist())
    player.setAttribute('src', this.playlist.getCurrentMusic());
}

// src="./assets/audio/CleanGuitarRiff.mp3"
// playlist="./assets/audio/CleanGuitarRiff.mp3,./assets/audio/Test.mp3,./assets/audio/sample-15s.mp3"