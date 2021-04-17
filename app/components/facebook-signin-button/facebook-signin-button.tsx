import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
// import { LoginManager, AccessToken } from 'react-native-fbsdk'

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface FacebookSigninButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const FacebookSigninButton = observer(function FacebookSigninButton(props: FacebookSigninButtonProps) {
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      <Text style={TEXT}>Hello</Text>
    </View>
  )
})
// export const FacebookSignIn = ({
//   isAnonymousConversion = false,
//   title = 'Log in with Facebook',
//   setIsLoading,
// }: {
//   isAnonymousConversion?: boolean;
//   setIsLoading?: (val: boolean) => void;
//   title?: string;
// }) => {
//   async function onFacebookButtonPress() {
//     if (setIsLoading) setIsLoading(true)
//     // Attempt login with permissions
//     await LoginManager.logInWithPermissions(['public_profile', 'email'])
//     // Once signed in, get the users AccesToken
//     const data = await AccessToken.getCurrentAccessToken()

//     if (!data) {
//       if (setIsLoading) setIsLoading(false)
//       crashlytics().log('Something went wrong obtaining access token')
//       return
//     }

//     // Create a Firebase credential with the AccessToken
//     const facebookCredential = auth.FacebookAuthProvider.credential(
//       data.accessToken,
//     )

//     if (isAnonymousConversion) {
//       convertFacebook(data.accessToken)
//     } else {
//       signInWithFacebook(facebookCredential)
//     }
//   }

//   const signInWithFacebook = (
//     facebookCredential: FirebaseAuthTypes.AuthCredential,
//   ) => {
//     auth()
//       .signInWithCredential(facebookCredential)
//       // .catch(() => crashlytics().log('Error signin in with facebook'))
//       .finally(() => {
//         if (setIsLoading) setIsLoading(false)
//       })
//   }

//   const convertFacebook = (accessToken: string | null) => {
//     const credential = auth.FacebookAuthProvider.credential(accessToken)
//     auth()
//       .currentUser?.linkWithCredential(credential)
//       .then(function () {
//         successPopup()
//       })
//       .catch(function () {
//         if (setIsLoading) setIsLoading(false)
//         errorPopup()
//         // crashlytics().log(`Error upgrading anonymous account ${error}`)
//       })
//   }

//   return (
//     <Button
//       title={title}
//       buttonStyle={PILL_BUTTON}
//       titleStyle={BUTTON_TITLE}
//       containerStyle={BUTTON_CONTAINER}
//       raised
//       icon={<Facebook style={BUTTON_ICON} />}
//       onPress={() => onFacebookButtonPress()}
//     />
//   )
// }
