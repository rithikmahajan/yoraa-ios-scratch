import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const BuyNowScreen = ({ navigation, route }) => {
  const { product } = route?.params || {};
  const [selectedSize, setSelectedSize] = useState('M'); // Default to M size
  const [selectedTab, setSelectedTab] = useState('sizeChart'); // 'sizeChart' or 'howToMeasure'
  const [selectedUnit, setSelectedUnit] = useState('cm'); // 'in' or 'cm'
  const [slideAnimation] = useState(new Animated.Value(screenHeight * 0.75));

  // Sample size data with both cm and inches
  const sizes = [
    { 
      id: 'S', 
      name: 'S', 
      waist: { cm: '71.1', in: '28.0' }, 
      inseam: { cm: '70.1', in: '27.6' }, 
      available: true 
    },
    { 
      id: 'M', 
      name: 'M', 
      waist: { cm: '76.2', in: '30.0' }, 
      inseam: { cm: '73.7', in: '29.0' }, 
      available: true 
    },
    { 
      id: 'L', 
      name: 'L', 
      waist: { cm: '81.3', in: '32.0' }, 
      inseam: { cm: '77.2', in: '30.4' }, 
      available: true 
    },
    { 
      id: 'XL', 
      name: 'XL', 
      waist: { cm: '86.4', in: '34.0' }, 
      inseam: { cm: '80.8', in: '31.8' }, 
      available: true 
    },
    { 
      id: 'XXL', 
      name: 'XXL', 
      waist: { cm: '91.4', in: '36.0' }, 
      inseam: { cm: '84.3', in: '33.2' }, 
      available: true 
    },
  ];

  // Pan responder for drag-to-close functionality
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 3 && Math.abs(gestureState.dx) < 100;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        slideAnimation.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 50 || gestureState.vy > 0.3) {
        // Close modal
        handleClose();
      } else {
        // Snap back to open position
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    // Animate in the modal with dissolve ease out 300ms direction down to up
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnimation]);

  const handleSizeSelect = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
    if (tab === 'howToMeasure') {
      // Navigate to the SizeChart screen
      navigation.navigate('SizeChart', { product });
    }
  };

  const handleGoToBag = () => {
    // Navigate to bag/cart screen
    navigation.navigate('Home', { 
      addedProduct: { ...product, selectedSize },
      message: 'Product added to bag'
    });
  };

  const handleClose = () => {
    // Animate out and go back
    Animated.timing(slideAnimation, {
      toValue: screenHeight * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const renderSizeRow = (size, index) => (
    <TouchableOpacity
      key={size.id}
      style={[
        styles.sizeRow,
        index === sizes.length - 1 && styles.lastSizeRow
      ]}
      onPress={() => handleSizeSelect(size.id)}
    >
      <View style={styles.radioContainer}>
        <View style={[
          styles.radioButton,
          selectedSize === size.id && styles.radioButtonSelected
        ]}>
          {selectedSize === size.id && <View style={styles.radioButtonInner} />}
        </View>
      </View>
      <Text style={styles.sizeText}>{size.name}</Text>
      <Text style={styles.measurementText}>{size.waist[selectedUnit]}</Text>
      <Text style={styles.measurementTextRight}>{size.inseam[selectedUnit]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Background overlay */}
      <TouchableOpacity 
        style={styles.backgroundOverlay} 
        onPress={handleClose}
        activeOpacity={1}
      />
      
      {/* Drag handle */}
      <View style={styles.dragHandle} />
      
      {/* Main modal */}
      <Animated.View 
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: slideAnimation }]
          }
        ]}
      >
        {/* Drag area for pan gesture */}
        <View 
          style={styles.dragArea}
          {...panResponder.panHandlers}
        />
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>SIZE SELECTION</Text>
          
          {/* Tab Container */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={styles.tab}
              onPress={() => handleTabSwitch('sizeChart')}
            >
              <Text style={[
                styles.tabText,
                selectedTab === 'sizeChart' && styles.tabTextActive
              ]}>
                Size Chart
              </Text>
              {selectedTab === 'sizeChart' && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.tab}
              onPress={() => handleTabSwitch('howToMeasure')}
            >
              <Text style={[
                styles.tabText,
                selectedTab === 'howToMeasure' && styles.tabTextActive
              ]}>
                How To Measure
              </Text>
              {selectedTab === 'howToMeasure' && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          </View>

          {/* Size Selection Header */}
          <View style={styles.sizeSelectionHeader}>
            <Text style={styles.selectSizeText}>Select size in</Text>
            <View style={styles.unitSelector}>
              <TouchableOpacity 
                style={[
                  styles.unitButton,
                  selectedUnit === 'in' && styles.unitButtonSelected
                ]}
                onPress={() => handleUnitChange('in')}
              >
                <Text style={[
                  styles.unitText,
                  selectedUnit === 'in' && styles.unitTextSelected
                ]}>
                  in
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.unitButton,
                  selectedUnit === 'cm' && styles.unitButtonSelected
                ]}
                onPress={() => handleUnitChange('cm')}
              >
                <Text style={[
                  styles.unitText,
                  selectedUnit === 'cm' && styles.unitTextSelected
                ]}>
                  cm
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Size Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Size</Text>
            <Text style={styles.tableHeaderText}>
              To fit waist({selectedUnit})
            </Text>
            <Text style={styles.tableHeaderText}>
              Inseam Length({selectedUnit})
            </Text>
          </View>

          {/* Size Rows */}
          <ScrollView style={styles.sizeList}>
            {sizes.map((size, index) => renderSizeRow(size, index))}
          </ScrollView>

          {/* Go to Bag Button */}
          <TouchableOpacity style={styles.goToBagButton} onPress={handleGoToBag}>
            <Text style={styles.goToBagText}>Go to Bag</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      {/* Home indicator */}
      <View style={styles.homeIndicator} />
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
  },
  dragHandle: {
    position: 'absolute',
    top: screenHeight * 0.25 - 8, // Just above the modal
    left: '50%',
    marginLeft: -20,
    width: 40,
    height: 1,
    backgroundColor: '#000000',
    borderRadius: 50,
    zIndex: 10,
  },
  modalContainer: {
    position: 'absolute',
    top: screenHeight * 0.25, // 25% from top
    left: 0,
    right: 0,
    height: screenHeight * 0.75, // 75% of screen height
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  dragArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 29,
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
    marginBottom: 20,
    height: 51,
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
    left: 11,
  },
  sizeSelectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    marginBottom: 15,
    height: 45,
  },
  selectSizeText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  unitSelector: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    borderRadius: 50,
    padding: 0,
    alignItems: 'center',
    width: 80,
    height: 30,
  },
  unitButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 50,
    height: 30,
  },
  unitButtonSelected: {
    backgroundColor: '#000000',
  },
  unitText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  unitTextSelected: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  tableHeader: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    height: 45,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    flex: 1,
  },
  sizeList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    height: 45,
  },
  lastSizeRow: {
    borderBottomWidth: 0,
  },
  radioContainer: {
    marginRight: 20,
    marginLeft: 4,
  },
  radioButton: {
    width: 13,
    height: 13,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#FFFFFF',
  },
  radioButtonInner: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#000000',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    flex: 1,
  },
  measurementText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    textAlign: 'left',
    marginLeft: 20,
  },
  measurementTextRight: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    textAlign: 'center',
  },
  goToBagButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    marginHorizontal: 24,
    marginVertical: 32,
    paddingVertical: 16,
    alignItems: 'center',
  },
  goToBagText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -67.5,
    width: 135,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
});

export default BuyNowScreen;
