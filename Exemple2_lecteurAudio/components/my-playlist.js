const template = `
<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #000;
    padding: 20px;
    border-radius: 5px;
    height: 360px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .subContainer {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 20px;
    border-radius: 5px;
    width: 100%; 
    flex-direction: column; 
  }

  .music {
    margin-bottom: 5px;
    cursor: pointer;
    padding: 5px;
    width: 100%;
  }

  .music:hover {
    opacity: 0.7;
  }

  .active {
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 5px;
    cursor: pointer;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    width: 100%;
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
    this.list =
      "./assets/audio/CleanGuitarRiff.mp3,./assets/audio/Test.mp3,./assets/audio/sample-15s.mp3";
    this.currentMusic = "./assets/audio/CleanGuitarRiff.mp3";
    this.playlist = this.list.split(",");
    this.buildList();
  }

  getPlaylist() {
    return this.list;
  }

  buildList() {
    let list = this.getPlaylist();
    let listArray = list.split(",");
    let listDiv = this.shadowRoot.querySelector(".subContainer");
    listDiv.innerHTML = "";

    listArray.forEach((element) => {
      let div = document.createElement("div");
      div.innerHTML = element?.split("/").pop().split(".")[0];
      div.classList.add("music");
      if (element === this.currentMusic) {
        div.classList.add("active");
      }
      div.onclick = () => {
        this.currentMusic = element;
        this.dispatchEvent(new CustomEvent("changeMusic", { detail: element }));
        listDiv
          .querySelectorAll(".music")
          .forEach((el) => el.classList.remove("active"));
        div.classList.add("active");
      };
      listDiv.appendChild(div);
    });
  }

  getCurrentMusic() {
    return this.currentMusic;
  }

  setCurrentMusic(music) {
    this.currentMusic = music;
    this.dispatchEvent(
      new CustomEvent("changeMusic", { detail: this.currentMusic })
    );
    this.buildList();
  }

  next() {
    this.setCurrentMusic(this.getNextMusic());
  }

  prev() {
    this.setCurrentMusic(this.getPrevMusic());
  }

  getNextMusic() {
    let nextIndex = 0;
    for (let i = 0; i < this.playlist.length; i++) {
      if (
        this.playlist[i].split("/").pop() === this.currentMusic.split("/").pop()
      ) {
        nextIndex = i + 1;
        if (nextIndex >= this.playlist.length) {
          nextIndex = 0;
        }
        break;
      }
    }
    return this.playlist[nextIndex];
  }

  getPrevMusic() {
    let prevIndex = 0;
    for (let i = 0; i < this.playlist.length; i++) {
      if (
        this.playlist[i].split("/").pop() === this.currentMusic.split("/").pop()
      ) {
        prevIndex = i - 1;
        if (prevIndex < 0) {
          prevIndex = this.playlist.length - 1;
        }
        break;
      }
    }
    return this.playlist[prevIndex];
  }
}

customElements.define("my-playlist", MyPlaylist);
