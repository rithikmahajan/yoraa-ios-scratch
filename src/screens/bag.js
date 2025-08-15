import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import BackButton from '../components/BackButton';
import {
  CartItem,
  EmptyBag,
  BagSummary,
  QuantityModal,
  SelectSizeBagModal,
  SizeChartModal,
  PromoSuccessModal,
  useBagState,
  bagStyles,
} from './bag';

const BagScreen = ({ navigation, route }) => {
  const {
    cartItems,
    quantityModalVisible,
    sizeModalVisible,
    sizeChartModalVisible,
    promoSuccessModalVisible,
    selectedQuantity,
    selectedSize,
    sizeChartActiveTab,
    selectedUnit,
    pointsApplied,
    promoCode,
    appliedPromoCode,
    swipeAnimations,
    swipeStates,
    setSelectedQuantity,
    setSelectedSize,
    setSizeChartActiveTab,
    setSelectedUnit,
    setPromoCode,
    setAppliedPromoCode,
    initializeCart,
    resetSwipe,
    deleteItem,
    openQuantityModal,
    closeQuantityModal,
    openSizeModal,
    closeSizeModal,
    openSizeChartModal,
    closeSizeChartModal,
    closePromoSuccessModal,
    applyPromoCode,
    handleDoneQuantity,
    handleDoneSize,
    togglePoints,
    animations,
  } = useBagState(route);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const renderCartItem = (item, index) => (
    <CartItem
      key={item.id}
      item={item}
      index={index}
      animation={swipeAnimations[item.id]}
      swipeState={swipeStates[item.id]}
      onQuantityPress={openQuantityModal}
      onSizePress={openSizeModal}
      onDelete={deleteItem}
      swipeAnimations={swipeAnimations}
      swipeStates={swipeStates}
      resetSwipe={resetSwipe}
    />
  );

  return (
    <SafeAreaView style={bagStyles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={bagStyles.header}>
        <BackButton 
          style={bagStyles.backButton}
          onPress={() => navigation.goBack()}
        />
        <Text style={bagStyles.headerTitle}>Bag</Text>
        <View style={bagStyles.headerSpacer} />
      </View>

      {/* Empty Bag State */}
      {cartItems.length === 0 ? (
        <EmptyBag onShopNow={() => navigation.navigate('Home')} />
      ) : (
        <>
          <ScrollView style={bagStyles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Cart Items */}
            <View style={bagStyles.cartContainer}>
              {cartItems.map((item, index) => renderCartItem(item, index))}
            </View>

            {/* Summary Sections */}
            <BagSummary
              cartItems={cartItems}
              appliedPromoCode={appliedPromoCode}
              pointsApplied={pointsApplied}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              onApplyPromoCode={applyPromoCode}
              onTogglePoints={togglePoints}
              onRemovePromoCode={() => setAppliedPromoCode(null)}
              onCheckout={() => navigation.navigate('Delivery')}
            />
          </ScrollView>

          {/* Checkout Button */}
          <View style={bagStyles.checkoutContainer}>
            <TouchableOpacity 
              style={bagStyles.checkoutButton}
              onPress={() => navigation.navigate('Delivery')}
            >
              <Text style={bagStyles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Modals */}
      <QuantityModal
        visible={quantityModalVisible}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={setSelectedQuantity}
        onDone={handleDoneQuantity}
        onClose={closeQuantityModal}
        slideAnim={animations.quantitySlideAnim}
        panY={animations.quantityPanY}
      />

      <SelectSizeBagModal
        visible={sizeModalVisible}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        onDone={handleDoneSize}
        onClose={closeSizeModal}
        onOpenSizeChart={openSizeChartModal}
        slideAnim={animations.sizeSlideAnim}
        panY={animations.sizePanY}
      />

      <SizeChartModal
        visible={sizeChartModalVisible}
        activeTab={sizeChartActiveTab}
        setActiveTab={setSizeChartActiveTab}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
        onClose={closeSizeChartModal}
        slideAnim={animations.sizeChartSlideAnim}
        panY={animations.sizeChartPanY}
      />

      <PromoSuccessModal
        visible={promoSuccessModalVisible}
        appliedPromoCode={appliedPromoCode}
        onClose={closePromoSuccessModal}
        slideAnim={animations.promoSuccessSlideAnim}
        opacityAnim={animations.promoSuccessOpacityAnim}
      />
    </SafeAreaView>
  );
};
export default BagScreen;
