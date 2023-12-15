# Audio Player
![Alt text](image.png)

This project is an audio player built using web components and Web Audio API. It includes an equalizer with predefined modes such as pop, metal, and more. Additionally, it features a Butterchurn visualizer with presets for enhanced audio visualization. The audio player also includes a playlist component for managing and playing a list of audio files.

To enhance the visual elements of the audio player, we utilize the [webaudio-controls](https://g200kg.github.io/webaudio-controls/docs/index.html) library. This library provides a set of customizable controls for audio applications, including rotation buttons and other visual elements.


## Features

- Audio playback: The audio player allows you to play, pause, and control the volume of audio files using the Web Audio API.
- Equalizer: The equalizer provides predefined modes such as pop, metal, and more, allowing you to enhance the audio output according to your preferences.
- Butterchurn visualizer: The Butterchurn visualizer offers various presets that create stunning visual effects synchronized with the audio playback.
- Playlist: The playlist component allows you to manage and play a list of audio files.

## Architecture

The audio player is built using web components, which are encapsulated, reusable, and customizable elements. The architecture of the project follows a component-based approach, ensuring modularity and maintainability.

The main components of the audio player are:

- Audio Player Component: Responsible for handling the audio playback functionality using the Web Audio API, including play, pause, and volume control.
- Equalizer Component: Implements the equalizer functionality, allowing users to select predefined modes or customize the audio output.
- Butterchurn Visualizer Component: Integrates the Butterchurn library to generate captivating visual effects based on the audio input.
- Playlist Component: Manages and plays a list of audio files.

The project follows a modular structure, with each component encapsulating its logic and styling. This approach promotes code reusability and makes it easier to maintain and extend the audio player.

## Getting Started

To get started with the audio player, follow these steps:

1. Clone the repository: `git clone https://github.com/syphaxchergui/verbose-fishstick.git`
2. Open the `index.html` file in your web browser.

## Acknowledgements

- [Butterchurn](https://github.com/jberg/butterchurn): A WebGL-based music visualization library.
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components): A set of web platform APIs that allow you to create custom, reusable, encapsulated HTML elements.
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API): A powerful JavaScript API for processing and synthesizing audio in web applications.
- [webaudio-controls](https://g200kg.github.io/webaudio-controls/docs/index.html): A library for creating audio controls in web applications.
