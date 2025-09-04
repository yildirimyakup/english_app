import { AudioContext } from 'react-native-audio-api';

export const playSound = async (url: any) => {
  const audioContext = new AudioContext();

  const audioBuffer = await fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));

  const playerNode = audioContext.createBufferSource();
  playerNode.buffer = audioBuffer;

  playerNode.connect(audioContext.destination);
  playerNode.start(audioContext.currentTime);
  playerNode.stop(audioContext.currentTime + 10);
};
