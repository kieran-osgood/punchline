encrypt_file_to_secrets:
	gpg --cipher-algo AES256  --passphrase="$(passphrase)" --batch --yes -c $(file) && \
	mv $(file).gpg android/app/punchlinekeys

# Run this firs with the encryption passphrase from 1Password to move the release keystore to the android folder
init:
	git submodule sync && \
	git submodule update --init && \
	gpg -d --pinentry-mode loopback --batch --yes --passphrase="$(passphrase)" --output android/app/punchline.keystore --decrypt android/app/punchlinekeys/punchline.keystore.gpg && \
	gpg -d --pinentry-mode loopback --batch --yes --passphrase="$(passphrase)" --output android/fastlane/fastlane-service-account.json --decrypt android/app/punchlinekeys/fastlane-service-account.json.gpg

android_debug:
	cd android && bundle exec fastlane build_release_android --env development

# Run `init` first if first time running this command
android_release: 
	cd android && bundle exec fastlane build_release_local_android --env production

android_playstore: 
	cd android && bundle exec fastlane build_release_android --env production

ios_debug: 
	cd ios && bundle exec fastlane build_release_ios --env development
ios_release: 
	cd ios && bundle exec fastlane build_release_ios --env production
	