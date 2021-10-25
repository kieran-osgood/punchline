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
### generate_screenshots
```
fastlane generate_screenshots
```

### bump_and_commit_versions
```
fastlane bump_and_commit_versions
```

### e2e_debug_build
```
fastlane e2e_debug_build
```

### e2e_debug_test
```
fastlane e2e_debug_test
```

### e2e_release
```
fastlane e2e_release
```

### beta
```
fastlane beta
```
Builds a release and pushes to testflight
### release_appstore
```
fastlane release_appstore
```
Run tests and build the app
### generate_new_icons
```
fastlane generate_new_icons
```


----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
