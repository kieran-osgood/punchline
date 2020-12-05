import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { LocalStorageKeys } from 'src/types';

const SettingsContext = React.createContext<{
  settings: Record<LocalStorageKeys, string>;
  setSettings: Dispatch<SetStateAction<Record<LocalStorageKeys, string>>>;
}>({
  settings: { [LocalStorageKeys.soundIsMuted]: '' },
  setSettings: () => {},
});

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState({
    [LocalStorageKeys.soundIsMuted]: '',
  });
  const value = {
    settings: settings,
    setSettings: setSettings,
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
