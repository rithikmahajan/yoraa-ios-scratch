import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';

// Back Arrow Icon Component
const BackArrowIcon = () => (
  <View style={styles.backArrowIcon}>
    <View style={styles.backArrowLine} />
    <View style={styles.backArrowHead} />
  </View>
);

// Chain Link Icon Component
const ChainLinkIcon = () => (
  <View style={styles.chainLinkIcon}>
    <View style={styles.chainLink1} />
    <View style={styles.chainLink2} />
  </View>
);

const LinkedAccountScreen = ({ navigation }) => {
  const slideAnim = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    // Animate in with 300ms ease out
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.back(1.7)),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleBack = () => {
    // Animate out then navigate back
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      easing: Easing.in(Easing.back(1.7)),
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleUpdate = () => {
    console.log('Update pressed');
    // Add update functionality here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Linked Accounts</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <View style={styles.mainContent}>
          <Text style={styles.subtitle}>
            Manage account and services linked{'\n'}to your Yoraa account
          </Text>

          {/* No Connected Accounts Container */}
          <View style={styles.noAccountsContainer}>
            <ChainLinkIcon />
            <Text style={styles.noAccountsText}>
              You dont have any connected{'\n'}app or services
            </Text>
          </View>

          {/* Update Button */}
          <TouchableOpacity 
            style={styles.updateButton}
            onPress={handleUpdate}
            activeOpacity={0.8}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backArrowIcon: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  backArrowLine: {
    position: 'absolute',
    left: 8,
    top: 9,
    width: 10,
    height: 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 1,
  },
  backArrowHead: {
    position: 'absolute',
    left: 2,
    top: 5,
    width: 8,
    height: 8,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#1A1A1A',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 1,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginRight: 28, // Compensate for back button width
  },
  headerSpacer: {
    width: 28,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 22,
    marginBottom: 32,
  },
  noAccountsContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  chainLinkIcon: {
    width: 24,
    height: 20,
    marginBottom: 12,
    position: 'relative',
  },
  chainLink1: {
    position: 'absolute',
    left: 2,
    top: 2,
    width: 8,
    height: 12,
    borderWidth: 2,
    borderColor: '#999999',
    borderRadius: 4,
    transform: [{ rotate: '-25deg' }],
  },
  chainLink2: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 8,
    height: 12,
    borderWidth: 2,
    borderColor: '#999999',
    borderRadius: 4,
    transform: [{ rotate: '25deg' }],
  },
  noAccountsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  updateButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 32,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LinkedAccountScreen;
