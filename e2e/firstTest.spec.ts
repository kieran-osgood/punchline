// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

const { reloadApp } = require("./reload")

describe("Example", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("Loading a new app will take you to the login screen", async () => {
    await expect(element(by.label("App brand logo"))).toBeVisible()
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
  it("Completing onboarding sends you to the home page", async () => {})
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