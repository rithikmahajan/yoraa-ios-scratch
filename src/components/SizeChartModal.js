import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import { SIZE_CHART_DATA } from '../constants/bagConstants';
import { bagStyles } from '../styles/bagStyles';

const SizeChartModal = ({
  visible,
  activeTab,
  setActiveTab,
  selectedUnit,
  setSelectedUnit,
  onClose,
  slideAnim,
  panY,
}) => {
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        onClose();
      } else {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const renderSizeChart = () => (
    <View style={bagStyles.sizeChartContent}>
      <Text style={bagStyles.sizeChartSubtitle}>Select size in</Text>
      <View style={bagStyles.unitSelector}>
        <TouchableOpacity 
          style={[
            bagStyles.unitButton,
            selectedUnit === 'in' && bagStyles.selectedUnitButton
          ]}
          onPress={() => setSelectedUnit('in')}
        >
          <Text style={[
            bagStyles.unitButtonText,
            selectedUnit === 'in' && bagStyles.selectedUnitButtonText
          ]}>
            in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            bagStyles.unitButton,
            selectedUnit === 'cm' && bagStyles.selectedUnitButton
          ]}
          onPress={() => setSelectedUnit('cm')}
        >
          <Text style={[
            bagStyles.unitButtonText,
            selectedUnit === 'cm' && bagStyles.selectedUnitButtonText
          ]}>
            cm
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={bagStyles.sizeTable}>
        <View style={bagStyles.tableHeader}>
          <Text style={bagStyles.tableHeaderText}>Size</Text>
          <Text style={bagStyles.tableHeaderText}>To fit waist(cm)</Text>
          <Text style={bagStyles.tableHeaderText}>Inseam Length(cm)</Text>
        </View>
        
        {SIZE_CHART_DATA.map((item, index, array) => (
          <View 
            key={index} 
            style={[
              bagStyles.tableRow,
              index === array.length - 1 && bagStyles.lastTableRow
            ]}
          >
            <Text style={bagStyles.tableCellText}>{item.size}</Text>
            <Text style={bagStyles.tableCellText}>{item.waist}</Text>
            <Text style={bagStyles.tableCellText}>{item.inseam}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderMeasureInstructions = () => (
    <View style={bagStyles.measureContent}>
      <Text style={bagStyles.measureText}>
        Measuring instructions would go here...
      </Text>
    </View>
  );

  if (!visible) return null;

  return (
    <View style={bagStyles.modalOverlay}>
      <Animated.View 
        style={[
          bagStyles.sizeChartModalContainer,
          {
            transform: [
              { translateY: slideAnim },
              { translateY: panY }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <View style={bagStyles.dragHandle} />
        <View style={bagStyles.modalContent}>
          <Text style={bagStyles.modalTitle}>SIZE SELECTION</Text>
          
          <View style={bagStyles.tabContainer}>
            <TouchableOpacity 
              style={[
                bagStyles.tabButton,
                activeTab === 'chart' && bagStyles.activeTab
              ]}
              onPress={() => setActiveTab('chart')}
            >
              <Text style={[
                bagStyles.tabText,
                activeTab === 'chart' && bagStyles.activeTabText
              ]}>
                Size Chart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                bagStyles.tabButton,
                activeTab === 'measure' && bagStyles.activeTab
              ]}
              onPress={() => setActiveTab('measure')}
            >
              <Text style={[
                bagStyles.tabText,
                activeTab === 'measure' && bagStyles.activeTabText
              ]}>
                How To Measure
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={bagStyles.tabContent}>
            {activeTab === 'chart' ? renderSizeChart() : renderMeasureInstructions()}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
};

export default SizeChartModal;
