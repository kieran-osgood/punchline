declare module "react-native-dotenv" {
  export const API_URL: string
  export const WEB_URL: string
  export const SENTRY_ORGANIZATION_SLUG: string
  export const SENTRY_PROJECT_SLUG: string
  export const APPSTORE_URL: string
  export const PLAYSTORE_URL: string
  export const ADMOB_HOME_FOOTER: string
}

declare module "react-native-restart" {
  type RestartType = {
    Restart(): void
  }
  const Restart: RestartType
  export default Restart
}
