const template = `
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      background-color: #000;
      color: #fff;
      padding: 20px;
      border-radius: 5px;
      width: 80%;
      height: 100%;
    }
  </style>

  <canvas class='container'></canvas>
`;

class ButterchurnVisualizer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;

    this.canvas = this.shadowRoot.querySelector('canvas');
  }

  setAudioContext(audioContext, analyser) {
    this.analyser = analyser;

    this.butterchurn =  butterchurn.default.createVisualizer(audioContext, this.canvas, {
      width: 800,
      height: 600,
      pixelRatio: window.devicePixelRatio || 1,
      textureRatio: 1,
    });

    this.animate();
  }

  animate() {
    this.butterchurn.render();
    requestAnimationFrame(() => this.animate());
  }
}

customElements.define('butterchurn-visualizer', ButterchurnVisualizer);
