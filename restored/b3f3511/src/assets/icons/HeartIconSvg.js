import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HeartIconSvg = ({ width = 24, height = 24, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 23 21" fill="none">
      <Path
        d="M2.69832 2.69832C0.433893 4.96274 0.433895 8.6341 2.69832 10.8985L11.4813 19.6815L11.5417 19.6211L11.6021 19.6816L20.3851 10.8986C22.6495 8.63417 22.6495 4.96281 20.3851 2.69839C18.1207 0.433968 14.4493 0.43397 12.1849 2.69839L11.8953 2.98798C11.7 3.18324 11.3834 3.18324 11.1882 2.98798L10.8985 2.69832C8.6341 0.433894 4.96274 0.433895 2.69832 2.69832Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
    </Svg>
  );
};

export default HeartIconSvg;
