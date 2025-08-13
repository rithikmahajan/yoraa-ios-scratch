import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CheckmarkIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17l-5-5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export default CheckmarkIcon;
