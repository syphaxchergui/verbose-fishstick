import "./libs/webaudiocontrols.js";

const template = `
<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    padding: 10px 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: #000;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  button {
    width: 60px;
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    padding: 8px 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    margin: 5px;
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .progressBarClass {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
  } 

  .row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
  }

  .controles {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    width: 100%;
    position: relative;
} 


  .controles > p {
    flex: 0.2;
  }

  .controles > div {
    flex: 0.8;
  }

  .conroles-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 36px;
    width: 100%;
    position: relative;
    margin-bottom: 16px;
    margin-top: 24px;

  }

  .flex-row: {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    align-text: center;
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
    gap: 8px;
  }

  .button-group > button{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  #bar-animation { 
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 60px;
  }

  #myCanvas {
    border:1px solid;
  }
</style>
<div class='container'>   
    

    <div class="conroles-container">

    <div>
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

      <div class="flex-row">
        <p style="font-size: 20px; font-weight: bold; text-align: center;" id="title">Audio Player</p>
 
        <div class="button-group">
            <button id="prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10.354 3.646a.5.5 0 0 1 0 .708L6.707 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0z"/>
                </svg>\
            </button>

            <button id="substractFive">
                - 5s
            </button>
            <button id="play">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                  <path d="M4.905 14.21a1 1 0 0 1-1.578-.814l7-5a1 1 0 0 1 0-1.592l-7-5A1 1 0 0 1 4 3v10a1 1 0 0 1 .905 1.21z"/>
                </svg>

            </button>
            <button id="pause">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                  <rect width="4" height="12" x="3" y="2" rx="1"/>
                  <rect width="4" height="12" x="9" y="2" rx="1"/>
                </svg>
            </button>
            <button id="addFive">
                + 5s
            </button>    
            
            <button id="next">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5.646 3.646a.5.5 0 0 0 0 .708L9.293 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0z"/>
          </svg>
          </button>
        </div>
        <div id="bar-animation"></div>
    </div>
      <webaudio-knob 
        src="./components/images/Vintage_VUMeter_2.png" 
        sprites="50" 
        value="0" 
        id="analyzerInput"
        diameter="120" 
        style="height: 120px;">
      </webaudio-knob>
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
    this.playlist = [];
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
      this.next();
    });

    this.shadowRoot.querySelector("#prev").addEventListener("click", () => {
      this.prev();
    });

    this.shadowRoot
      .querySelector("#progressBar")
      .addEventListener("input", () => {
        //change the current time of the audio
        this.audio.currentTime =
          (this.shadowRoot.querySelector("#progressBar").value / 100) *
          this.audio.duration;
      });



    this.audio.addEventListener("ended", () => {
      this.audio.currentTime = 0;
      this.next();
    });
  }

  buildGraph() {
    this.audio.addEventListener("play", () => {
      this.audioContext.resume();
    });

    let lecteurAudioNode = this.audioContext.createMediaElementSource(
      this.audio
    );

    this.pannerNode = this.audioContext.createStereoPanner();
    lecteurAudioNode.connect(this.pannerNode);
    //this.pannerNode.connect(this.audioContext.destination);

    this.analyser = this.audioContext.createAnalyser();


    this.pannerNode.connect(this.analyser);


    this.analyser.connect(this.audioContext.destination);

    this.shadowRoot.querySelector("#balance").addEventListener("input", () => {
      //change the audio balance
      this.pannerNode.pan.value =
        this.shadowRoot.querySelector("#balance").value;
    });

    this.updateAnimations();
  }

  updateAnimations() {
    this.analyser.fftSize = 1024; // Increase the FFT size to capture more detailed frequency data
    const analyserInput = this.shadowRoot.querySelector("#analyzerInput");
    const barAnimation = this.shadowRoot.querySelector("#bar-animation");
    let dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    const update = () => {
      this.analyser.getByteFrequencyData(dataArray);

      // Sort the frequency data in ascending order
      const sortedData = [...dataArray].sort((a, b) => a - b);

      // Calculate the index of the 95th percentile
      const percentileIndex = Math.floor(sortedData.length * 0.95);

      // Get the value at the 95th percentile
      const percentileValue = sortedData[percentileIndex];

      // Map the percentile value to the range [0, 255] for the input range
      const mappedValue = Math.floor((percentileValue / 255) * 100);

      // Set the value of the input range
      analyserInput.value = mappedValue;

      barAnimation.innerHTML = "";

      const numBars = 10; // Number of bars to display
      const barWidth = 20; // Width of each bar
      const barMargin = 6; // Margin between each bar

      for (let i = 0; i < numBars; i++) {
        const barHeight = (dataArray[i] / 255) * 100;
        const bar = document.createElement("div");
        bar.style.width = `${barWidth}px`;
        bar.style.height = `${barHeight}%`;
        bar.style.marginRight = `${barMargin}px`;
        const hue = Math.floor(Math.random() * 360); // Random hue value between 0 and 360
        const lightness = Math.floor(Math.random() * 11) + 40; // Random lightness value between 40 and 50
        bar.style.backgroundColor = `hsla(${hue}, 0%, ${lightness}%, 0.3)`; // Set the background color using HSLA values with opacity
        bar.style.boxShadow = `0 0 10px rgba(255, 255, 255, 0.3)`; // Glassmorphisme effect
        barAnimation.appendChild(bar);
      }
      // Schedule the next update
      requestAnimationFrame(update);
    };

    // Start the animation loop
    update();
  }

  next() {
    this.dispatchEvent(new CustomEvent("nextTrack"));
  }

  prev() {
    this.dispatchEvent(new CustomEvent("prevTrack"));
  }

  getHTMLAudioElement() {
    return this.audio;
  }

  getContext() {
    return this.audioContext;
  }

  getAnalyser() {
    return this.analyser;
  }

  getSourceNode() {
    return this.pannerNode;
  }

  setPlaylist(playlist) {
    this.playlist = playlist?.split(",") || [];
  }

  setSrc(src) {
    this.audio.src = src;
    this.audio.currentTime = 0;
    this.audio.play();

    this.shadowRoot.querySelector("#title").innerHTML = src
      .split("/")
      .pop()
      .split(".")[0];
  }

  connectCustomNode(node) {
    this.pannerNode.disconnect();
    this.pannerNode.connect(node);
    node.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.outputNode = node;
  }
}

function formatSecondsToMinutes(seconds) {
  return `${Math.floor(seconds / 60)}:${seconds > 9 ? Math.floor(seconds % 60) : `0${Math.floor(seconds % 60)}`
    }`;
}



customElements.define("audio-player", AudioPlayer);
