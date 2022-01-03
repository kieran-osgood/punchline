import "react-native"
// libraries to mock
import "./mock-async-storage"
import "./mock-i18n"
import "./mock-reactotron"
// import 'react-native-gesture-handler/jestSetup'

declare global {
  let __TEST__: boolean
}

// global.window = {};
// global.window = global;

jest.mock("@react-native-firebase/admob", () => ({
  BannerAd: jest.fn(() => null),
  BannerAdSize: jest.fn(),
  TestIds: jest.fn(),
}))

jest.mock("@react-native-firebase/app", () => ({
  __esModule: true, // this property makes it work
  getFirebaseRoot: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
  default: jest.fn(),
  namedExport: jest.fn(),
}))

// curried function fixes TypeError: (0 , _auth.default) is not a function
jest.mock("@react-native-firebase/auth", () => () => ({
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
  onIdTokenChanged: jest.fn(),
}))

jest.mock("@react-native-community/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn().mockImplementation(() => {
      return null
    }),
  },
  GoogleSigninButton: jest.fn().mockReturnValue(null),
}))

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

jest.mock("react-native-share", () => ({}))

require("react-native-reanimated/lib/reanimated2/jestUtils").setUpTests()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.__reanimatedWorkletInit = function (worklet: { __worklet: boolean }) {
  worklet.__worklet = true
}

jest.mock("react-native-reanimated", () => ({
  ...jest.requireActual("react-native-reanimated/mock"),
  makeMutable: (f: any) => f,
  useWorkletCallback: (f: any) => f,
  useAnimatedProps: (style: any) => style,
}))

jest.mock("@gorhom/bottom-sheet", () => {
  const react = require("react-native")
  return {
    __esModule: true,
    default: react.View,
    BottomSheetView: react.View,
    BottomSheetScrollView: react.ScrollView,
    useBottomSheetDynamicSnapPoints: jest.fn(() => ({
      animatedHandleHeight: 0,
      animatedSnapPoints: [0],
      animatedContentHeight: 0,
      handleContentLayout: jest.fn,
    })),
  }
})

jest.mock("@sentry/react-native", () => ({
  captureException: () => jest.fn(),
}))

jest.mock("react-native-toast-message", () => ({
  show: () => jest.fn(),
}))
