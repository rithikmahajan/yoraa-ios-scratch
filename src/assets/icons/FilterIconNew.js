import React from 'react';
import Svg, { Path } from 'react-native-svg';

const FilterIcon = ({ width = 24, height = 24, color = '#000000' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 4H21L15 10V19L9 15V10L3 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default FilterIcon;
