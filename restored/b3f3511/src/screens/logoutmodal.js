import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const LogoutModal = ({ visible, onClose, onSignOut }) => {
  const handleStay = () => {
    onClose();
  };

  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Are you sure you want to leave?</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.stayButton} onPress={handleStay}>
              <Text style={styles.stayButtonText}>stay</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <Text style={styles.signOutButtonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: width * 0.85,
    maxWidth: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 16,
  },
  stayButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 32,
    flex: 1,
    maxWidth: 120,
    alignItems: 'center',
  },
  stayButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  signOutButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 32,
    flex: 1,
    maxWidth: 120,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LogoutModal;
