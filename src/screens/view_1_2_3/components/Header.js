import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SearchIconSvg from '../../../assets/icons/SearchIconSvg';
import FilterIconNew from '../../../assets/icons/FilterIconNew';
import BackButton from '../../../components/BackButton';
import CustomGridIcon from './CustomGridIcon';
import { Spacing } from '../../../constants';

const Header = ({ onBackPress, onSearchPress, onGridToggle, onFilterPress, viewMode }) => {
  return (
    <View style={styles.header}>
      <BackButton onPress={onBackPress} style={styles.backButton} />
      
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
          <SearchIconSvg width={24} height={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onGridToggle}>
          <CustomGridIcon width={24} height={24} color="#000000" viewMode={viewMode} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onFilterPress}>
          <FilterIconNew width={24} height={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 0,
    paddingBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconButton: {
    padding: Spacing.xs,
  },
});

export default Header;
