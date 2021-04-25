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
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "theme"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import auth from "@react-native-firebase/auth"
import { JokeLength } from "app/graphql/JokeLengthEnum"

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
  width: "100%",
}

const SCROLL: ViewStyle = {
  width: "100%",
}

export const SettingsScreen = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <CenterView>
        <ScrollView style={SCROLL}>
          <View>
            <Text h3 style={TITLE}>
              Settings
            </Text>
            <CenterView
              style={{
                paddingVertical: hp("2.5%"),
              }}
            >
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
  // console.log("create", JokeLengthEnumType.create("SMALL"))

  const checked = (thisLength: JokeLength, selectedLength: JokeLength | undefined): boolean => {
    return (
      JokeLengths.indexOf(thisLength) <= JokeLengths.indexOf(selectedLength ?? JokeLength.SMALL)
    )
  }

  return (
    <CenterView style={JOKE_LENGTH_CONTAINER}>
      <Text h4>Joke Length</Text>
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

const CategorySetting = () => {
  // const { userCategories, categories: apiCategories } = useCategoriesContext()
  // const [categories, setCategories] = React.useState<CategorySettings[] | undefined>(() =>
  //   apiCategories?.map((category) => {
  //     const match = userCategories?.find((x) => x.id === category.id)
  //     if (match) {
  //       return { ...category, ...match }
  //     }
  //     return { ...category, isActive: false }
  //   }),
  // )
  const [categories, setCategories] = React.useState([])

  const handleValueChanged = async (value: CategorySettings[]) => {
    // const user = await getCurrentUser()
    // user.set({ categories: value })
    // setCategories(value)
  }

  return (
    <CenterView style={{ marginBottom: hp("2.5%") }}>
      <Text h4>Categories</Text>
      <SelectPills data={categories ?? []} onValueChange={(value) => handleValueChanged(value)} />
    </CenterView>
  )
}

const LOGOUT_BUTTON: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: color.text,
}
const LogoutButton = () => {
  return (
    <View>
      <Button
        style={PILL_BUTTON}
        textStyle={LOGOUT_BUTTON}
        // containerStyle={BUTTON_CONTAINER}
        onPress={() => auth().signOut()}
        text="Logout"
      />
    </View>
  )
}

const LoginConversion = () => {
  return (
    <CenterView style={{ paddingBottom: spacing[4] }}>
      <Text text="Link via your social media account in order to save your bookmarks and preferences." />
      {/* <GoogleSignIn isAnonymousConversion={true} /> */}
      {/* <FacebookSignIn isAnonymousConversion={true} /> */}
    </CenterView>
  )
}

const BUG_BUTTON: ViewStyle = {
  ...PILL_BUTTON,
  backgroundColor: color.error,
}

const BUG_BUTTON_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: color.text,
}

const BugReport = () => {
  return (
    <Button
      style={BUG_BUTTON}
      textStyle={BUG_BUTTON_TEXT}
      // containerStyle={BUTTON_CONTAINER}
      text="Bug Report"
      onPress={() =>
        Linking.openURL(
          "mailto:ko.dev.issues@gmail.com?subject=Punchline Bug Report&body=Explain the issue you had.",
        )
      }
    />
  )
}
