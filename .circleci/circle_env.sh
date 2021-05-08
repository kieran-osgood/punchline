#!/usr/bin/env bash

function copyEnvVarsToGradleProperties {
    DIR="$(pwd)"
    GRADLE_PROPERTIES=${DIR}"/<path_to_gradle.properties>"
    export GRADLE_PROPERTIES
    echo "Gradle Properties should exist at $GRADLE_PROPERTIES"

    if [[ ! -f "$GRADLE_PROPERTIES" ]]; then
        echo "Gradle Properties does not exist"

        echo "Creating Gradle Properties file..."
        touch $GRADLE_PROPERTIES

        echo "Writing keys to gradle.properties..."
        echo "KEYSTORE_FILE=$KEYSTORE_FILE" >> ${GRADLE_PROPERTIES}
        echo "KEYSTORE_PASSWORD=$KEYSTORE_PASSWORD" >> ${GRADLE_PROPERTIES}
        echo "KEY_ALIAS=$KEY_ALIAS" >> ${GRADLE_PROPERTIES}
        echo "KEY_PASSWORD=$KEY_PASSWORD" >> ${GRADLE_PROPERTIES}
    fi
}

function fetchKeystore {
    sudo gpg --passphrase ${KEYSTORE_ENCRYPTION_KEY} --pinentry-mode loopback -o "app/$KEYSTORE_FILE" -d "<path_to_keystore>/$KEYSTORE_FILE.gpg"
}