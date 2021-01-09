import { StyleProp, ViewStyle } from 'react-native';

export interface SVGProps {
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
}

export enum LocalStorageKeys {
  soundIsMuted = 'sound_is_muted',
  jokeLength = 'joke_length',
}
