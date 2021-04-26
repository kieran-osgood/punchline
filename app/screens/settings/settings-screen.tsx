import React from "react"
import { observer } from "mobx-react-lite"
import { Linking, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  CategorySettings,
  CenterView,
  PILL_BUTTON,
  Screen,
  SelectPills,
  Text,
} from "../../components"
import { color, spacing } from "theme"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import auth from "@react-native-firebase/auth"
import { JokeLength } from "app/graphql/JokeLengthEnum"
import { useQuery } from "app/graphql/reactUtils"
import { values } from "mobx"
import { BUG_REPORT_EMAIL } from 'react-native-dotenv'

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const SETTING_ROW: ViewStyle = {
  width: "100%",
  paddingRight: spacing[3],
  marginBottom: hp("2.5%"),
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottomColor: "#fff",
  borderBottomWidth: 10,
}

const TITLE: TextStyle = {
  textAlign: "center",
}

const SCROLL: ViewStyle = {
  width: "100%",
}

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const ROWS_CONTAINER: ViewStyle = {
  paddingVertical: spacing[4],
}

export const SettingsScreen = observer(function SettingsScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
      <CenterView style={CONTAINER}>
        <ScrollView style={SCROLL}>
          <View>
            <Text h3 style={TITLE} text="Settings" />
            <CenterView style={ROWS_CONTAINER}>
              {auth().currentUser?.isAnonymous && <LoginConversion />}
              <JokeLengthSetting />
              <CategorySetting />
              <BugReport />
              <LogoutButton />
            </CenterView>
          </View>
        </ScrollView>
      </CenterView>
    </Screen>
  )
})

const JOKE_LENGTH_CONTAINER: ViewStyle = {
  ...SETTING_ROW,
  flexDirection: "column",
  alignItems: "flex-start",
}

const ROW: ViewStyle = {
  flexDirection: "row",
  paddingTop: spacing[2],
}

const CHECKBOX: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "33%",
}

const JokeLengths: JokeLength[] = Object.keys(JokeLength)
  .map((k) => JokeLength[k as keyof typeof JokeLength])
  .map((v) => v as JokeLength)

const JokeLengthSetting = () => {
  // const [jokeLength, setJokeLength] = useSetting<JokeLengthSetting>(
  //   LocalStorageKeys.jokeLength,
  //   'short',
  // )

  const checked = (thisLength: JokeLength, selectedLength: JokeLength | undefined): boolean => {
    return (
      JokeLengths.indexOf(thisLength) <= JokeLengths.indexOf(selectedLength ?? JokeLength.SMALL)
    )
  }

  return (
    <CenterView style={JOKE_LENGTH_CONTAINER}>
      <Text h4 text="Joke Length" />
      <View style={ROW}>
        {JokeLengths.map((length) => (
          <View key={length} style={CHECKBOX}>
            <Text text={length.toLocaleUpperCase()} />
            {/* <CheckBox
            checked={checked(length, jokeLength)}
            size={35}
            onPress={() => setJokeLength(length)}
            checkedColor={color.success}
            uncheckedColor={color.primaryDarker}
          /> */}
          </View>
        ))}
      </View>
    </CenterView>
  )
}

const CategorySetting = observer(() => {
  const { store } = useQuery()
  const categorySettings: CategorySettings[] = values(store.categories).map((category) => ({
    id: category.id,
    isActive: category.isActive,
    name: category.name ?? "",
  }))

  const handleValueChanged = async (value: CategorySettings) => {
    store.categories.get(value.id)?.update(value.isActive)
  }

  return (
    <CenterView style={{ marginBottom: hp("2.5%") }}>
      <Text h4 text="Categories" />
      <SelectPills
        data={categorySettings ?? []}
        onValueChange={(value) => handleValueChanged(value)}
      />
    </CenterView>
  )
})

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
