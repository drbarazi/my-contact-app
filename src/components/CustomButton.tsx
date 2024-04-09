import { Colors, Fonts } from '@theme';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
const CustomButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
      }}>
      <Text style={{color: Colors.WHITE, fontFamily: Fonts.TYPE.BOLD, fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;