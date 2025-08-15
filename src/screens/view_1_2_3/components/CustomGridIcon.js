import React from 'react';
import Svg, { Rect, G, Defs, ClipPath } from 'react-native-svg';

// Custom Grid Icon that changes based on view mode
const CustomGridIcon = ({ width = 24, height = 24, color = '#000000', viewMode = 0 }) => {
  if (viewMode === 0) {
    // Default 2x2 grid (30x30 viewBox scaled to fit)
    return (
      <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
        <Rect 
          x="5.75031" 
          y="5.75" 
          width="7.25" 
          height="7.25" 
          stroke={color} 
          strokeWidth="1.5"
        />
        <Rect 
          x="5.75031" 
          y="17" 
          width="7.25" 
          height="7.25" 
          stroke={color} 
          strokeWidth="1.5"
        />
        <Rect 
          x="17.0003" 
          y="5.75" 
          width="7.25" 
          height="7.25" 
          stroke={color} 
          strokeWidth="1.5"
        />
        <Rect 
          x="17.0003" 
          y="17" 
          width="7.25" 
          height="7.25" 
          stroke={color} 
          strokeWidth="1.5"
        />
      </Svg>
    );
  } else if (viewMode === 1) {
    // 3-column grid (22x22 viewBox scaled to fit)
    return (
      <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
        <G clipPath="url(#clip0_244_7426)">
          <Rect 
            x="1.54761" 
            y="1.5" 
            width="5.16247" 
            height="8.33334" 
            stroke={color}
          />
          <Rect 
            x="8.94263" 
            y="1.5" 
            width="5.16247" 
            height="8.33334" 
            stroke={color}
          />
          <Rect 
            x="16.3375" 
            y="1.5" 
            width="5.16247" 
            height="8.33334" 
            stroke={color}
          />
          <Rect 
            x="1.54761" 
            y="12.1666" 
            width="5.16247" 
            height="8.33334" 
            stroke={color}
          />
          <Rect 
            x="8.94263" 
            y="12.1666" 
            width="5.16247" 
            height="8.33334" 
            stroke={color}
          />
          <Rect 
            x="16.3375" 
            y="12.1666" 
            width="5.16247" 
            height="8.33334" 
            stroke={color}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_244_7426">
            <Rect width="22" height="22" fill="white"/>
          </ClipPath>
        </Defs>
      </Svg>
    );
  } else {
    // Staggered 2x2 grid (24x24 viewBox)
    return (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Rect 
          x="5.5" 
          y="4.5" 
          width="6" 
          height="7" 
          stroke={color}
        />
        <Rect 
          x="5.5" 
          y="13.5" 
          width="6" 
          height="7" 
          stroke={color}
        />
        <Rect 
          x="13.5" 
          y="3.5" 
          width="6" 
          height="7" 
          stroke={color}
        />
        <Rect 
          x="13.5" 
          y="12.5" 
          width="6" 
          height="7" 
          stroke={color}
        />
      </Svg>
    );
  }
};

export default CustomGridIcon;
