import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import moment from 'moment';
// import { Spacing } from '../constants';
import BackButton from '../components/BackButton';

const { height: DEVICE_HEIGHT } = Dimensions.get('window');

// OrderManager class for managing orders
export class OrderManager {
  constructor() {
    this.orders = this.initializeOrders();
  }

  initializeOrders() {
    return [
      {
        id: 'ORD-001',
        status: 'confirmed',
        productDetails: "Roadster Men's Slim Fit Shirt",
        productSize: "M Roadster Men's Slim Fit Shirt",
        orderDate: '2025-01-10',
        estimatedDelivery: '2025-01-15',
        price: 899,
        rating: null,
        review: null,
        tracking: [
          {
            status: "Packing",
            location: "Warehouse - Delhi",
            timestamp: "2025-01-10T10:00:00Z",
          },
          {
            status: "Picked",
            location: "Courier Facility - Delhi",
            timestamp: "2025-01-11T08:30:00Z",
          },
        ]
      },
      {
        id: 'ORD-002',
        status: 'delivered',
        productDetails: "Zara Women's Dress",
        productSize: "L Zara Women's Dress",
        orderDate: '2025-01-05',
        deliveredDate: '2025-01-09',
        price: 1299,
        rating: null,
        review: null,
        tracking: [
          {
            status: "Packing",
            location: "Warehouse - Mumbai",
            timestamp: "2025-01-05T10:00:00Z",
          },
          {
            status: "Picked",
            location: "Courier Facility - Mumbai",
            timestamp: "2025-01-06T08:30:00Z",
          },
          {
            status: "In Transit",
            location: "Sorting Center - Pune",
            timestamp: "2025-01-07T14:45:00Z",
          },
          {
            status: "Delivered",
            location: "Customer Address - Pune",
            timestamp: "2025-01-09T17:15:00Z",
          },
        ]
      },
      {
        id: 'ORD-003',
        status: 'cancelled',
        productDetails: "Nike Casual Sneakers",
        productSize: "8 Nike Casual Sneakers",
        orderDate: '2025-01-08',
        cancelledDate: '2025-01-09',
        price: 2499,
        cancelReason: 'Customer request',
        rating: null,
        review: null
      },
      {
        id: 'ORD-004',
        status: 'exchange_return',
        productDetails: "Adidas Hooded Sweatshirt",
        productSize: "XL Adidas Hooded Sweatshirt",
        orderDate: '2025-01-03',
        deliveredDate: '2025-01-07',
        returnInitiated: '2025-01-12',
        price: 1799,
        returnType: 'exchange',
        rating: null,
        review: null,
        tracking: [
          {
            status: "Packing",
            location: "Warehouse - Delhi",
            timestamp: "2025-01-03T10:00:00Z",
          },
          {
            status: "Picked",
            location: "Courier Facility - Delhi",
            timestamp: "2025-01-04T08:30:00Z",
          },
          {
            status: "In Transit",
            location: "Sorting Center - Mumbai",
            timestamp: "2025-01-05T14:45:00Z",
          },
          {
            status: "Delivered",
            location: "Customer Address - Pune",
            timestamp: "2025-01-07T17:15:00Z",
          },
          {
            status: "Return Initiated",
            location: "Customer Address - Pune",
            timestamp: "2025-01-12T10:00:00Z",
          },
        ]
      }
    ];
  }

  getAllOrders() {
    return this.orders;
  }

  getOrderById(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  getOrdersByStatus(status) {
    return this.orders.filter(order => order.status === status);
  }

  createOrder(orderData) {
    const newOrder = {
      id: `ORD-${String(this.orders.length + 1).padStart(3, '0')}`,
      status: orderData.status || 'confirmed',
      productDetails: orderData.productName,
      productSize: `${orderData.productSize || 'M'} ${orderData.productName}`,
      orderDate: moment().format('YYYY-MM-DD'),
      estimatedDelivery: moment().add(5, 'days').format('YYYY-MM-DD'),
      price: Math.floor(Math.random() * 2000) + 500,
      rating: null,
      review: null,
      tracking: [
        {
          status: "Order Placed",
          location: "Order Processing Center",
          timestamp: moment().toISOString(),
        }
      ]
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  cancelOrder(orderId) {
    const order = this.getOrderById(orderId);
    if (order && order.status === 'confirmed') {
      order.status = 'cancelled';
      order.cancelledDate = moment().format('YYYY-MM-DD');
      order.cancelReason = 'Customer request';
      
      if (order.tracking) {
        order.tracking.push({
          status: "Cancelled",
          location: "Order Processing Center",
          timestamp: moment().toISOString(),
        });
      }
      
      return true;
    }
    return false;
  }

  initiateReturn(orderId, returnType = 'return') {
    const order = this.getOrderById(orderId);
    if (order && order.status === 'delivered') {
      order.status = 'exchange_return';
      order.returnInitiated = moment().format('YYYY-MM-DD');
      order.returnType = returnType;
      
      if (order.tracking) {
        order.tracking.push({
          status: `${returnType === 'return' ? 'Return' : 'Exchange'} Initiated`,
          location: "Customer Request",
          timestamp: moment().toISOString(),
        });
      }
      
      return true;
    }
    return false;
  }

  rateProduct(orderId, rating, review = '') {
    const order = this.getOrderById(orderId);
    if (order && order.status === 'delivered') {
      order.rating = rating;
      order.review = review;
      return true;
    }
    return false;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.getOrderById(orderId);
    if (order) {
      order.status = newStatus;
      
      if (order.tracking) {
        order.tracking.push({
          status: this.getStatusDisplayName(newStatus),
          location: "System Update",
          timestamp: moment().toISOString(),
        });
      }
      
      return true;
    }
    return false;
  }

  getStatusDisplayName(status) {
    const statusMap = {
      'confirmed': 'Order Confirmed',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
      'exchange_return': 'Return/Exchange Processing'
    };
    return statusMap[status] || status;
  }

  getOrderStats() {
    const stats = {
      total: this.orders.length,
      confirmed: this.getOrdersByStatus('confirmed').length,
      delivered: this.getOrdersByStatus('delivered').length,
      cancelled: this.getOrdersByStatus('cancelled').length,
      exchange_return: this.getOrdersByStatus('exchange_return').length
    };
    return stats;
  }
}

// Create a single instance of OrderManager
const orderManager = new OrderManager();

// TrackingModal Component
const TrackingModal = ({ visible, onClose, trackingData = [] }) => {
  const masterSteps = [
    { status: "Packing" },
    { status: "Picked" },
    { status: "In Transit" },
    { status: "Delivered" },
  ];

  const isStatusCompleted = (status) =>
    trackingData.find((step) => step.status === status);

  const getStepDetails = (status) =>
    trackingData.find((step) => step.status === status) || {};

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.trackingModalContent}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Order Status</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {masterSteps.map((step, index) => {
            const isFilled = isStatusCompleted(step.status);
            const stepData = getStepDetails(step.status);
            const isLast = index === masterSteps.length - 1;

            return (
              <View key={index} style={styles.trackingStep}>
                <View style={styles.stepIndicatorContainer}>
                  <View style={[styles.stepDot, isFilled && styles.stepDotFilled]}>
                    {isFilled && <View style={styles.stepDotInner} />}
                  </View>
                  {!isLast && <View style={[styles.stepLine, isFilled && styles.stepLineFilled]} />}
                </View>

                <View style={styles.stepTextContainer}>
                  <Text style={styles.stepStatus}>{step.status}</Text>
                  <Text style={styles.stepLocation} numberOfLines={1}>
                    {stepData.location || ""}
                  </Text>
                </View>
              </View>
            );
          })}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

// CancelOrderModal Component
const CancelOrderModal = ({ visible, onClose, onConfirm }) => (
  <Modal transparent visible={visible} animationType="slide">
    <TouchableOpacity
      activeOpacity={1}
      onPress={onClose}
      style={styles.modalOverlay}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalContent}
      >
        <Text style={styles.modalTitle}>Want to cancel your order?</Text>
        <Text style={styles.modalSubtext}>
          You can cancel order for a short time after they are placed - free of charge.
        </Text>

        <TouchableOpacity
          onPress={() => {
            onClose();
            onConfirm?.();
          }}
          style={[styles.modalButton, styles.primaryButton]}
        >
          <Text style={styles.primaryButtonText}>Cancel Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          style={[styles.modalButton, styles.secondaryButton]}
        >
          <Text style={styles.secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

// ConfirmationModal Component
const ConfirmationModal = ({ visible, onClose, title, message, buttonText }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.centeredModalOverlay}>
      <View style={styles.centeredModalContent}>
        <View style={styles.checkIcon}>
          <Text style={styles.checkText}>✓</Text>
        </View>
        
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalSubtext}>{message}</Text>
        
        <TouchableOpacity
          onPress={onClose}
          style={[styles.modalButton, styles.primaryButton, styles.modalButton70]}
        >
          <Text style={styles.primaryButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// ReturnRequestModal Component
const ReturnRequestModal = ({ visible, onClose, onConfirm }) => (
  <Modal transparent visible={visible} animationType="slide">
    <TouchableOpacity
      activeOpacity={1}
      onPress={onClose}
      style={styles.modalOverlay}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalContent}
      >
        <View style={styles.alertIcon}>
          <Text style={styles.alertText}>⚠</Text>
        </View>

        <Text style={styles.modalTitle}>Requesting Return</Text>
        <Text style={styles.modalSubtext}>
          Please note that Rs. 200 reverse shipment charges are applicable.
          Charges vary for International Delivery. Please read our return and
          exchange policies before proceeding.
        </Text>

        <TouchableOpacity
          onPress={() => {
            onClose();
            onConfirm?.();
          }}
          style={[styles.modalButton, styles.primaryButton]}
        >
          <Text style={styles.primaryButtonText}>Request Return</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          style={[styles.modalButton, styles.secondaryButton]}
        >
          <Text style={styles.secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

// ReturnOptionsModal Component
const ReturnOptionsModal = ({ visible, onClose, onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const RETURN_OPTIONS = [
    { label: "Size/Fit Issue (for exchanging the product)", value: "size_issue" },
    { label: "Product Not as Expected", value: "not_expected" },
    { label: "Wrong Item Received", value: "wrong_item" },
    { label: "Damaged/Defective Product", value: "damaged" },
    { label: "Late Delivery", value: "late_delivery" },
    { label: "Quality Not as Expected", value: "quality_issue" },
  ];

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.modalContent, { maxHeight: DEVICE_HEIGHT * 0.8 }]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Return Request</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: DEVICE_HEIGHT * 0.5 }}>
            <Text style={styles.sectionTitle}>Submit Return Request</Text>
            
            <View style={styles.optionsContainer}>
              {RETURN_OPTIONS.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedOption(item.value)}
                  key={item.value}
                  style={[
                    styles.optionItem,
                    index === RETURN_OPTIONS.length - 1 ? styles.optionItemLast : styles.optionItemNotLast,
                    selectedOption === item.value && styles.optionItemSelected
                  ]}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.chargeNote}>*Return request is chargeable</Text>
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              if (selectedOption) {
                onOptionSelect(selectedOption);
                onClose();
              } else {
                Alert.alert("Sorry!", "Please select an option");
              }
            }}
            style={[styles.modalButton, styles.primaryButton]}
          >
            <Text style={styles.primaryButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

// Main Orders Screen Component
const OrdersScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState(orderManager.getAllOrders());
  const [trackingModalVisible, setTrackingModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [returnRequestModalVisible, setReturnRequestModalVisible] = useState(false);
  const [returnOptionsModalVisible, setReturnOptionsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmationData, setConfirmationData] = useState({});

  const getFilteredOrders = () => {
    if (activeTab === 'all') return orders;
    return orders.filter(order => order.status === activeTab);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#FF9500';
      case 'delivered': return '#34C759';
      case 'cancelled': return '#FF3B30';
      case 'exchange_return': return '#007AFF';
      default: return '#8E8E93';
    }
  };

  const getButtonsForStatus = (status) => {
    switch (status) {
      case 'confirmed':
        return [
          { label: "Track Order", value: "track_order" },
          { label: "Cancel Order", value: "cancel_order" }
        ];
      case 'delivered':
        return [
          { label: "Buy Again", value: "buy_again" },
          { label: "Return/Exchange", value: "return_exchange" },
          { label: "Rate Product", value: "rate_product" }
        ];
      case 'exchange_return':
        return [{ label: "View/Track", value: "view_track" }];
      default:
        return [];
    }
  };

  const handleActionPress = (action, order) => {
    setSelectedOrder(order);
    
    switch (action) {
      case 'track_order':
      case 'view_track':
        setTrackingModalVisible(true);
        break;
      case 'cancel_order':
        setCancelModalVisible(true);
        break;
      case 'return_exchange':
        setReturnOptionsModalVisible(true);
        break;
      case 'buy_again':
        Alert.alert('Buy Again', 'This feature will be implemented soon');
        break;
      case 'rate_product':
        Alert.alert('Rate Product', 'This feature will be implemented soon');
        break;
    }
  };

  const handleCancelOrder = () => {
    if (selectedOrder && orderManager.cancelOrder(selectedOrder.id)) {
      setOrders([...orderManager.getAllOrders()]);
      setConfirmationData({
        title: 'Your Order has been Cancelled!',
        message: 'Your cancellation has been processed and you won\'t be charged. It can take a few minutes for this page to show your orders status updated.',
        buttonText: 'Got it'
      });
      setConfirmationModalVisible(true);
    }
  };

  const handleReturnOptionSelect = (option) => {
    if (option === 'size_issue') {
      // Exchange
      if (selectedOrder && orderManager.initiateReturn(selectedOrder.id, 'exchange')) {
        setOrders([...orderManager.getAllOrders()]);
        setConfirmationData({
          title: 'Thank you for requesting exchange!',
          message: 'We appreciate your patience. We\'ll get back to you with tracking details.',
          buttonText: 'Done'
        });
        setConfirmationModalVisible(true);
      }
    } else {
      // Return
      setReturnRequestModalVisible(true);
    }
  };

  const handleReturnConfirm = () => {
    if (selectedOrder && orderManager.initiateReturn(selectedOrder.id, 'return')) {
      setOrders([...orderManager.getAllOrders()]);
      setConfirmationData({
        title: 'Thank you for requesting return!',
        message: 'We appreciate your feedback. We\'ll use your feedback to improve your experience.',
        buttonText: 'Done'
      });
      setConfirmationModalVisible(true);
    }
  };

  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Returns', value: 'exchange_return' },
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.replace('_', ' ').toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.productDetails}>{item.productDetails}</Text>
      <Text style={styles.productSize}>{item.productSize}</Text>
      
      <View style={styles.orderInfo}>
        <Text style={styles.orderDate}>Order Date: {moment(item.orderDate).format('MMM DD, YYYY')}</Text>
        <Text style={styles.orderPrice}>₹{item.price}</Text>
      </View>

      {item.estimatedDelivery && (
        <Text style={styles.deliveryDate}>
          Estimated Delivery: {moment(item.estimatedDelivery).format('MMM DD, YYYY')}
        </Text>
      )}

      <View style={styles.actionButtons}>
        {getButtonsForStatus(item.status).map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.actionButton,
              index === 0 ? styles.primaryActionButton : styles.secondaryActionButton
            ]}
            onPress={() => handleActionPress(button.value, item)}
          >
            <Text style={[
              styles.actionButtonText,
              index === 0 ? styles.primaryActionButtonText : styles.secondaryActionButtonText
            ]}>
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation?.goBack?.()} style={styles.backButton} />
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tab, activeTab === tab.value && styles.activeTab]}
            onPress={() => setActiveTab(tab.value)}
          >
            <Text style={[styles.tabText, activeTab === tab.value && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={getFilteredOrders()}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />

      <TrackingModal
        visible={trackingModalVisible}
        onClose={() => setTrackingModalVisible(false)}
        trackingData={selectedOrder?.tracking || []}
      />

      <CancelOrderModal
        visible={cancelModalVisible}
        onClose={() => setCancelModalVisible(false)}
        onConfirm={handleCancelOrder}
      />

      <ConfirmationModal
        visible={confirmationModalVisible}
        onClose={() => setConfirmationModalVisible(false)}
        title={confirmationData.title}
        message={confirmationData.message}
        buttonText={confirmationData.buttonText}
      />

      <ReturnRequestModal
        visible={returnRequestModalVisible}
        onClose={() => setReturnRequestModalVisible(false)}
        onConfirm={handleReturnConfirm}
      />

      <ReturnOptionsModal
        visible={returnOptionsModalVisible}
        onClose={() => setReturnOptionsModalVisible(false)}
        onOptionSelect={handleReturnOptionSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSpacer: {
    width: 40,
  },
  tabsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  productDetails: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productSize: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  deliveryDate: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  primaryActionButton: {
    backgroundColor: '#000',
  },
  secondaryActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  primaryActionButtonText: {
    color: 'white',
  },
  secondaryActionButtonText: {
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    maxHeight: DEVICE_HEIGHT * 0.6,
  },
  trackingModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: DEVICE_HEIGHT * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  trackingStep: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stepIndicatorContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  stepDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotFilled: {
    borderColor: '#000',
  },
  stepDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  stepLine: {
    width: 2,
    height: 32,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
  },
  stepLineFilled: {
    backgroundColor: '#000',
  },
  stepTextContainer: {
    flex: 1,
    paddingTop: 2,
  },
  stepStatus: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  stepLocation: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  centeredModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredModalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  checkIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  alertIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  alertText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionItem: {
    padding: 15,
    borderBottomColor: '#E0E0E0',
  },
  optionItemLast: {
    borderBottomWidth: 0,
  },
  optionItemNotLast: {
    borderBottomWidth: 0.7,
  },
  optionItemSelected: {
    backgroundColor: '#F5F5F5',
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  chargeNote: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 20,
  },
  modalButton70: {
    width: '70%',
  },
});

export default OrdersScreen;
