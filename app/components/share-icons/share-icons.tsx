import * as Sentry from "@sentry/react-native"
import { useStores } from "app/models"
import { Cross } from "assets/images/cross"
import { ErrorReportIcon } from "assets/images/error-report"
import { Success } from "assets/images/success"
import { Share as ShareIcon } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { API_URL } from "react-native-dotenv"
import Modal from "react-native-modal"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import Share from "react-native-share"
import Toast from "react-native-toast-message"
import { Button, Colors, Text, TextArea, TouchableOpacity, View } from "react-native-ui-lib"

export interface ShareIconsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  jokeId: string
}

/**
 * Describe your component here
 */
export const ShareIcons = observer(function ShareIcons(props: ShareIconsProps) {
  const [isModalVisible, setModalVisible] = React.useState(false)
  const { jokeId, style } = props

  return (
    <View style={style} row center>
      <ShareLink {...{ jokeId }} type="facebook">
        {/* <Facebook /> */}
      </ShareLink>
      <ShareLink {...{ jokeId }} type="twitter">
        {/* <Twitter /> */}
      </ShareLink>
      <JokeReportModal {...{ isModalVisible, setModalVisible }} />
      <Button
        round
        backgroundColor="transparent"
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
        iconSource={() => <ErrorReportIcon height={28} width={28} />}
      />
      <ShareLink {...{ jokeId }}>
        <ShareIcon scale={1.1} />
      </ShareLink>
    </View>
  )
})

const TEXT_AREA_CONTAINER: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.grey60,
}
export function assertNever<T>(_value: never): T {
  return _value
}

type LinkProps = {
  jokeId: string
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  type?: Type
}

type Type = "facebook" | "twitter" | "default"

export const ShareLink = ({ jokeId, children, style = {}, type = "default" }: LinkProps) => {
  /**
   * user clicks share button - we generate a url like: https://api.punch-line.co.uk/share/joke?id=46234623
   * next user clicks link
   * link is an associated domain in the android manifest and ios
   * on clicking it will check for a file:
   * ios: https://api.punch-line.co.uk/.well-known/apple-app-site-association
   * android: https://api.punch-line.co.uk/.well-known/assetlinks.json
   *
   * these will either direct the user to the app or to the website
   * the website should be an empty page with javascript to redirect to appstore
   *
   */

  const onPress = async () => {
    try {
      await Share.open({
        title: "",
        url: `${API_URL}/share/joke?id=${jokeId}`,
      })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <TouchableOpacity onPress={() => onPress()} style={style} padding-s2>
      {children}
    </TouchableOpacity>
  )
}

export default ShareLink

type JokeReportModalProps = {
  isModalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const JokeReportModal = (props: JokeReportModalProps) => {
  const { isModalVisible, setModalVisible } = props
  const [text, setText] = React.useState("")
  const {
    apiStore: { jokeApi, jokeReportApi },
  } = useStores()
  const opacity = useSharedValue(1)

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    display: opacity.value === 0 ? "none" : "flex",
  }))

  const opacity1 = useSharedValue(0)
  const style2 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
    display: opacity1.value === 0 ? "none" : "flex",
  }))

  const toggleModal = () => setModalVisible(!isModalVisible)

  const submit = () => {
    jokeReportApi
      .sendJokeReport({
        id: jokeApi.topOfDeckJoke.id,
        description: text,
      })
      .then(
        () => {
          opacity.value = withTiming(0, {}, (finished) => {
            if (finished) opacity1.value = 1
          })
        },
        () => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2:
              "Having trouble connecting to server. Please send an email through the settings page if this persists.",
            position: "bottom",
          })
        },
      )
  }

  return (
    <Modal
      isVisible={isModalVisible}
      // add alert to confirm closing?
      onBackdropPress={() => setModalVisible(false)}
      avoidKeyboard
      style={
        {
          // flex: 1,
          //  height: heightPercentageToDP("70%")
        }
      }
    >
      <View bg-white br40>
        <View paddingH-s5 paddingV-s5>
          <View row width="100%" spread top>
            <View />
            <Button
              label="x"
              onPress={toggleModal}
              round
              backgroundColor="transparent"
              iconSource={() => <Cross />}
              style={PADDING_0}
            />
          </View>

          {/* Initially displayed UI */}
          <Animated.View style={style}>
            <View>
              <Text text40BO>Report</Text>
              <Text
                marginT-s2
                text90L
                black
                highlightString={jokeApi.topOfDeckJoke.id}
                highlightStyle={{
                  color: Colors.grey20,
                }}
              >
                Id: {jokeApi.topOfDeckJoke.id}
              </Text>
              <Text
                text90L
                black
                highlightString={
                  jokeApi.topOfDeckJoke.title ?? "NEVER GONNA GIVE YOU UP NEVER GONNA LET YOU DOWN"
                }
                highlightStyle={{
                  color: Colors.grey20,
                }}
              >
                Subject: {jokeApi.topOfDeckJoke.title}
              </Text>
            </View>

            <View marginT-s3>
              <Text text80 marginB-s3>
                Provide a description of what this report is regarding.
              </Text>
              <View style={TEXT_AREA_CONTAINER} paddingH-s2 marginB-s4 height={150}>
                <TextArea
                  placeholder="Describe the issue"
                  value={text}
                  onChangeText={setText}
                  numberOfLines={3}
                />
              </View>
              <Text text90L marginB-s3>
                Please note details provided here will be reviewed by moderators, you will not be
                contacted of the result.
              </Text>

              <View row spread>
                <Button
                  label="Cancel"
                  onPress={() => setModalVisible(false)}
                  outline
                  br10
                  outlineColor="black"
                  color="black"
                  flex-1
                />
                <Button label="Submit" disabled={!text} onPress={submit} br10 flex-1 marginL-s1 />
              </View>
            </View>
          </Animated.View>
          {/* Only visible after submiting the form */}
          <Animated.View style={[FORM_SUBMITTED, style2]}>
            <View width="95%" centerH spread style={FORM_SUBMITTED_CONTAINER}>
              <Success width="50%" />
              <View center>
                <Text text50BO marginT-s5>
                  Report Received
                </Text>
                <Text marginT-s3>
                  Thank you for reporting this, and apologies for any inconvenience caused.
                </Text>
              </View>
            </View>
            <Button label="Close" onPress={() => setModalVisible(false)} marginT-s5 />
          </Animated.View>
        </View>
      </View>
    </Modal>
  )
}

const PADDING_0: ViewStyle = {
  padding: 0,
}
const FORM_SUBMITTED: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}
const FORM_SUBMITTED_CONTAINER: ViewStyle = {
  flex: 0.75,
}
