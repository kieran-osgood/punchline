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
### bump_and_commit_versions
```
fastlane bump_and_commit_versions
```
Increments internal build number tracking (different than version)
### build_debug
```
fastlane build_debug
```
Build debug android configuration
### e2e_debug
```
fastlane e2e_debug
```

### e2e_release
```
fastlane e2e_release
```

### build_android_release_bundle
```
fastlane build_android_release_bundle
```
Build release android configuration
### beta
```
fastlane beta
```
Builds a release and pushes to beta track on play store
### generate_new_icons
```
fastlane generate_new_icons
```

### playstore
```
fastlane playstore
```
Build Release configuration and Google Play Store

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
