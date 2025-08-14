import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Alert,
  Share,
  Platform,
} from 'react-native';

// Back Arrow Icon Component
const BackArrowIcon = () => (
  <View style={styles.backArrowContainer}>
    <Text style={styles.backArrowText}>‹</Text>
  </View>
);

// Share Icon Component
const ShareIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>↗</Text>
  </View>
);

// Mock data for invoices with different statuses
const invoiceData = [
  {
    id: 1,
    status: 'delivered',
    statusText: 'Order delivered',
    productName: 'Nike Everyday Plus Cushioned',
    productDetails: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    imageColor: '#F5F5F5',
    date: 'Dec 15, 2024',
    orderNumber: 'YOR001234',
    amount: '$24.99',
  },
  {
    id: 2,
    status: 'processing',
    statusText: 'Order processing',
    productName: 'Nike Everyday Plus Cushioned',
    productDetails: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    imageColor: '#F5F5F5',
    date: 'Dec 10, 2024',
    orderNumber: 'YOR001235',
    amount: '$24.99',
  },
  {
    id: 3,
    status: 'cancelled',
    statusText: 'Order cancelled',
    productName: 'Nike Everyday Plus Cushioned',
    productDetails: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    imageColor: '#F5F5F5',
    date: 'Dec 8, 2024',
    orderNumber: 'YOR001236',
    amount: '$24.99',
  },
];

// Detailed Invoice View Component
const DetailedInvoiceView = ({ invoice, onDownload, onShare }) => (
  <ScrollView 
    style={styles.detailedContainer} 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.detailedScrollContent}
  >
    {/* Header Info */}
    <View style={styles.detailedHeader}>
      <Text style={styles.orderIdText}>Orders ID: #{invoice.orderNumber.slice(-4)}</Text>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(invoice.status) }]}>
        <Text style={styles.statusBadgeText}>
          {invoice.status === 'delivered' ? 'Delivered' : 
           invoice.status === 'processing' ? 'Pending' : 'Cancelled'}
        </Text>
      </View>
    </View>

    <View style={styles.dateContainer}>
      <Text style={styles.dateLabel}>Dated:</Text>
      <Text style={styles.dateValue}>feb 16,2025</Text>
    </View>

    {/* Product Image Section */}
    <View style={styles.productImageSection}>
      <View style={styles.productImageGrid}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View key={item} style={styles.productImageItem}>
            <Text style={styles.productImagePlaceholder}>👕</Text>
          </View>
        ))}
      </View>
      <View style={styles.imageIndicators}>
        <View style={[styles.indicator, styles.activeIndicator]} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
      </View>
    </View>

    {/* Download and Share Section */}
    <View style={styles.actionSection}>
      <TouchableOpacity 
        style={styles.downloadButton}
        onPress={() => onDownload(invoice)}
        activeOpacity={0.8}
      >
        <Text style={styles.downloadButtonText}>Download Invoice</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.shareButton}
        onPress={() => onShare(invoice)}
        activeOpacity={0.8}
      >
        <ShareIcon />
      </TouchableOpacity>
    </View>

    {/* Order Info Section */}
    <View style={styles.infoSection}>
      <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
          <Text style={styles.infoIconText}>🛍</Text>
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Order Info</Text>
          <Text style={styles.infoDetail}>Shipping: Next express</Text>
          <Text style={styles.infoDetail}>Payment Method: Paypal</Text>
          <Text style={styles.infoDetail}>Status: {invoice.status === 'processing' ? 'Pending' : invoice.statusText}</Text>
        </View>
      </View>
    </View>

    {/* Customer Section */}
    <View style={styles.infoSection}>
      <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
          <Text style={styles.infoIconText}>👤</Text>
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Customer</Text>
          <Text style={styles.infoDetail}>Full Name: Shristi Singh</Text>
          <Text style={styles.infoDetail}>Email: shristi@gmail.com</Text>
          <Text style={styles.infoDetail}>Phone: +91 904 1212</Text>
        </View>
      </View>
    </View>

    {/* Billing Address Section */}
    <View style={styles.infoSection}>
      <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
          <Text style={styles.infoIconText}>🛍</Text>
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Billed to</Text>
          <Text style={styles.infoDetail}>
            Address: Dharam Colony, Palam Vihar, Gurgaon, Haryana
          </Text>
        </View>
      </View>
    </View>

    {/* Delivery Address Section */}
    <View style={styles.infoSection}>
      <Text style={styles.infoTitle}>Delivered to</Text>
      <Text style={styles.infoDetail}>
        Address: Dharam Colony, Palam Vihar, Gurgaon, Haryana
      </Text>
    </View>

    {/* Payment Info Section */}
    <View style={styles.paymentSection}>
      <Text style={styles.sectionTitle}>payment info</Text>
      <View style={styles.paymentRow}>
        <View style={styles.cardIcon} />
        <Text style={styles.paymentDetail}>Master Card **** **** 6557</Text>
      </View>
      <Text style={styles.paymentDetail}>Business name: Shristi Singh</Text>
      <Text style={styles.paymentDetail}>Phone: +91 904 231 1212</Text>
    </View>
  </ScrollView>
);

// Helper function for status colors
const getStatusColor = (status) => {
  switch (status) {
    case 'delivered':
      return '#4CD964';
    case 'cancelled':
      return '#EA4335';
    case 'processing':
      return 'rgba(255,165,47,0.8)';
    default:
      return '#666666';
  }
};

const InvoiceScreen = ({ navigation, route }) => {
  const slideAnim = React.useRef(new Animated.Value(300)).current;
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleBack = () => {
    if (selectedInvoice) {
      setSelectedInvoice(null);
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleDownloadInvoice = async (invoice) => {
    try {
      Alert.alert(
        'Download Started',
        `Invoice ${invoice.orderNumber} is being downloaded to your device.`,
        [{ text: 'OK' }]
      );
      console.log('Downloading invoice:', invoice.orderNumber);
    } catch (error) {
      Alert.alert(
        'Download Failed',
        'Failed to download invoice. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleShareInvoice = async (invoice) => {
    try {
      const result = await Share.share({
        message: `Invoice ${invoice.orderNumber} - Order ${invoice.statusText}\nDate: ${invoice.date}\nAmount: ${invoice.amount}`,
        title: `Invoice ${invoice.orderNumber}`,
        ...(Platform.OS === 'ios' && {
          url: `https://yoraa.app/invoice/${invoice.orderNumber}`,
        }),
      });

      if (result.action === Share.sharedAction) {
        console.log('Invoice shared successfully');
      }
    } catch (error) {
      Alert.alert(
        'Share Failed',
        'Failed to share invoice. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderInvoiceItem = (invoice) => (
    <View key={invoice.id} style={styles.invoiceItem}>
      {/* Status Header */}
      <Text style={[styles.statusText, { color: getStatusColor(invoice.status) }]}>
        {invoice.statusText}
      </Text>

      {/* Product Content */}
      <View style={styles.productContainer}>
        {/* Product Image */}
        <View style={[styles.imageContainer, { backgroundColor: invoice.imageColor }]}>
          <Text style={styles.imagePlaceholder}>👕</Text>
        </View>

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{invoice.productName}</Text>
          <Text style={styles.productDescription}>{invoice.productDetails}</Text>
          <Text style={styles.productSize}>{invoice.size}</Text>
        </View>
      </View>

      {/* View Invoice Button */}
      <TouchableOpacity 
        style={styles.viewInvoiceButton}
        onPress={() => handleViewInvoice(invoice)}
        activeOpacity={0.8}
      >
        <Text style={styles.viewInvoiceText}>view Invoice</Text>
      </TouchableOpacity>
    </View>
  );

  // If detailed invoice is selected, show detailed view
  if (selectedInvoice) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View 
          style={[
            styles.animatedContainer,
            {
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <BackArrowIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Invoice</Text>
            <View style={styles.headerSpacer} />
          </View>

          <DetailedInvoiceView 
            invoice={selectedInvoice} 
            onDownload={handleDownloadInvoice}
            onShare={handleShareInvoice}
          />
        </Animated.View>
      </SafeAreaView>
    );
  }

  // Main list view return
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.animatedContainer,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invoice</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {invoiceData.map(renderInvoiceItem)}
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
  animatedContainer: {
    flex: 1,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  headerSpacer: {
    width: 40,
  },

  // Content Styles
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  // Invoice Item Styles
  invoiceItem: {
    backgroundColor: 'transparent',
    marginBottom: 32,
  },

  // Status Styles
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },

  // Product Styles
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 24,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
    lineHeight: 22,
  },
  productDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
    lineHeight: 20,
  },
  productSize: {
    fontSize: 13,
    color: '#999999',
    lineHeight: 18,
  },

  // Button Styles
  viewInvoiceButton: {
    backgroundColor: '#000000',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    minWidth: 140,
  },
  viewInvoiceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  // Icon Styles
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
    color: '#767676',
  },

  // Detailed Invoice Styles
  detailedContainer: {
    flex: 1,
  },
  detailedScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  detailedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderIdText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#232321',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#232321',
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dateLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#232321',
    marginRight: 10,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#70706E',
    alignSelf: 'flex-end',
  },
  productImageSection: {
    marginBottom: 30,
    backgroundColor: '#EEE',
    borderRadius: 8,
    padding: 20,
    minHeight: 300,
  },
  productImageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  productImageItem: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImagePlaceholder: {
    fontSize: 24,
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    width: 8,
    height: 2,
    backgroundColor: '#848688',
    marginHorizontal: 2,
  },
  activeIndicator: {
    backgroundColor: '#000000',
    width: 24,
  },
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 20,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#232321',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoIconText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#232321',
    marginBottom: 8,
  },
  infoDetail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#70706E',
    marginBottom: 4,
    lineHeight: 22,
  },
  paymentSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#232321',
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    width: 36,
    height: 21,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginRight: 8,
  },
  paymentDetail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#70706E',
    marginBottom: 4,
  },
});

export default InvoiceScreen;
