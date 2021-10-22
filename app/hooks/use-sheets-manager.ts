import { OptionsBottomSheet } from "components"
import * as React from "react"

export default function useSheetsManager<T extends string[]>() {
  const refs = React.useRef<Map<T[number], OptionsBottomSheet | null>>(new Map())
  const currentOpen = React.useRef<T[number] | null>(null)

  const open = (refName: T[number]) => {
    if (currentOpen.current) refs.current.get(currentOpen.current)?.close()
    currentOpen.current = refName
    refs.current.get(refName)?.open()
  }

  const close = () => {
    if (currentOpen.current) refs.current.get(currentOpen.current)?.close()
    currentOpen.current = null
  }

  return { refs, open, close }
}
