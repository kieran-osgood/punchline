declare module "*.svg" {
  import { SvgProps } from "react-native-svg"
  const content: React.FC<SvgProps>
  export default content
}

declare module "react-native-dotenv" {
  export const API_URL: string
  export const WEB_URL: string
  export const SENTRY_ORGANIZATION_SLUG: string
  export const SENTRY_PROJECT_SLUG: string
}
