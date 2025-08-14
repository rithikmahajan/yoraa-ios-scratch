import React from 'react';
import Svg, { Path } from 'react-native-svg';

const EyeIcon = ({ 
  size = 20, 
  color = '#666666',
  style,
  visible = true
}) => {
  if (visible) {
    // Eye open icon
    return (
      <Svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none"
        style={style}
      >
        <Path 
          d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <Path 
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </Svg>
    );
  } else {
    // Eye closed icon
    return (
      <Svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none"
        style={style}
      >
        <Path 
          d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.8043 14.1968C9.51999 13.9124 9.2955 13.5731 9.1446 13.1995C8.9937 12.8259 8.91961 12.4258 8.92671 12.023C8.93382 11.6202 9.02201 11.2229 9.18596 10.8549C9.34991 10.4869 9.58636 10.1557 9.88 9.88"
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <Path 
          d="M1 1L23 23" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
};

export default EyeIcon;
