encrypt_file_to_secrets:
	gpg --cipher-algo AES256  --passphrase="$(passphrase)" --batch --yes -c $(file) && \
	mv $(file).gpg android/app/punchline-keys/

# Run this firs with the encryption passphrase from 1Password to move the release keystore to the android folder
init:
	git submodule sync && \
	git submodule update --init && \
	gpg -d --pinentry-mode loopback --batch --yes --passphrase="$(passphrase)" --output android/app/punchline.keystore --decrypt android/app/punchline-keys/punchline.keystore.gpg && \
	gpg -d --pinentry-mode loopback --batch --yes --passphrase="$(passphrase)" --output android/fastlane/fastlane-service-account.json --decrypt android/app/punchline-keys/fastlane-service-account.json.gpg && \
	gpg -d --pinentry-mode loopback --batch --yes --passphrase="$(passphrase)" --output ios/fastlane/AuthKey_LXL29858RV.p8 --decrypt android/app/punchline-keys/AuthKey_LXL29858RV.p8.gpg

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
	
create_avd:
	echo "no" | avdmanager --verbose create avd -n "android_29_avd" -k "system-images;android-29;default;x86" 
publish_patch:
# TODO: implement patch make command
# get last tagged commit
# increment the patch version number and commit
# run expo publish 
