const template = `
<style>
  .container {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #000;
    padding: 10px;
    height: 350px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .subContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
  }

  .controles {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 6px;
    width: 80px;
    position: relative;
    margin-bottom: 16px;
} 

.controles > label {
  flex: 0.1;
  text-align: right;
}

 .controles > input {
    flex: 0.8;
  }

  .controles > output {
    flex: 0.1;
  }

  .preset-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // .slider {
  //   -webkit-appearance: slider-vertical;
  //   width: 100%;
  //   height: 10px;
  //   border-radius: 2px;  
  //   background: #f0f0f0;
  //   outline: none;
  //   opacity: 0.7;
  //   -webkit-transition: .2s;
  //   transition: opacity .2s;
  // }

  // .slider:hover {
  //   opacity: 1; /* Fully shown on mouse-over */
  // }
  
  // .slider::-webkit-slider-thumb {
  //   -webkit-appearance: slider-vertical;
  //   appearance: none;
  //   width: 20px;
  //   height: 20px;
  //   border-radius: 50%; 
  //   background: black;
  //   cursor: pointer;
  // }
  
  // .slider::-moz-range-thumb {
  //   width: 20px;
  //   height: 20px;
  //   border-radius: 50%;
  //   background: black;
  //   cursor: pointer;
  // }

  .preset-button {
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    padding: 8px 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    margin: 5px;
  }

  .preset-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .preset-button:focus {
    outline: none;
    background-color: rgba(255, 255, 255);
  }

  .preset-button:active {
    background-color: rgba(255, 255, 255, 0.5);
  }

</style>

<div class='container'>   
  <p style="font-size: 20px; font-weight: bold;">Equalizer</p>
  <div class="subContainer">
    <div class="controles">
      <label>60Hz</label>
      <webaudio-slider 
        src="./components/images/knobs/vsliderbody.png" 
        knobsrc="./components/images/knobs/vsliderknob.png"
        class="slider"
        value="0"
        step="1" 
        min="-30"
        max="30"
        width="24"
        height="128"
        direction="vert"
        >
      </webaudio-slider>
      <output id="gain0">0 dB</output>
    </div>

    <div class="controles">
      <label>170Hz</label>
      <webaudio-slider 
        src="./components/images/knobs/vsliderbody.png" 
        knobsrc="./components/images/knobs/vsliderknob.png"
        class="slider"
        value="0"
        step="1" 
        min="-30"
        max="30"
        width="24"
        height="128"
        direction="vert"
        >
      </webaudio-slider>
      <output id="gain1">0 dB</output>
    </div>

    <div class="controles">
      <label>350Hz</label>
      <webaudio-slider 
        src="./components/images/knobs/vsliderbody.png" 
        knobsrc="./components/images/knobs/vsliderknob.png"
        class="slider"
        value="0"
        step="1" 
        min="-30"
        max="30"
        width="24"
        height="128"
        direction="vert"
        >
      </webaudio-slider>
      <output id="gain2">0 dB</output>
    </div>

    <div class="controles">
      <label>1000Hz</label>
      <webaudio-slider 
      src="./components/images/knobs/vsliderbody.png" 
      knobsrc="./components/images/knobs/vsliderknob.png"
      class="slider"
      value="0"
      step="1" 
      min="-30"
      max="30"
      width="24"
      height="128"
      direction="vert"
      >
    </webaudio-slider>
      <output id="gain3">0 dB</output>
    </div>

    <div class="controles">
      <label>3500Hz</label>
      <webaudio-slider 
        src="./components/images/knobs/vsliderbody.png" 
        knobsrc="./components/images/knobs/vsliderknob.png"
        class="slider"
        value="0"
        step="1" 
        min="-30"
        max="30"
        width="24"
        height="128"
        direction="vert"
        >
      </webaudio-slider>
      <output id="gain4">0 dB</output>
    </div>

    <div class="controles">
      <label>10000Hz</label>
      <webaudio-slider 
        src="./components/images/knobs/vsliderbody.png" 
        knobsrc="./components/images/knobs/vsliderknob.png"
        class="slider"
        value="0"
        step="1" 
        min="-30"
        max="30"
        width="24"
        height="128"
        direction="vert"
        >
      </webaudio-slider>
      <output id="gain5">0 dB</output>
    </div>
  </div>
</div>
`;

class MyEqualizer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;

    this.audioCtx;
    this.filters = [];
    this.presets = [
      { name: "Pop", gains: [-15, -10, 0, 10, 5, -5] },
      { name: "Rock", gains: [-12, -8, 0, 6, 10, 4] },
      { name: "Jazz", gains: [-8, -4, 0, 6, 4, 2] },
      { name: "Classical", gains: [-4, 2, 6, 10, 8, 4] },
      { name: "Metal", gains: [15, 10, 0, -10, -8, -4] },
      { name: "Auto", gains: [0, 0, 0, 0, 0, 0] },
    ];
  }

  setContext(context) {
    this.audioCtx = context;
    this.setupFilters();
  }

  getContext() {
    return this.audioCtx;
  }

  getInput() {
    return this.filters[0];
  }

  setupFilters() {
    const frequencies = [60, 170, 350, 1000, 3500, 10000];
    const sourceNode = this.audioCtx.createMediaElementSource(new Audio());

    frequencies.forEach((freq, index) => {
      const eq = this.audioCtx.createBiquadFilter();
      eq.frequency.value = freq;
      eq.type = "peaking";
      eq.gain.value = 0;
      this.filters.push(eq);
    });

    sourceNode.connect(this.filters[0]);
    this.filters.forEach((filter, index) => {
      if (index < this.filters.length - 1) {
        filter.connect(this.filters[index + 1]);
      } else {
        filter.connect(this.audioCtx.destination);
      }
    });

    this.shadowRoot.querySelectorAll(".slider").forEach((slider, index) => {
      slider.addEventListener("input", (event) => {
        this.changeGain(event.target.value, index);
      });
    });

    this.createPresetButtons();
  }

  createPresetButtons() {
    const presetContainer = document.createElement("div");
    presetContainer.classList.add("preset-container");

    this.presets.forEach((preset, index) => {
      const presetButton = document.createElement("button");
      presetButton.textContent = preset.name;
      presetButton.classList.add("preset-button");
      presetButton.addEventListener("click", () => {
        this.applyPreset(index);
      });
      presetContainer.appendChild(presetButton);
    });

    this.shadowRoot.querySelector(".container").appendChild(presetContainer);
  }

  applyPreset(presetIndex) {
    const preset = this.presets[presetIndex];
    this.shadowRoot.querySelectorAll(".slider").forEach((slider, index) => {
      slider.value = preset.gains[index];
      this.changeGain(preset.gains[index], index);
    });
  }

  changeGain(sliderVal, nbFilter) {
    const value = parseFloat(sliderVal);
    this.filters[nbFilter].gain.value = value;

    const output = this.shadowRoot.querySelector(`#gain${nbFilter}`);
    output.textContent = `${value} dB`;
  }
}

customElements.define("my-equalizer", MyEqualizer);
