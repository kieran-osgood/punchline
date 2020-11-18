import { Audio } from 'expo-av';
import { AVPlaybackSource } from 'expo-av/build/AV';
import * as React from 'react';

const useSound = (file: AVPlaybackSource) => {
  const audioFile = React.useMemo(() => {
    return new Audio.Sound();
  }, []);
  React.useEffect(() => {
    audioFile.loadAsync(file);
  }, [file, audioFile]);
  return audioFile;
};

export default useSound;
