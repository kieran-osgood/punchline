import React from 'react';
import { View, ViewStyle } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-elements';

import { color, spacing } from 'theme';

import { BUTTON_CONTAINER, PILL_BUTTON } from 'auth/screens/login-choices';

import Text from 'components/text';
import CenterView from 'components/centerview';
import SelectPills, { CategorySettings } from 'components/select-pills';
import { getCurrentUser } from 'src/app/api';
import { useCategoriesContext } from 'components/categories-context';

export default function Settings() {
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
    <CenterView style={CONTAINER}>
      <CenterView style={{ flex: 0, marginBottom: 80, width: '100%' }}>
        <Text h3>Categories</Text>
        <SelectPills
          data={categories ?? []}
          onValueChange={(value) => handleValueChanged(value)}
        />
      </CenterView>
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
    </CenterView>
  );
}
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[3],
};
