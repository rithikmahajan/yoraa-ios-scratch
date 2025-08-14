import React from 'react';
import Svg, { Rect, G, Path, Defs, ClipPath } from 'react-native-svg';

const CheckboxIcon = ({ 
  isChecked = false, 
  size = 20, 
  checkedColor = '#111111', 
  uncheckedBorderColor = '#BCBCBC',
  uncheckedBackgroundColor = 'transparent'
}) => {
  if (isChecked) {
    return (
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Rect 
          x="0.5" 
          y="0.5" 
          width="19" 
          height="19" 
          rx="2.5" 
          stroke={uncheckedBorderColor}
          fill={uncheckedBackgroundColor}
        />
        <G clipPath="url(#clip0_7406_16494)">
          <Path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M8.63121 10.6863L6.67606 8.73415L5.11133 10.2959L8.63128 13.8104L14.8891 7.56229L13.3244 6L8.63121 10.6863Z" 
            fill={checkedColor}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_7406_16494">
            <Rect width="9.77778" height="8" fill="white" transform="translate(5.11133 6)"/>
          </ClipPath>
        </Defs>
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Rect 
        x="0.5" 
        y="0.5" 
        width="19" 
        height="19" 
        rx="2.5" 
        stroke={uncheckedBorderColor}
        fill={uncheckedBackgroundColor}
      />
    </Svg>
  );
};

export default CheckboxIcon;
