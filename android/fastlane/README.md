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
### build_debug_apk
```
fastlane build_debug_apk
```
Build debug apk
### build_release_apk
```
fastlane build_release_apk
```
Builds release apk - for local debugging
### build_release_aab
```
fastlane build_release_aab
```
Build release aab
### e2e_debug
```
fastlane e2e_debug
```

### e2e_release
```
fastlane e2e_release
```

### beta
```
fastlane beta
```
Builds a release and pushes to beta track on play store
### playstore
```
fastlane playstore
```
Build Release configuration and Google Play Store

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
