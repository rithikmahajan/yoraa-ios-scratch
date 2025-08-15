import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CameraIcon = ({ width = 19, height = 19, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 19" fill="none">
      <Path
        d="M18.2083 15.0417C18.2083 15.4616 18.0415 15.8643 17.7445 16.1613C17.4476 16.4582 17.0449 16.625 16.625 16.625H2.37496C1.95503 16.625 1.55231 16.4582 1.25537 16.1613C0.958441 15.8643 0.791626 15.4616 0.791626 15.0417V6.33333C0.791626 5.91341 0.958441 5.51068 1.25537 5.21375C1.55231 4.91681 1.95503 4.75 2.37496 4.75H5.54163L7.12496 2.375H11.875L13.4583 4.75H16.625C17.0449 4.75 17.4476 4.91681 17.7445 5.21375C18.0415 5.51068 18.2083 5.91341 18.2083 6.33333V15.0417Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.50004 13.4583C11.2489 13.4583 12.6667 12.0406 12.6667 10.2917C12.6667 8.54276 11.2489 7.125 9.50004 7.125C7.75114 7.125 6.33337 8.54276 6.33337 10.2917C6.33337 12.0406 7.75114 13.4583 9.50004 13.4583Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CameraIcon;
