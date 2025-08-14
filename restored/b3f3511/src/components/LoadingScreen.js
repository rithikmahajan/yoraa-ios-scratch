import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { FontSizes, FontWeights, Spacing } from '../constants';

const LoadingScreen = ({ onLoadingComplete }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start rotation animation
    const rotation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotation.start();

    // Auto complete loading after 2 seconds with fade out
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      });
    }, 2000);

    return () => {
      rotation.stop();
      clearTimeout(timer);
    };
  }, [rotateAnim, fadeAnim, onLoadingComplete]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.spinner,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <View style={styles.spinnerInner} />
        </Animated.View>
        <Text style={styles.loadingText}>Loading Products...</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  spinner: {
    width: 40,
    height: 40,
    marginBottom: Spacing.lg,
  },
  spinnerInner: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: '#E4E4E4',
    borderTopColor: '#000000',
    borderRadius: 20,
  },
  loadingText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: '#000000',
    letterSpacing: -0.14,
  },
});

export default LoadingScreen;
