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
### android build_android_debug
```
fastlane android build_android_debug
```
Build debug android configuration
### android e2e_debug
```
fastlane android e2e_debug
```

### android build_android_release
```
fastlane android build_android_release
```
Build release android configuration
### android e2e_release
```
fastlane android e2e_release
```

### android build_android_release_bundle
```
fastlane android build_android_release_bundle
```
Build release android configuration
### android playstore
```
fastlane android playstore
```
Build Release configuration and Google Play Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
