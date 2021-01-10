import { useAsyncStorage } from '@react-native-community/async-storage';
import React from 'react';
import { LocalStorageKeys } from 'src/types';

export default function useSetting<T extends string>(
  key: LocalStorageKeys,
  defaultValue: T,
): [typeof defaultValue, (t: T) => Promise<void>] {
  const [setting, setSetting] = React.useState<typeof defaultValue>(
    defaultValue,
  );
  const { getItem, setItem } = useAsyncStorage(key);

  const storeData = async (value: T) => {
    setSetting(value);
    await setItem(String(value));
  };

  React.useEffect(() => {
    getItem().then((res) => {
      setSetting(res as T);
    });
  }, [getItem]);

  return [setting, storeData];
}
