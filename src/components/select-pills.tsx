import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type CategorySettings = Array<
  Record<'name' | 'isActive', string | boolean>
>;
interface Props {
  data: CategorySettings;
  activeStyle?: Record<string, string | number>;
  inactiveStyle?: Record<string, string | number>;
  onValueChange?: (data: Props['data']) => void;
}
const SelectPills = ({
  data,
  onValueChange,
  activeStyle,
  inactiveStyle,
}: Props) => {
  const [inputData, setInputData] = useState(data);

  function handlePress(i: number) {
    const _data = [...inputData];
    _data[i].isActive = !_data[i].isActive;
    handleDataChange(_data);
  }

  function handleDataChange(eData: Props['data']) {
    setInputData(eData);
    if (onValueChange) {
      onValueChange(eData);
    }
  }

  function handleStyles(isActive: boolean) {
    return isActive
      ? [styles.activeSelect, activeStyle]
      : [styles.inactiveSelect, inactiveStyle];
  }

  return (
    <View style={styles.container}>
      {inputData.map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => handlePress(i)}
            activeOpacity={0.9}
            style={[handleStyles(item.isActive), styles.select]}>
            <Text style={handleStyles(item.isActive)}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SelectPills;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  select: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'transparent',
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    marginRight: 8,
  },
  activeSelect: {
    backgroundColor: '#2b49f0',
    color: 'white',
    textTransform: 'capitalize',
  },
  inactiveSelect: {
    backgroundColor: '#dcdee8',
    color: 'black',
    textTransform: 'capitalize',
  },
});
