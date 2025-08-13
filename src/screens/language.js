import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image
} from 'react-native';
import { Colors, FontSizes, FontFamilies, Spacing } from '../constants';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Language = ({ navigation }) => {
  const LANGUAGES = [
    { name: 'English', native: 'English' },
    { name: 'Hindi', native: 'हिन्दी' },
    { name: 'Spanish', native: 'Español' },
    { name: 'French', native: 'Français' },
    { name: 'German', native: 'Deutsch' },
    { name: 'Mandarin Chinese', native: '中文' },
    { name: 'Arabic', native: 'العربية' },
    { name: 'Portuguese', native: 'Português' },
    { name: 'Bengali', native: 'বাংলা' },
    { name: 'Russian', native: 'Русский' },
    { name: 'Japanese', native: '日本語' },
    { name: 'Korean', native: '한국어' },
    { name: 'Italian', native: 'Italiano' },
    { name: 'Turkish', native: 'Türkçe' },
    { name: 'Tamil', native: 'தமிழ்' },
    { name: 'Urdu', native: 'اردو' },
    { name: 'Gujarati', native: 'ગુજરાતી' },
    { name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { name: 'Marathi', native: 'मराठी' },
    { name: 'Telugu', native: 'తెలుగు' }
  ];

  const handleLanguageSelect = (language) => {
    // Handle language selection logic here
    console.log('Selected language:', language);
    // You can implement language change logic here
    // For now, just go back to previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image
          source={require('../assets/icons/CaretLeft.png')}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* HEADING */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Language</Text>
      </View>

      {/* Sub heading */}
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>
          Choose the language you'd like to browse the app in
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.languageListContainer}>
            {LANGUAGES.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.languageItem}
                onPress={() => handleLanguageSelect(item)}
              >
                <Text style={styles.languageName}>
                  {item.name}
                </Text>
                <Text style={styles.languageNative}>
                  {item.native}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '15%',
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    marginLeft: -10,
    marginBottom: Spacing.lg,
  },
  backIcon: {
    width: SCREEN_HEIGHT * 0.038,
    height: SCREEN_HEIGHT * 0.038,
  },
  headerContainer: {
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.xxl,
    color: Colors.text,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.lg,
  },
  subHeaderText: {
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.lg,
    color: Colors.text,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  languageListContainer: {
    flex: 1,
  },
  languageItem: {
    paddingVertical: Spacing.sm,
    alignItems: 'flex-start',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
  },
  languageName: {
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  languageNative: {
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.sm,
    color: 'gray',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default Language;
