import React from 'react';
import { ScrollView, View, ViewStyle, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { color, spacing } from 'theme';

import {
  BUTTON_CONTAINER,
  FacebookSignIn,
  GoogleSignIn,
  PILL_BUTTON,
} from 'auth/screens/login-choices';

import Text from 'components/text';
import CenterView from 'components/centerview';
import SelectPills, { CategorySettings } from 'components/select-pills';
import { getCurrentUser } from 'src/app/api';
import { useCategoriesContext } from 'components/categories-context';
import { LocalStorageKeys } from 'src/types';
import useSetting from 'src/hooks/use-setting';

const SETTING_ROW: ViewStyle = {
  width: '100%',
  paddingRight: spacing[3],
  marginBottom: hp('2.5%'),
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomColor: '#fff',
  borderBottomWidth: 10,
};

export default function Settings() {
  return (
    <CenterView>
      <ScrollView>
        <View style={{ paddingTop: hp('5%') }}>
          <Text h3 style={{ alignSelf: 'center' }}>
            Settings
          </Text>
          <CenterView
            style={{
              width: wp('90%'),
              paddingVertical: hp('2.5%'),
            }}>
            {auth().currentUser?.isAnonymous && <LoginConversion />}
            <SoundSetting />
            <JokeLengthSetting />
            <CategorySetting />
            <BugReport />
            <LogoutButton />
          </CenterView>
        </View>
      </ScrollView>
    </CenterView>
  );
}

const jokeLengths = ['short', 'medium', 'long'] as const;
export type JokeLengthSetting = typeof jokeLengths[number];

const JokeLengthSetting = () => {
  const [jokeLength, setJokeLength] = useSetting<JokeLengthSetting>(
    LocalStorageKeys.jokeLength,
    'short',
  );

  const checked = (
    thisLength: JokeLengthSetting,
    selectedLength: JokeLengthSetting | undefined,
  ): boolean => {
    return (
      jokeLengths.indexOf(thisLength) <=
      jokeLengths.indexOf(selectedLength ?? 'short')
    );
  };

  return (
    <CenterView
      style={{
        ...SETTING_ROW,
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
      <Text h4>Joke Length</Text>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: spacing[2],
        }}>
        {jokeLengths.map((length) => (
          <View
            key={length}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '33%',
            }}>
            <Text text={length.toLocaleUpperCase()} />
            <CheckBox
              checked={checked(length, jokeLength)}
              size={35}
              onPress={() => setJokeLength(length)}
              checkedColor={color.success}
              uncheckedColor={color.primaryDarker}
            />
          </View>
        ))}
      </View>
    </CenterView>
  );
};

export type SoundSetting = 'muted' | 'unmuted';

const SoundSetting = () => {
  const [sound, setSound] = useSetting<SoundSetting>(
    LocalStorageKeys.soundIsMuted,
    'unmuted',
  );

  return (
    <CenterView style={SETTING_ROW}>
      <Text h4>Sound</Text>
      <Icon
        name={sound === 'muted' ? 'volume-mute' : 'volume-up'}
        size={35}
        onPress={() => setSound(sound === 'muted' ? 'unmuted' : 'muted')}
      />
    </CenterView>
  );
};

const CategorySetting = () => {
  const { userCategories, categories: apiCategories } = useCategoriesContext();
  const [categories, setCategories] = React.useState<
    CategorySettings[] | undefined
  >(() =>
    apiCategories?.map((category) => {
      const match = userCategories?.find((x) => x.id === category.id);
      if (match) {
        return { ...category, ...match };
      }
      return { ...category, isActive: false };
    }),
  );

  const handleValueChanged = async (value: CategorySettings[]) => {
    const user = await getCurrentUser();
    user.set({ categories: value });
    setCategories(value);
  };

  return (
    <CenterView style={{ marginBottom: hp('2.5%') }}>
      <Text h4 style={{ alignSelf: 'flex-start' }}>
        Categories
      </Text>
      <SelectPills
        data={categories ?? []}
        onValueChange={(value) => handleValueChanged(value)}
      />
    </CenterView>
  );
};

const LogoutButton = () => {
  return (
    <View>
      <Button
        buttonStyle={PILL_BUTTON}
        titleStyle={{
          fontSize: 18,
          fontWeight: 'bold',
          color: color.text,
        }}
        containerStyle={BUTTON_CONTAINER}
        onPress={() => auth().signOut()}
        title="Logout"
        raised
      />
    </View>
  );
};

const LoginConversion = () => {
  return (
    <CenterView style={{ paddingBottom: spacing[4] }}>
      <Text text="Link via your social media account in order to save your bookmarks and preferences." />
      <GoogleSignIn isAnonymousConversion={true} />
      <FacebookSignIn isAnonymousConversion={true} />
    </CenterView>
  );
};

const BugReport = () => {
  return (
    <Button
      buttonStyle={{
        ...PILL_BUTTON,
        backgroundColor: color.error,
      }}
      titleStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
      containerStyle={BUTTON_CONTAINER}
      title="Bug Report"
      onPress={() =>
        Linking.openURL(
          'mailto:ko.dev.issues@gmail.com?subject=Punchline Bug Report&body=Explain the issue you had.',
        )
      }
    />
  );
};
