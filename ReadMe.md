# Punchline

[![Build Status](https://travis-ci.com/KieranO547/punchline.svg?token=BjF8iyirXgqcXsHDyKLt&branch=master)](https://travis-ci.com/KieranO547/punchline)

## Build Stack

- React Native
- Typescript
- Expo (Bare Workflow)
- Firebase (Authentication/Firestore/Admob)
- Jest

## Deploy Processes

The setup for releasing builds is as follows.
There are 3 types of Build Type configurations:

    - Debug - this will follow a node.js debug configuration
    - Staging - this will follow a node.js release configuration
    - Release - this will follow a node.js release configuration

Staging is exactly the same as Release, except it is a way of checking on devices that the update has not caused issues.
When releasing a new app update, first test on debug locally, then `make codepush-${PLATFORM}-staging`, re-validate that the update is not causing bugs, and then promote/re-publish to production.
