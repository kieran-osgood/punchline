import "@testing-library/jest-native/extend-expect"

export {}

type RootParamListBase = import("app/navigators/root-navigator").RootStackParamList

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamListBase {}
  }
  // FIXME: Doesn't seemingly supress warning in test/setup.tsx
  const __reanimatedWorkletInit: (worklet: any) => void
}

declare module "*.svg" {
  const content: React.FC<import("react-native-svg").SvgProps>
  export default content
}
