import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import BackButton from '../components/BackButton';

const PointsHistorySimple = ({ navigation }) => {
  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} style={styles.backButton} />
        <Text style={styles.headerTitle}>POINTS HISTORY</Text>
        <View style={styles.backButton} />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Points History Screen</Text>
        <Text style={styles.text}>This is a simple test version</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 68,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 13,
    fontWeight: '700',
    color: '#0F0F0F',
    textAlign: 'center',
    letterSpacing: 0.65,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#0F0F0F',
    marginBottom: 10,
  },
});

export default PointsHistorySimple;
