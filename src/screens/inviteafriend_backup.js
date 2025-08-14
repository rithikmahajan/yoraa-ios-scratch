import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Clipboard,
  Share,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BackButton } from '../components';

const TicketShape = ({ children }) => (
  <View style={styles.ticketContainer}>
    <View style={styles.ticketContent}>
      {children}
    </View>
    <View style={styles.ticketPerforation}>
      {Array.from({ length: 20 }, (_, i) => (
        <View key={i} style={styles.perforationDot} />
      ))}
    </View>
  </View>
);

const CopyIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
      stroke="#000000"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.33333 10.6667C2.59695 10.6667 2 10.0697 2 9.33333V3.33333C2 2.59695 2.59695 2 3.33333 2H9.33333C10.0697 2 10.6667 2.59695 10.6667 3.33333"
      stroke="#000000"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InviteAFriend = ({ navigation }) => {
  const [referralCode] = useState('RITHIK27');

  const handleCopyCode = async () => {
    try {
      await Clipboard.setString(referralCode);
      Alert.alert('Copied!', 'Referral code copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy referral code');
    }
  };

  const handleInviteNow = async () => {
    try {
      const result = await Share.share({
        message: `Join me on YORAA! Use my referral code ${referralCode} to get exclusive benefits. Download the app now!`,
        title: 'Join YORAA with my referral code',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share referral code');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Invite a friend</Text>
        <Text style={styles.subtitle}>
          Share your referral code and enjoy exclusive benefits together
        </Text>

        <TicketShape>
          <View style={styles.ticketHeader}>
            <Text style={styles.ticketTitle}>YORAA</Text>
            <Text style={styles.userName}>Rithik</Text>
          </View>
          
          <View style={styles.referralSection}>
            <Text style={styles.referralLabel}>Your referral code</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.referralCode}>{referralCode}</Text>
              <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
                <CopyIcon />
              </TouchableOpacity>
            </View>
          </View>
        </TicketShape>

        <TouchableOpacity style={styles.inviteButton} onPress={handleInviteNow}>
          <Text style={styles.inviteButtonText}>Invite Now</Text>
        </TouchableOpacity>

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Benefits of inviting friends:</Text>
          <Text style={styles.benefitItem}>• Get exclusive rewards</Text>
          <Text style={styles.benefitItem}>• Unlock special discounts</Text>
          <Text style={styles.benefitItem}>• Access to premium features</Text>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  ticketContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ticketContent: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  ticketPerforation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  perforationDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
  },
  ticketHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ticketTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    color: '#666666',
  },
  referralSection: {
    alignItems: 'center',
  },
  referralLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 12,
  },
  referralCode: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 2,
  },
  copyButton: {
    padding: 4,
  },
  inviteButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  inviteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  benefitsContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  benefitItem: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 22,
  },
});

export default InviteAFriend;
