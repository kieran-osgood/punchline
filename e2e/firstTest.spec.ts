// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md
import * as d from "detox"
import reloadApp from "./reload"
const { execSync } = require("child_process")

const storeScreenshot = async (name: string) => {
  const screenshot = await d.device.takeScreenshot(name)
  // detox runs in root dir - fastlane generates screenshots so we store in each place
  execSync(`cp ${screenshot} $(pwd)/ios/fastlane/screenshots/${name}.png`)
  execSync(`cp ${screenshot} $(pwd)/android/fastlane/screenshots/${name}.png`)
}

describe("Example", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("Loading a new app will take you to the login screen", async () => {
    await d.element(by.id("login-screen")).tap()
    await d.element(by.label("App brand logo")).atIndex(1)
    await storeScreenshot("login-screen")
  })

  it("", async () => {
    // FIXME Test that these take us away?
    await d.element(by.text("Terms of Service")).tap()
    await d.element(by.text("Privacy Policy.")).tap()

    // FIXME Test that these open a view?
    await d.element(by.text("Sign in with Google"))
    await d.element(by.text("Sign in with Apple"))
    await d.element(by.text("Sign in with Facebook"))
  })

  it("Can log in as guest and pass onboarding", async () => {
    // ? use this to log us in and take us to through the onboarding flow
    await d.element(by.text("Sign in as Guest")).tap()

    await d.element(by.text("Personalise your experience")).tap()
    await d.element(by.label("Next")).atIndex(0).tap()
    await d.element(by.text("Next")).atIndex(1).tap()
    await d.element(by.text("Publish your own")).tap()
    await d.element(by.text("Let's get started")).tap()

    // FIXME add assertion that we are on the joke-screen
    await d.element(by.id("joke-screen")).tap()
  })

  it("Options sheet - opens/dismisses as expected - reportJoke form can be submitted successfully", async () => {
    // await d.element(by.text("\ue661")).tap() // bookmarkbutton

    await d.element(by.id("joke-screen")).tap()

    // ? sheet allows openinng and closing of the options-sheet
    // FIXME need to strengthen the find on this element
    await d.element(by.type("RNSVGSvgView")).atIndex(4).tap() // joke-options
    await d.element(by.text("Report Joke")).tap()
    await d.element(by.text("Cancel")).tap()

    // ? Test we can open and submit joke reports
    // FIXME need to strengthen the find on this element
    await d.element(by.type("RCTView")).atIndex(231).tap() // joke-options
    await d.element(by.label("Report Joke")).atIndex(3).tap()
    await d.element(by.label("Describe the issue")).atIndex(3).tap()
    await d.element(by.text("Bc")).replaceText("Bc")
    await d.element(by.text("Submit")).tap()
    await d.element(by.text("Report Received")).tap()
    await d.element(by.text("Close")).tap()
  })

  //  it('Opens trouble-signing-in sheet and renders content', async () => {})
  //  it('trouble-signing-in-sheet accepts input and dispatches to send login link', async () => {})
  //  it('social buttons open provider sign in and navigate to onboarding/joke-screen', async () => {})
  //  it('Guest sign in always takes you to onboarding screen', async () => {})
  //  it('', async () => {})

  // SettingsScreen
  // HistoryScreen
  // JokeScreen
  // Header

  //  it('', async () => {})
  // it("Completing onboarding sends you to the home page", async () => {})
  // it("should have login screen", async () => {
  //   await expect(element(by.id("LoginScreen"))).toBeVisible()
  // })

  // it("should have welcome screen", async () => {
  //   await element(by.text('Continue as guest')).tap();

  //   await waitFor(element(by.id("JokeScreen"))).toBeVisible().withTimeout(4000)
  // })

  // it("should go to next screen after tap", async () => {
  //   await element(by.id("next-screen-button")).tap()
  //   await expect(element(by.id("DemoScreen"))).toBeVisible()
  // })
})
