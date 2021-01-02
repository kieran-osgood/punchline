import React from 'react';
import { ScrollView, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useAsyncStorage } from '@react-native-community/async-storage';

import { color, spacing } from 'theme';

import { BUTTON_CONTAINER, PILL_BUTTON } from 'auth/screens/login-choices';

import Text from 'components/text';
import CenterView from 'components/centerview';
import SelectPills, { CategorySettings } from 'components/select-pills';
import { getCurrentUser } from 'src/app/api';
import { useCategoriesContext } from 'components/categories-context';
import { LocalStorageKeys } from 'src/types';

export type SoundSetting = 'muted' | 'unmuted';

export default function Settings() {
  return (
    <CenterView>
      <ScrollView style={{ paddingTop: wp('10%') }}>
        <Text h3 style={{ alignSelf: 'center' }}>
          Settings
        </Text>
        <CenterView
          style={{
            width: wp('90%'),
            paddingVertical: hp('2.5%'),
          }}>
          <SoundSetting />
          <CategorySetting />
          <LogoutButton />
        </CenterView>
      </ScrollView>
    </CenterView>
  );
}

const SoundSetting = () => {
  const [soundSetting, setSoundSetting] = React.useState<SoundSetting>();
  const { getItem, setItem } = useAsyncStorage(LocalStorageKeys.soundIsMuted);

  const storeData = async (value: SoundSetting) => {
    await setItem(String(value));
  };
  React.useEffect(() => {
    getItem().then((res) => {
      setSoundSetting(res as SoundSetting);
    });
  }, [getItem]);

  return (
    <>
      <CenterView
        style={{
          width: '100%',
          paddingRight: spacing[3],
          marginBottom: hp('2.5%'),
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: '#fff',
          borderBottomWidth: 10,
        }}>
        <Text h4>Sound</Text>
        <Icon
          name={soundSetting === 'muted' ? 'volume-mute' : 'volume-up'}
          size={35}
          onPress={() => {
            setSoundSetting((current) =>
              current === 'muted' ? 'unmuted' : 'muted',
            );
            storeData(soundSetting === 'muted' ? 'unmuted' : 'muted');
          }}
        />
      </CenterView>
    </>
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
    const user = await getCurrentUser(false);
    user.set({ categories: value });
    setCategories(value);
  };

  return (
    <>
      <CenterView style={{ marginBottom: hp('2.5%') }}>
        <Text h4 style={{ alignSelf: 'flex-start' }}>
          Categories
        </Text>
        <SelectPills
          data={categories ?? []}
          onValueChange={(value) => handleValueChanged(value)}
        />
      </CenterView>
    </>
  );
};

const LogoutButton = () => {
  return (
    <>
      <View>
        <Button
          buttonStyle={PILL_BUTTON}
          titleStyle={{ color: color.text }}
          containerStyle={BUTTON_CONTAINER}
          onPress={() => auth().signOut()}
          title="Logout"
          raised
        />
      </View>
    </>
  );
};
