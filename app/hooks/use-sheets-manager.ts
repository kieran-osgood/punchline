import { BottomSheetImperativeHandle } from "components"
import * as React from "react"

export default function useSheetsManager<T extends string[]>() {
  const refs = React.useRef<Map<T[number], BottomSheetImperativeHandle | null>>(new Map())
  const currentOpen = React.useRef<T[number] | null>(null)

  const open = (refName: T[number]) => {
    if (currentOpen.current === refName) return
    if (currentOpen.current) {
      refs.current.get(currentOpen.current)?.close()
    }
    currentOpen.current = refName
    refs.current.get(refName)?.open()
  }

  const close = () => {
    if (currentOpen.current) refs.current.get(currentOpen.current)?.close()
    currentOpen.current = null
  }

  return { refs, open, close, currentOpen }
}

/**
  TODO:
    create a context for the manager which wraps the screens sheets
    allows to pass callbacks for onClose to the hoc
    Currently we support 1 open at a time, possible to use the context
    to supply ordering and stacking
 */
