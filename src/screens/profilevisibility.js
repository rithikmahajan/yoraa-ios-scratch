import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import BackButton from '../components/BackButton';

// Radio Button Component
const RadioButton = ({ selected, onPress, label, description }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
    <View style={styles.radioRow}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
        {selected && <View style={styles.radioButtonInner} />}
      </View>
      <View style={styles.radioTextContainer}>
        <Text style={styles.radioLabel}>{label}</Text>
        {description && <Text style={styles.radioDescription}>{description}</Text>}
      </View>
    </View>
  </TouchableOpacity>
);

const ProfileVisibilityScreen = ({ navigation }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [profileVisibility, setProfileVisibility] = useState('Social'); // Default to Social
  const [locationSharing, setLocationSharing] = useState('Share my location with friends only'); // Default option

  useEffect(() => {
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

  const handleSave = () => {
    // Handle save logic here
    console.log('Profile Visibility:', profileVisibility);
    console.log('Location Sharing:', locationSharing);
    // Navigate back after saving
    handleBack();
  };

  const profileOptions = [
    {
      value: 'Private',
      label: 'Private: Profile visible to only you',
    },
    {
      value: 'Social',
      label: 'Social: Profile visible to friends',
    },
    {
      value: 'Public',
      label: 'Public: Profile visible to everyone',
    },
  ];

  const locationOptions = [
    {
      value: 'Share my location with friends only',
      label: 'Share my location with friends only',
    },
    {
      value: "Don't share my location",
      label: "Don't share my location",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} onPress={handleBack} />
          <Text style={styles.headerTitle}>Product Review Visibility</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Choose how you will appear on any Nike product reviews you complete. 
              Changing these settings will also affect your visibility for connecting 
              with friends on the YORAA Club and YORAA apps.{' '}
              <Text style={styles.learnMore}>Learn More</Text>
            </Text>
          </View>

          {/* Profile Visibility Options */}
          <View style={styles.sectionContainer}>
            {profileOptions.map((option) => (
              <RadioButton
                key={option.value}
                selected={profileVisibility === option.value}
                onPress={() => setProfileVisibility(option.value)}
                label={option.label}
              />
            ))}
          </View>

          {/* Location Sharing Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Location Sharing</Text>
            {locationOptions.map((option) => (
              <RadioButton
                key={option.value}
                selected={locationSharing === option.value}
                onPress={() => setLocationSharing(option.value)}
                label={option.label}
              />
            ))}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 32,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
    fontWeight: '400',
  },
  learnMore: {
    color: '#FF6B35',
    textDecorationLine: 'underline',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  radioContainer: {
    marginBottom: 16,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  radioButtonSelected: {
    borderColor: '#000000',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
  radioTextContainer: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 20,
    fontWeight: '400',
  },
  radioDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    lineHeight: 18,
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 40,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileVisibilityScreen;
