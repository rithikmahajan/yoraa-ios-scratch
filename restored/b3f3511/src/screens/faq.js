import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Plus/Minus Icon Component
const ExpandIcon = ({ isExpanded }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.horizontalLine, isExpanded && styles.hiddenLine]} />
    <View style={styles.verticalLine} />
  </View>
);

// Back Arrow Component
const BackArrow = () => (
  <View style={styles.backArrowContainer}>
    <View style={styles.backArrowLine1} />
    <View style={styles.backArrowLine2} />
  </View>
);

const FAQScreen = ({ navigation }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: "WHAT DO I NEED TO KNOW BEFORE SIGNING UP TO THE YORAA MEMBERSHIP?",
      answer: "All your purchases in store and online are rewarded with points. To collect points in store, always remember to scan your membership ID via the H&M app. You can also earn points by completing your profile, earning you 20 points, by recycling your garments earning you 20 points, by bringing your own bag when you shop in-store earning you 5 points, and by inviting your friends to become members. You'll earn 50 points for every new member that completes their first purchase. Your points will be displayed on your membership account which can take up to 24 hours to update."
    },
    {
      id: 2,
      question: "FOR HOW LONG ARE MY POINTS VALID?",
      answer: "Your points are valid for 12 months from the date they were earned. After this period, they will expire and cannot be used for purchases. We recommend using your points regularly to ensure they don't expire."
    },
    {
      id: 3,
      question: "WHEN DO I REACH PLUS LEVEL?",
      answer: "You reach Plus level when you spend $200 or more in a calendar year. Once you achieve Plus status, you'll enjoy additional benefits such as free shipping, early access to sales, and exclusive member events."
    },
    {
      id: 4,
      question: "HOW DO BONUS VOUCHERS WORK?",
      answer: "Bonus vouchers are special rewards that you can earn through various activities like completing your profile, referring friends, or reaching spending milestones. These vouchers can be applied to your purchases for additional discounts."
    },
    {
      id: 5,
      question: "WHY HAVEN'T I RECEIVED MY BONUS VOUCHER YET?",
      answer: "Bonus vouchers typically take 24-48 hours to appear in your account after meeting the requirements. If you still haven't received it after this time, please contact our customer service team for assistance."
    },
    {
      id: 6,
      question: "HOW LONG WILL I KEEP THE PLUS STATUS?",
      answer: "Your Plus status is maintained for one full calendar year from the date you first achieved it. To maintain Plus status for the following year, you'll need to spend $200 or more again during that calendar year."
    }
  ];

  // Custom layout animation configuration for smooth right-to-left movement
  const animationConfig = {
    duration: 300,
    create: {
      type: LayoutAnimation.Types.easeIn,
      property: LayoutAnimation.Properties.opacity,
      duration: 300,
    },
    update: {
      type: LayoutAnimation.Types.easeIn,
      property: LayoutAnimation.Properties.scaleXY,
      duration: 300,
    },
    delete: {
      type: LayoutAnimation.Types.easeIn,
      property: LayoutAnimation.Properties.opacity,
      duration: 300,
    },
  };

  const toggleItem = (itemId) => {
    // Configure the animation
    LayoutAnimation.configureNext(animationConfig);
    
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const toggleAllItems = () => {
    // Configure the animation
    LayoutAnimation.configureNext(animationConfig);
    
    const newExpandedState = !allExpanded;
    setAllExpanded(newExpandedState);
    
    const newExpandedItems = {};
    faqData.forEach(item => {
      newExpandedItems[item.id] = newExpandedState;
    });
    setExpandedItems(newExpandedItems);
  };

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarTime}>9:41</Text>
        <View style={styles.statusBarRight}>
          <View style={styles.signalBars}>
            <View style={styles.bar1} />
            <View style={styles.bar2} />
            <View style={styles.bar3} />
            <View style={styles.bar4} />
          </View>
          <View style={styles.wifiIcon} />
          <View style={styles.batteryIcon}>
            <View style={styles.batteryFill} />
          </View>
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={styles.headerRight} />
      </View>

      {/* View All / Hide All Button */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleAllItems}>
          <Text style={styles.toggleButtonText}>
            {allExpanded ? 'Hide All Data' : 'View All Data'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* FAQ Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {faqData.map((item, index) => (
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity 
              style={styles.questionContainer} 
              onPress={() => toggleItem(item.id)}
            >
              <Text style={styles.questionText}>{item.question}</Text>
              <ExpandIcon isExpanded={expandedItems[item.id]} />
            </TouchableOpacity>
            
            {expandedItems[item.id] && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            )}
            
            {/* Separator line between FAQ items */}
            {index < faqData.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </ScrollView>

      {/* Home Indicator */}
      <View style={styles.homeIndicator}>
        <View style={styles.homeIndicatorBar} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Status Bar
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 44,
  },
  statusBarTime: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.165,
  },
  statusBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1,
    width: 17,
    height: 11,
  },
  bar: {
    width: 3,
    backgroundColor: '#000000',
    borderRadius: 0.5,
  },
  bar1: {
    width: 3,
    height: 4,
    backgroundColor: '#000000',
    borderRadius: 0.5,
  },
  bar2: {
    width: 3,
    height: 6,
    backgroundColor: '#000000',
    borderRadius: 0.5,
  },
  bar3: {
    width: 3,
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 0.5,
  },
  bar4: {
    width: 3,
    height: 10,
    backgroundColor: '#000000',
    borderRadius: 0.5,
  },
  wifiIcon: {
    width: 15,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  batteryIcon: {
    width: 25,
    height: 12,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
    padding: 1,
  },
  batteryFill: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 68,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backArrowLine1: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: '#000000',
    transform: [{ rotate: '45deg' }, { translateX: -2 }, { translateY: -2 }],
  },
  backArrowLine2: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: '#000000',
    transform: [{ rotate: '-45deg' }, { translateX: -2 }, { translateY: 2 }],
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  headerRight: {
    width: 68,
  },

  // Toggle Container
  toggleContainer: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  // FAQ Content
  scrollView: {
    flex: 1,
    paddingHorizontal: 32,
  },
  faqItem: {
    marginBottom: 24,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 16.8,
    marginRight: 16,
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  horizontalLine: {
    position: 'absolute',
    width: 11,
    height: 1.5,
    backgroundColor: '#000000',
    borderRadius: 0.75,
  },
  hiddenLine: {
    opacity: 0,
  },
  verticalLine: {
    position: 'absolute',
    width: 1.5,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 0.75,
  },
  answerContainer: {
    paddingTop: 16,
    paddingRight: 32,
  },
  answerText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#848688',
    lineHeight: 16.8,
  },

  // Separator
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },

  // Home Indicator
  homeIndicator: {
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 4,
  },
  homeIndicatorBar: {
    width: 134,
    height: 5,
    backgroundColor: '#1A1A1A',
    borderRadius: 100,
  },
});

export default FAQScreen;
