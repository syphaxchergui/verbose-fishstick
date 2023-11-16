const template = `
<style>
  .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #000;
      color: #fff;
      padding: 20px;
      border-radius: 5px;
      width: 100%; 
      flex-grow: 1;
  }

  .subContainer {
    display: flex;
      align-items: start;
      justify-content: start;
      padding: 20px;
      border-radius: 5px;
      width: 100%; 
      flex-direction: column; 
  }

  .music {
    margin-bottom: 10px;
    margin-top: 5px;
    cursor: pointer;
  }



</style>

<div class='container'>   


<p style="font-size: 20px; font-weight: bold;">Playlist</p>
    <div class="subContainer">
  
  </div>
</div>
`;

class MyPlaylist extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.list = './assets/audio/CleanGuitarRiff.mp3,./assets/audio/Test.mp3,./assets/audio/sample-15s.mp3'
    this.currentMusic = './assets/audio/CleanGuitarRiff.mp3'
    this.buildList()
  } 

  getPlaylist() {
    return this.list;
  }

  buildList() {
    let list = this.getPlaylist();
    let listArray = list.split(',');
    let listDiv = this.shadowRoot.querySelector('.subContainer');
    listArray.forEach(element => {
      let div = document.createElement('div');
      div.innerHTML = element?.split('/').pop();
      div.classList.add('music');
      div.onclick = () => {this.currentMusic = element; this.dispatchEvent(new CustomEvent('changeMusic', {detail: element})); console.log(element)}
      listDiv.appendChild(div);
    });
  }

  getCurrentMusic() {
    return this.currentMusic;
  }

  setCurrentMusic(music) {
    this.currentMusic = music;
  }
  
}

customElements.define("my-playlist", MyPlaylist);
