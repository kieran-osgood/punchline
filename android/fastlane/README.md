fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## Android
### android bump_build_number
```
fastlane android bump_build_number
```
Increments internal build number tracking (different than version)
### android e2e
```
fastlane android e2e
```

### android build_debug_android
```
fastlane android build_debug_android
```
Build debug android configuration
### android build_release_android
```
fastlane android build_release_android
```

### android playstore
```
fastlane android playstore
```
Build Release configuration and Google Play Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
