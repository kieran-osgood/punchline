import { act, fireEvent } from '@testing-library/react-native';

export function wait(ms: number) {
  return act(() => new Promise((r) => setTimeout(r, ms)));
}

export function fireAsyncPress(element: any, ms = 1) {
  fireEvent.press(element);
  return wait(ms);
}

export function fireAsyncChangeText(element: any, text: string, ms = 1) {
  fireEvent.changeText(element, text);
  return wait(ms);
}
