import i18n from "i18n-js"
// import { TxKeyPath } from "./i18n"

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: string, options?: I18n.TranslateOptions) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return key ? i18n.t(key, options) : null
}
