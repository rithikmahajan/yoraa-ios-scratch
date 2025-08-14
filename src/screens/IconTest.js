import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrdersIconNew, ContactUsIcon, SettingsIconNew } from '../assets/icons';

const IconTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Profile Icons Test</Text>
      
      <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <OrdersIconNew width={24} height={24} color="#000000" />
          <Text style={styles.iconLabel}>Orders</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <ContactUsIcon width={24} height={24} color="#000000" />
          <Text style={styles.iconLabel}>Contact Us</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <SettingsIconNew width={18} height={18} color="#000000" />
          <Text style={styles.iconLabel}>Settings</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#000000',
  },
});

export default IconTest;
