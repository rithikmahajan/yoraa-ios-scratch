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
import BackButton from '../components/BackButton';

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
          <BackButton 
            style={styles.backButton}
            onPress={handleBack}
          />
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
            <Text style={styles.linkIcon}>🔗</Text>
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
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginRight: 28, // Compensate for back button width
  },
  headerSpacer: {
    width: 28,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
    marginBottom: 24,
  },
  noAccountsContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  linkIcon: {
    fontSize: 20,
    marginBottom: 8,
    color: '#666666',
  },
  noAccountsText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  updateButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 32,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LinkedAccountScreen;
