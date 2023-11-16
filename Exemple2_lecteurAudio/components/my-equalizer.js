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
      max-width: 400px;
  }

  .subContainer {
    display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      border-radius: 5px;
      max-width: 400px;
  }

  .controles {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 6px;
    width: 100%;
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

  .slider {
    -webkit-appearance: slider-vertical;
    width: 100%;
    height: 10px;
    border-radius: 2px;  
    background: #f0f0f0;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: slider-vertical;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%; 
    background: black;
    cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: black;
    cursor: pointer;
  }


</style>

<div class='container'>   


<p style="font-size: 20px; font-weight: bold;">Equalizer</p>
    <div class="subContainer">
    <div class="controles">
      <label>60Hz</label>
      <input type="range" class="slider" value="0" step="1" min="-30" max="30"></input>
      
      <output id="gain0">0 dB</output>
    </div>

    <div class="controles">
    <label>170Hz</label>
    <input type="range" class="slider" value="0" step="1" min="-30" max="30"></input>
<output id="gain1">0 dB</output>
  </div>

  <div class="controles">
    <label>350Hz</label>
    <input type="range" class="slider" value="0" step="1" min="-30" max="30"></input>
<output id="gain2">0 dB</output>
  </div>

  <div class="controles">
    <label>1000Hz</label>
    <input type="range" class="slider" value="0" step="1" min="-30" max="30"></input>
<output id="gain3">0 dB</output>
  </div>

  <div class="controles">
    <label>3500Hz</label>
    <input type="range" class="slider" value="0" step="1" min="-30" max="30"></input>
<output id="gain4">0 dB</output>
  </div>

  <div class="controles">
    <label>10000Hz</label>
    <input type="range" class="slider" value="0" step="1" min="-30" max="30"></input>
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
  }

  setContext(context) {
    this.audioCtx = context;
    this.setupFilters();
  }

  getContext() {
    return this.audioCtx ;
  }

  getInput() {
    console.log(this.filters[0])
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
  }

  changeGain(sliderVal, nbFilter) {
    const value = parseFloat(sliderVal);
    this.filters[nbFilter].gain.value = value;

    const output = this.shadowRoot.querySelector(`#gain${nbFilter}`);
    output.textContent = `${value} dB`;
  }
}

customElements.define("my-equalizer", MyEqualizer);