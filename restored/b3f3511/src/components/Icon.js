import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Icon = ({ color, size, name, iconFamily }) => {
  return (
    <>
      {iconFamily === 'Ionicons' && <Ionicons name={name} size={size} color={color} />}
      {iconFamily === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={name} size={size} color={color} />}
      {iconFamily === 'MaterialIcons' && <MaterialIcons name={name} size={size} color={color} />}
    </>
  );
};

export default Icon;
