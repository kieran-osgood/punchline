import "@testing-library/jest-native/extend-expect"

declare module "*.svg" {
  const content: React.FC<import("react-native-svg").SvgProps>
  export default content
}

declare module "react-native-dotenv" {
  export const API_URL: string
  export const WEB_URL: string
  export const SENTRY_ORGANIZATION_SLUG: string
  export const SENTRY_PROJECT_SLUG: string
  export const APPSTORE_URL: string
  export const PLAYSTORE_URL: string
  export const ADMOB_HOME_FOOTER: string
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends import("app/navigators/root-navigator").RootParamList {}
  }
}
declare module "react-native-restart" {
  type RestartType = {
    Restart(): void
  }
  const Restart: RestartType
  export default Restart
}
