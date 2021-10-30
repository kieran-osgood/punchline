import auth from "@react-native-firebase/auth"
import { useStores } from "app/models"
import * as React from "react"

export const useAuthorization = () => {
  const { apiStore, userStore } = useStores()

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      userStore.login(user)
    })

    const unsubscribe2 = auth().onIdTokenChanged(async (user) => {
      const token = await user?.getIdToken()
      if (!token) return
      apiStore.api.setBearerToken(token)
    })

    return () => {
      unsubscribe()
      unsubscribe2()
    }
  }, [apiStore.api, userStore])

  return null
}

export default useAuthorization
