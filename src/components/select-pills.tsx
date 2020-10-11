import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from 'components/text';

import { color } from 'theme';

export type CategorySettings = {
  id: string;
  name: string;
  isActive: boolean;
};

interface Props {
  data: CategorySettings[];
  onValueChange?: (data: Props['data']) => void;
}

const SelectPills = ({ data, onValueChange }: Props) => {
  const [inputData, setInputData] = useState(data);

  useEffect(() => {
    setInputData(data);
  }, [data]);

  const handlePress = (i: number) => {
    const _data = [...inputData];
    _data[i].isActive = !_data[i].isActive || false;
    handleDataChange(_data);
  };

  const handleDataChange = (eData: Props['data']) => {
    setInputData(eData);
    if (onValueChange) {
      onValueChange(eData);
    }
  };

  const handleStyles = (isActive: boolean) =>
    isActive ? styles.activeSelect : styles.inactiveSelect;

  return (
    <View style={styles.container}>
      {inputData.map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => handlePress(i)}
            activeOpacity={0.9}
            style={{ ...handleStyles(!!item.isActive), ...styles.select }}>
            <Text style={{ ...handleStyles(!!item.isActive) }}>
              {item.name}
            </Text>
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
    borderRadius: 15,
    borderColor: 'transparent',
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    marginRight: 8,
  },
  activeSelect: {
    backgroundColor: color.success,
    color: color.line,
  },
  inactiveSelect: {
    backgroundColor: color.primaryDarker,
    color: color.text,
  },
});
