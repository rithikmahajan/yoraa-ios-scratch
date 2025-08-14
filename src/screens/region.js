import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Colors, FontSizes, FontWeights, FontFamilies, Spacing } from '../constants';
import { SearchIcon } from '../assets/icons';
import BackButton from '../components/BackButton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');


// Flag Icon Component (placeholder)
const FlagIcon = ({ country, size = 24 }) => (
  <View style={[styles.flagIcon, { width: size, height: size }]}>
    <Text style={[styles.flagText, { fontSize: size * 0.6 }]}>🏳️</Text>
  </View>
);

const Region = ({ navigation }) => {
  const countryList = [
    { name: "Afghanistan", code: "AF" },
    { name: "Albania", code: "AL" },
    { name: "Brazil", code: "BR" },
    { name: "Belgium", code: "BE" },
    { name: "Canada", code: "CA" },
    { name: "Denmark", code: "DK" },
    { name: "Ethiopia", code: "ET" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Kenya", code: "KE" },
    { name: "Mexico", code: "MX" },
    { name: "Nigeria", code: "NG" },
    { name: "Norway", code: "NO" },
    { name: "Poland", code: "PL" },
    { name: "Qatar", code: "QA" },
    { name: "Russia", code: "RU" },
    { name: "Spain", code: "ES" },
    { name: "Thailand", code: "TH" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "Vietnam", code: "VN" },
  ];

  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchText, setSearchText] = useState('');

  const alphabet = [
    "All", "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W",
    "X", "Y", "Z"
  ];

  // Filter countries based on search text and selected letter
  const filteredCountries = countryList.filter(item => {
    const matchesSearch = searchText === '' || 
      item.name.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesLetter = selectedLetter === null || 
      selectedLetter === "All" || 
      item.name.toUpperCase().startsWith(selectedLetter);
    
    return matchesSearch && matchesLetter;
  });

  const handleCountrySelect = (country) => {
    // Handle country selection - you can add logic here to store selected region
    console.log('Selected country:', country);
    // Navigate back or to next screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
  <BackButton onPress={() => navigation.goBack()} style={styles.backButton} />

      {/* HEADING */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Region</Text>
      </View>

      {/* Sub heading */}
      <View style={styles.subHeadingContainer}>
        <Text style={styles.subHeading}>
          Choose a country or region. This affects the country you are billed in, 
          availability of items, price and delivery options.
        </Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <SearchIcon size={SCREEN_HEIGHT * 0.035} color={Colors.textSecondary} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor={Colors.textSecondary}
          keyboardType="default"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Result and alphabets */}
          <View style={styles.contentContainer}>
            {/* Countries list */}
            <View style={styles.countriesContainer}>
              {filteredCountries.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.countryItem}
                  onPress={() => handleCountrySelect(item)}
                >
                  <FlagIcon country={item.code} size={SCREEN_HEIGHT * 0.035} />
                  <Text style={styles.countryName}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Alphabet filter */}
            <View style={styles.alphabetContainer}>
              {alphabet.map((letter) => (
                <TouchableOpacity 
                  key={letter} 
                  onPress={() => setSelectedLetter(letter)}
                  style={styles.alphabetButton}
                >
                  <Text
                    style={[
                      styles.alphabetText,
                      selectedLetter === letter && styles.alphabetTextSelected
                    ]}
                  >
                    {letter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'ios' ? '15%' : Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  backButton: {
    marginLeft: -10,
    alignSelf: 'flex-start',
  },
  headingContainer: {},
  heading: {
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
  },
  subHeadingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subHeading: {
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    lineHeight: FontSizes.lg * 1.4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: 'center',
    borderBottomColor: Colors.textPrimary,
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: "center",
    paddingBottom: Spacing.xs,
  },
  searchInput: {
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    flex: 1,
    paddingLeft: Spacing.md,
    alignItems: 'center',
    color: Colors.textPrimary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: Spacing.lg,
  },
  contentContainer: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  countriesContainer: {
    gap: Spacing.xs,
    flex: 1,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: 1,
    width: "100%",
    alignSelf: "center",
    paddingVertical: Spacing.md,
  },
  flagIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 4,
  },
  flagText: {
    fontSize: 16,
  },
  countryName: {
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    flex: 1,
    paddingLeft: Spacing.md,
    color: Colors.textPrimary,
  },
  alphabetContainer: {
    zIndex: 10,
    gap: 1.5,
    paddingHorizontal: Spacing.xs,
  },
  alphabetButton: {
    padding: 2,
  },
  alphabetText: {
    fontSize: FontSizes.sm,
    fontFamily: FontFamilies.bold,
    fontWeight: FontWeights.bold,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  alphabetTextSelected: {
    color: Colors.primary,
  },
});

export default Region;
