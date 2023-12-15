const template = `

  <style>

    .container {
      position: absolute;
      top: 0;
      left: 0;
      min-height: 100vh;
      height: 100%;
      width: 100%;
      z-index: -1;
    }

    .preset-container::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    .preset-container {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }

    .preset-container {
      background: rgba(255, 255, 255, 0.4);
      border-radius: 10px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #000;
      padding: 10px;
      height: 360px;
      overflow-y: auto;
      overflow-x: hidden;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    .preset-container > span {
      display: block;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      background-color: #fff;
      color: #000;
      width: calc(100%-20px);
    }

    .button {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      background-color: #000;
      color: #fff;
      font-size: 13px;
      border: 0.5px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 8px;
      height: 65px;
      padding: 12px;
      border-radius: 15px 15px 12px 12px;
      cursor: pointer;
      position: relative;
      will-change: transform;
      transition: all .1s ease-in-out 0s;
      user-select: none;
      /* Add gradient shading to each side */
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      background-position: bottom right, bottom right;
      background-size: 100% 100%, 100% 100%;
      background-repeat: no-repeat;
      box-shadow: inset -4px -10px 0px rgba(255, 255, 255, 0.4),
        inset -4px -8px 0px rgba(0, 0, 0, 0.3),
        0px 2px 1px rgba(0, 0, 0, 0.3),
        0px 2px 1px rgba(255, 255, 255, 0.1);
      transform: perspective(70px) rotateX(5deg) rotateY(0deg);
    }

    .button::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.5));
      z-index: -1;
      border-radius: 15px;
      box-shadow: inset 4px 0px 0px rgba(255, 255, 255, 0.1),
        inset 4px -8px 0px rgba(0, 0, 0, 0.3);
      transition: all .1s ease-in-out 0s;
    }

    .button::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      background-position: bottom right, bottom right;
      background-size: 100% 100%, 100% 100%;
      background-repeat: no-repeat;
      z-index: -1;
      border-radius: 15px;
      transition: all .1s ease-in-out 0s;
    }

    .button:active {
      will-change: transform;
      transform: perspective(80px) rotateX(5deg) rotateY(1deg) translateY(3px) scale(0.96);
      height: 64px;
      border: 0.25px solid rgba(0, 0, 0, 0.2);
      box-shadow: inset -4px -8px 0px rgba(255, 255, 255, 0.2),
        inset -4px -6px 0px rgba(0, 0, 0, 0.8),
        0px 1px 0px rgba(0, 0, 0, 0.9),
        0px 1px 0px rgba(255, 255, 255, 0.2);
      transition: all .1s ease-in-out 0s;
    }

    .button::after:active {
      background-image: linear-gradient(to bottom,rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.2));
    }

    .button:active::before {
      content: "";
      display: block;
      position: absolute;
      top: 5%;
      left: 20%;
      width: 50%;
      height: 20%;
      background-color: rgba(255, 255, 255, 0.1);
      animation: overlay 0.1s ease-in-out 0s;
      pointer-events: none;
    }

    .button svg {
      width: 15px;
      height: 15px;
    }

    @keyframes overlay {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    .button:focus {
      outline: none;
    }
  
  </style>

  <div id="box">
    <button id="fullScreenButton" class='button' >Full Screen</button>
    <canvas class='container'></canvas>
    <div class='preset-container'>
      <p style="font-size: 20px; font-weight: bold;">Visualizer Presets</p>
    </div>
  </div>
`;

let presets = {};
class ButterchurnVisualizer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.fullScreen = false;

    this.canvas = this.shadowRoot.querySelector("canvas");

    if (window.butterchurnPresets) {
      Object.assign(presets, butterchurnPresets.getPresets());
      console.log(presets);
      this.renderPresetList();
      this.renderFullPageButton();
    }
  }

  renderFullPageButton() {
    const fullScreenButton = this.shadowRoot.querySelector("#fullScreenButton");
    let box = this.shadowRoot.querySelector("#box");

    fullScreenButton.textContent = "Full Screen";

    fullScreenButton.style.zIndex = "99";

    fullScreenButton.style.position = "absolute";
    fullScreenButton.style.top = "20px";
    fullScreenButton.style.right = "20px";

    fullScreenButton.addEventListener("click", () => {
      if (!this.fullScreen) {
        this.canvas.style.zIndex = "90";
        fullScreenButton.textContent = "Exit Full Screen";
      } else {
        this.canvas.style.zIndex = "-1";
        fullScreenButton.textContent = "Full Screen";
      }
      this.fullScreen = !this.fullScreen;
    });

    this.shadowRoot.appendChild(fullScreenButton);
  }

  renderPresetList() {
    const presetList = Object.keys(presets);
    console.log(presetList);
    // Render the preset list in your desired way
    const presetContainer = this.shadowRoot.querySelector(".preset-container");
    // presetContainer.classList.add("preset-container");

    // Add title
    // const title = document.createElement("p");
    // title.textContent = "Visualizer Presets";
    // title.style.fontSize = "20px";
    // title.style.fontWeight = "bold";
    // presetContainer.appendChild(title);

    presetList.forEach((presetName) => {
      const presetButton = document.createElement("span");
      presetButton.textContent = presetName;
      presetButton.addEventListener("click", () => {
        this.applyPreset(presetName);
      });
      presetContainer.appendChild(presetButton);
    });
    this.shadowRoot.appendChild(presetContainer);
  }

  applyPreset(presetName) {
    const preset = presets[presetName];
    if (preset) {
      this.butterchurn.loadPreset(preset, 0.0);
      this.butterchurn.render();
    }
  }

  setAudioContext(audioContext, sourceNode) {
    this.butterchurn = butterchurn.default.createVisualizer(
      audioContext,
      this.canvas,
      {
        width: 800,
        height: 600,
        pixelRatio: window.devicePixelRatio || 1,
        textureRatio: 1,
      }
    );

    this.butterchurn.connectAudio(sourceNode);

    this.animate();
  }

  animate() {
    // const preset = presets['Flexi, martin + geiss - dedicated to the sherwin maxawow']
    // this.butterchurn.loadPreset(preset, 0.0);
    this.butterchurn.render();

    requestAnimationFrame(() => this.animate());
  }
}

customElements.define("butterchurn-visualizer", ButterchurnVisualizer);
