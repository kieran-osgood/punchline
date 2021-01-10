android-release-aab:
	cd android && ./gradlew bundleRelease && cd ..

android-release-apk:
	cd android && ./gradlew assembleRelease && cd ..

codepush-android-production:
	appcenter codepush release-react -a KieranO/punchline -d Production
codepush-android-staging:
	appcenter codepush release-react -a KieranO/punchline -d Staging
codepush-promote-android:
	appcenter codepush promote -a KieranO/punchline 
		
codepush-ios-production:
	appcenter codepush release-react -a KieranO/punchline-1 -d Production
codepush-ios-staging:
	appcenter codepush release-react -a KieranO/punchline-1 -d Staging
codepush-promote-ios:
	appcenter codepush promote -a KieranO/punchline-1
