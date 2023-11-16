import "./libs/webaudiocontrols.js";

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
       
  }
  button {
      padding: 5px;
      border-radius: 5px;
      border: 0.5px solid #ccc;
      background-color: #fff;
      cursor: pointer;
      width: 100px;
  }
  .progressBarClass {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
  } 

  .controles {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    position: relative;
} 

  .controles p {
    flex: 0.2;
  }

  .controles > div {
    flex: 0.8;
  }

  .conroles-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    position: relative;
    margin-bottom: 16px;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 2px;  
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%; 
    background: #fff;
    cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
  .sliderProgress {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 2px;  
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: all .2s;
  }

  .sliderProgress:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }

  .sliderProgress::-webkit-slider-thumb:hover {
    width: 8px;
  }

  .sliderProgress::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 5px;
    height: 20px;
    border-radius: 10%; 
    background: #fff;
    cursor: pointer;
  }
  
  .sliderProgress::-moz-range-thumb {
    width: 20px;
    height: 5px;
    border-radius: 10%;
    background: #fff;
    cursor: pointer;
  }

  .button-group {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;
  }

  .button-group > button{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
</style>
<div class='container'>   
    <p style="font-size: 20px; font-weight: bold;">Audio Player</p>
 
    <div class="button-group">
        <button id="prec">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10.354 3.646a.5.5 0 0 1 0 .708L6.707 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0z"/>
            </svg>\
            Prec
        </button>

      

        <button id="substractFive">
            - 5s
        </button>
        <button id="play">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
              <path d="M4.905 14.21a1 1 0 0 1-1.578-.814l7-5a1 1 0 0 1 0-1.592l-7-5A1 1 0 0 1 4 3v10a1 1 0 0 1 .905 1.21z"/>
            </svg>
            Play
        </button>
        <button id="pause">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
              <rect width="4" height="12" x="3" y="2" rx="1"/>
              <rect width="4" height="12" x="9" y="2" rx="1"/>
            </svg>
            Pause
        </button>
        <button id="addFive">
            + 5s
        </button>    
        
        <button id="next">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M5.646 3.646a.5.5 0 0 0 0 .708L9.293 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0z"/>
      </svg>
      </button>
    </div>

    <div class="conroles-container">
      <div class='controles'>
        <p>Volume</p>
        <webaudio-knob 
          id="volume"  
          src="./components/images/knobs/simplegray.png" 
          value="50"
          min="0" max="100"
          step="0.01" 
          diameter="64" 
          tooltip="Volume %d%">
        </webaudio-knob>
      </div>

      <div class='controles'>
        <p>Balance</p>
        <webaudio-knob 
          id="balance"  
          src="./components/images/knobs/simplegray.png" 
          value="0"
          min="-1" max="1"
          step="0.01" 
          diameter="64" 
          tooltip="Balance %d">
        </webaudio-knob>
      </div>
    </div>

    <div class='progressBarClass'>
      <input type="range" min="0" max="100" value="0" class="sliderProgress" id="progressBar">
      <p id="time">0:00min</p>
    </div>   
    
    <div id="animation">

    </div>

</div>

`;

class AudioPlayer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;

    this.audioContext = new AudioContext();
    this.playlist = this.getAttribute("playlist")?.split(",") || [];
    console.log(this.playlist);
    this.audio = new Audio(this.playlist[0]);
  }

  connectedCallback() {
    this.defineListeners();
    this.buildGraph();
    console.log("connected callback");
  }

  defineListeners() {
    this.shadowRoot.querySelector("#play").addEventListener("click", () => {
      this.audio.play();
    });

    this.shadowRoot.querySelector("#pause").addEventListener("click", () => {
      this.audio.pause();
    });

    this.shadowRoot.querySelector("#addFive").addEventListener("click", () => {
      this.audio.currentTime += 5;
    });

    this.shadowRoot
      .querySelector("#substractFive")
      .addEventListener("click", () => {
        this.audio.currentTime -= 5;
      });

    this.audio.addEventListener("timeupdate", () => {
      const progressBar = this.shadowRoot.querySelector("#progressBar");
      const time = this.shadowRoot.querySelector("#time");
      progressBar.value = (this.audio.currentTime / this.audio.duration) * 100;
      time.innerHTML = `${formatSecondsToMinutes(
        Math.floor(this.audio.currentTime)
      )}min`;
    });

    this.audio.addEventListener("ended", () => {
      this.audio.currentTime = 0;
      this.dispatchEvent(new Event("currentAudioEnded"));
    });

    // Volume
    this.shadowRoot.querySelector("#volume").addEventListener("input", () => {
      this.audio.volume = this.shadowRoot.querySelector("#volume").value / 100;
    });

    this.shadowRoot.querySelector("#next").addEventListener("click", () => {
      this.next()
    });

    this.shadowRoot.querySelector("#prec").addEventListener("click", () => {
      let prevIndex = 0;
      for (let i = 0; i < this.playlist.length; i++) {
        if (
          this.playlist[i].split("assets")[1] ===
          this.audio.src.split("assets")[1]
        ) {
          prevIndex = i - 1;
          if (prevIndex < 0) {
            prevIndex = this.playlist.length - 1;
          }
          break;
        }
      }
      console.log(prevIndex);
      this.audio.src = this.playlist[prevIndex];
      this.audio.currentTime = 0;
      this.audio.play();
    });

    this.shadowRoot
      .querySelector("#progressBar")
      .addEventListener("input", () => {
        //change the current time of the audio
        this.audio.currentTime =
          (this.shadowRoot.querySelector("#progressBar").value / 100) *
          this.audio.duration;
      });
  }

  buildGraph() {
    this.audio.addEventListener("play", () => {
      this.audioContext.resume();
    });

    let pannerMediaElementSource = this.audioContext.createMediaElementSource(
      this.audio
    );

    this.pannerNode = this.audioContext.createStereoPanner();
    pannerMediaElementSource.connect(this.pannerNode);
    this.pannerNode.connect(this.audioContext.destination);

    this.shadowRoot.querySelector("#balance").addEventListener("input", () => {
      //change the audio balance
      this.pannerNode.pan.value =
        this.shadowRoot.querySelector("#balance").value;
    });
  }

  next(){
    let nextIndex = 0;
    for (let i = 0; i < this.playlist.length; i++) {
      if (
        this.playlist[i].split("assets")[1] ===
        this.audio.src.split("assets")[1]
      ) {
        nextIndex = i + 1;
        if (nextIndex >= this.playlist.length) {
          nextIndex = 0;
        }
        break;
      }
    }
  
    this.audio.src = this.playlist[nextIndex];
    this.audio.currentTime = 0;
    this.audio.play();

    this.audio.addEventListener("ended", () => {
      this.audio.currentTime = 0;
      this.next()
    })
  }

  getHTMLAudioElement() {
    return this.audio;
  }

  getContext() {
    return this.audioContext;
  }

  static get observedAttributes() {
    return ['src', 'playlist'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'src' && oldValue !== newValue) {
      this.audio.src = newValue;
      this.audio.currentTime = 0;
      this.audio.play();
    }

    if (name === 'playlist' && oldValue !== newValue) {
      this.playlist = newValue?.split(",") || [];
    }
  }

  connectCustomNode(node) {
    console.log(node);
    this.pannerNode.disconnect();
    this.pannerNode.connect(node);
    node.connect(this.audioContext.destination);
  }
}



function formatSecondsToMinutes(seconds) {
  return `${Math.floor(seconds / 60)}:${
    seconds > 9 ? Math.floor(seconds % 60) : `0${Math.floor(seconds % 60)}`
  }`;
}

customElements.define("audio-player", AudioPlayer);
