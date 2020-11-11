import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-elements';

import { color, spacing } from 'theme';

import { BUTTON_CONTAINER, PILL_BUTTON } from 'auth/screens/login-choices';

import Text from 'components/text';
import CenterView from 'components/centerview';
import SelectPills, { CategorySettings } from 'components/select-pills';
import { getCategories, getCurrentUser } from 'src/app/api';
import useGetUserCategories from 'components/useGetUserCategories';

export default function Settings() {
  const userCategories = useGetUserCategories();
  const [categories, setCategories] = React.useState<CategorySettings[]>([]);

  useEffect(() => {
    async function fetchData() {
      const categoriesApi = await getCategories();
      const results = categoriesApi.map((category) => {
        const match = userCategories?.find((x) => x.id === category.id);
        if (match) {
          return { ...category, ...match };
        }
        return category;
      });
      setCategories(results);
    }
    fetchData();
  }, [userCategories]);

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
          data={categories}
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
