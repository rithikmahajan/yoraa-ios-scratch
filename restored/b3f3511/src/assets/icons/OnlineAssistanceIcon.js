import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

const OnlineAssistanceIcon = ({ width = 80, height = 80, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 80" fill="none">
      <G>
        {/* Main person */}
        <Circle
          cx="40"
          cy="30"
          r="8"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M26 58C26 50 32 44 40 44C48 44 54 50 54 58"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        {/* Headset */}
        <Path
          d="M32 25C32 20 35 16 40 16C45 16 48 20 48 25"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M30 28L30 32C30 33 31 34 32 34L34 34C35 34 36 33 36 32L36 28"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M50 28L50 32C50 33 49 34 48 34L46 34C45 34 44 33 44 32L44 28"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        {/* Microphone */}
        <Path
          d="M40 34L40 38"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <Circle
          cx="40"
          cy="39"
          r="2"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Support dots */}
        <Circle cx="58" cy="25" r="2" fill={color} />
        <Circle cx="62" cy="35" r="2" fill={color} />
        <Circle cx="58" cy="45" r="2" fill={color} />
        <Circle cx="22" cy="25" r="2" fill={color} />
        <Circle cx="18" cy="35" r="2" fill={color} />
        <Circle cx="22" cy="45" r="2" fill={color} />
      </G>
    </Svg>
  );
};

export default OnlineAssistanceIcon;
