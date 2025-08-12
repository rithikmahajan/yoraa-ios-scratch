import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CameraIcon = ({ width = 24, height = 24, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 3H15L17 6H21C21.5523 6 22 6.44772 22 7V19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19V7C2 6.44772 2.44772 6 3 6H7L9 3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CameraIcon;
