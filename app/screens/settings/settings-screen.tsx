import React from "react"
import { observer } from "mobx-react-lite"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { Button, CenterView, JokeLengthSetting, PILL_BUTTON, Screen, Text } from "../../components"
import { color, spacing } from "theme"
import auth from "@react-native-firebase/auth"
import { BUG_REPORT_EMAIL } from "react-native-dotenv"

export const SettingsScreen = observer(function SettingsScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={CONTAINER}>
        <JokeLengthSetting />
        {/* <View style={ROWS_CONTAINER}> */}
          {/* <Text h1 bold text="Categories" /> */}
          {/* {auth().currentUser?.isAnonymous && <LoginConversion />} */}
          {/* <JokeLengthSetting /> */}
          {/* <CategorySetting /> */}
          {/* <BugReport /> */}
          {/* <LogoutButton /> */}
        {/* </View> */}
      </View>
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const ROWS_CONTAINER: ViewStyle = {
  paddingVertical: spacing[4],
}

// const CategorySetting = observer(() => {
//   const { store } = useQuery()
//   const categorySettings: CategorySettings[] = values(store.categories).map((category) => ({
//     id: category.id,
//     isActive: category.isActive,
//     name: category.name ?? "",
//   }))

//   const handleValueChanged = async (value: CategorySettings) => {
//     store.categories.get(value.id)?.update(value.isActive)
//   }

//   return (
//     <CenterView style={{ marginBottom: hp("2.5%") }}>
//       <Text h4 text="Categories" />
//       <SelectPills
//         data={categorySettings ?? []}
//         onValueChange={(value) => handleValueChanged(value)}
//       />
//     </CenterView>
//   )
// })

const LOGOUT_BUTTON: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: color.text,
}

const LogoutButton = () => {
  return (
    <Button
      text="Logout"
      style={PILL_BUTTON}
      textStyle={LOGOUT_BUTTON}
      onPress={() => auth().signOut()}
    />
  )
}

const LOGIN_CONVERSION: ViewStyle = {
  paddingBottom: spacing[4],
  width: "100%",
}

const LoginConversion = () => (
  <CenterView style={LOGIN_CONVERSION}>
    <Text text="Link via your social media account in order to save your bookmarks and preferences." />
    {/* <GoogleSignIn isAnonymousConversion={true} /> */}
    {/* <FacebookSignIn isAnonymousConversion={true} /> */}
  </CenterView>
)

const BUG_REPORT_BUTTON: ViewStyle = {
  ...PILL_BUTTON,
  backgroundColor: color.error,
}

const BUG_BUTTON_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: color.text,
}

const BugReport = () => {
  const onPress = () => Linking.openURL(BUG_REPORT_EMAIL)
  return (
    <Button
      text="Bug Report"
      style={BUG_REPORT_BUTTON}
      textStyle={BUG_BUTTON_TEXT}
      {...{ onPress }}
    />
  )
}
