import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const SizeChartScreen = ({ navigation }) => {
  const [slideAnimation] = useState(new Animated.Value(screenHeight));

  useEffect(() => {
    // Animate in the modal with 100ms
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [slideAnimation]);

  const handleSizeChartTab = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Background overlay */}
      <View style={styles.backgroundOverlay} />
      
      {/* Main modal */}
      <Animated.View 
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: slideAnimation }]
          }
        ]}
      >
        <View style={styles.contentContainer}>
          {/* Divider at top */}
          <View style={styles.topDivider} />
          
          <Text style={styles.title}>SIZE SELECTION</Text>
          
          {/* Tab Container */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={styles.tab}
              onPress={handleSizeChartTab}
            >
              <Text style={styles.tabText}>Size Chart</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tab}>
              <Text style={[styles.tabText, styles.tabTextActive]}>
                How To Measure
              </Text>
              <View style={styles.tabUnderline} />
            </TouchableOpacity>
          </View>

          {/* Measurement Image Container */}
          <View style={styles.imageContainer}>
            <View style={styles.measurementImageContainer}>
              {/* Placeholder for the measurement guide image */}
              <View style={styles.measurementImagePlaceholder}>
                <View style={styles.pantsOutline}>
                  <Text style={[styles.measurementLabel, styles.waistLabel]}>
                    To Fit Waist
                  </Text>
                  <Text style={[styles.measurementLabel, styles.riseLabel]}>
                    Rise
                  </Text>
                  <Text style={[styles.measurementLabel, styles.thighLabel]}>
                    Thigh
                  </Text>
                  <Text style={[styles.measurementLabel, styles.inseamLabel]}>
                    Inseam{'\n'}Length
                  </Text>
                  <Text style={[styles.measurementLabel, styles.outseamLabel]}>
                    Outseam{'\n'}Length
                  </Text>
                  <Text style={[styles.measurementLabel, styles.bottomLabel]}>
                    Bottom{'\n'}Hem
                  </Text>
                  
                  {/* Dotted measurement lines */}
                  <View style={styles.measurementLines}>
                    <View style={[styles.dottedLine, styles.waistLine]} />
                    <View style={[styles.dottedLine, styles.thighLine]} />
                    <View style={[styles.dottedLine, styles.inseamLine]} />
                    <View style={[styles.dottedLine, styles.outseamLine]} />
                    <View style={[styles.dottedLine, styles.bottomLine]} />
                  </View>
                  
                  {/* Simple pants outline */}
                  <View style={styles.pantsShape} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#CFCFCF',
    opacity: 1,
  },
  modalContainer: {
    position: 'absolute',
    top: 220,
    left: 0,
    right: 0,
    height: 669,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 29,
  },
  topDivider: {
    width: 40,
    height: 1,
    backgroundColor: '#000000',
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    top: -8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  tabTextActive: {
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 50,
    width: 173,
  },
  imageContainer: {
    flex: 1,
    paddingHorizontal: 34,
    paddingTop: 10,
  },
  measurementImageContainer: {
    backgroundColor: '#F2F2F2',
    height: 421,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  measurementImagePlaceholder: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pantsOutline: {
    width: 200,
    height: 300,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pantsShape: {
    width: 80,
    height: 200,
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 8,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  measurementLabel: {
    fontSize: 11,
    fontWeight: '400',
    color: '#333333',
    position: 'absolute',
    fontFamily: 'Montserrat-Regular',
  },
  waistLabel: {
    top: 30,
    left: -60,
  },
  riseLabel: {
    top: 80,
    left: -30,
  },
  thighLabel: {
    top: 120,
    left: -40,
  },
  inseamLabel: {
    bottom: 50,
    left: -50,
    textAlign: 'center',
  },
  outseamLabel: {
    top: 100,
    right: -50,
    textAlign: 'center',
  },
  bottomLabel: {
    bottom: 20,
    right: -50,
    textAlign: 'center',
  },
  measurementLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dottedLine: {
    position: 'absolute',
    borderStyle: 'dotted',
    borderColor: '#FFCC00',
    borderWidth: 1,
  },
  waistLine: {
    top: 50,
    left: -40,
    width: 160,
    height: 0,
    borderTopWidth: 1,
  },
  thighLine: {
    top: 140,
    left: -20,
    width: 120,
    height: 0,
    borderTopWidth: 1,
  },
  inseamLine: {
    top: 140,
    left: 35,
    width: 0,
    height: 120,
    borderLeftWidth: 1,
  },
  outseamLine: {
    top: 50,
    right: -20,
    width: 0,
    height: 180,
    borderLeftWidth: 1,
  },
  bottomLine: {
    bottom: 40,
    left: 20,
    width: 80,
    height: 0,
    borderTopWidth: 1,
  },
});

export default SizeChartScreen;
