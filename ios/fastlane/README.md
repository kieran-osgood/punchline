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

### generate_new_icons
```
fastlane generate_new_icons
```

### beta
```
fastlane beta
```
Builds a release and pushes to testflight
### build_appstore_ios
```
fastlane build_appstore_ios
```
Run tests and build the app
### e2e_release
```
fastlane e2e_release
```


----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
