import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors, Spacing, FontSizes, FontWeights, FontFamilies, BorderRadius } from '../constants';

const { width: screenWidth } = Dimensions.get('window');

// SVG Icons
const BackIcon = ({ color = '#000000' }) => (
  <Svg width={10} height={17} viewBox="0 0 10 17" fill="none">
    <Path
      d="M8.5 16L1 8.5L8.5 1"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SearchIcon = ({ color = '#000000' }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Z"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="m19 19-4.35-4.35"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HeartIcon = ({ filled = false, color = '#000000' }) => (
  <Svg width={20} height={18} viewBox="0 0 20 18" fill="none">
    <Path
      d="M2.69832 2.69832C0.433893 4.96274 0.433895 8.6341 2.69832 10.8985L11.4813 16.6815L11.5417 16.6211L11.6021 16.6816L20.3851 10.8986C22.6495 8.63417 22.6495 4.96281 20.3851 2.69839C18.1207 0.433968 14.4493 0.43397 12.1849 2.69839L11.8953 2.98798C11.7 3.18324 11.3834 3.18324 11.1882 2.98798L10.8985 2.69832C8.6341 0.433894 4.96274 0.433895 2.69832 2.69832Z"
      stroke={color}
      strokeWidth="1.5"
      fill={filled ? color : "none"}
    />
  </Svg>
);

const CartIcon = ({ color = '#000000' }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M6 1L3 5V19A1 1 0 0 0 4 20H16A1 1 0 0 0 17 19V5L14 1H6Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 5H17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13 9C13 10.6569 11.6569 12 10 12C8.34315 12 7 10.6569 7 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StarIcon = ({ filled = false, color = '#FFD700' }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 1L10.09 5.26L15 6L11.5 9.74L12.18 15L8 12.77L3.82 15L4.5 9.74L1 6L5.91 5.26L8 1Z"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronDownIcon = ({ color = '#000000' }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M4 6L8 10L12 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route?.params || {};
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    details: true, // Open by default as per requirement
    specifications: false,
    manufacturing: false,
    shipping: false,
    sizeAndFit: false,
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const scrollViewRef = useRef(null);

  // Enhanced mock product data based on Figma designs
  const defaultProductData = {
    id: '1',
    name: 'Training Crew Socks',
    subtitle: 'Nike Everyday Plus Cushioned',
    price: 'US$22',
    originalPrice: 'US$28',
    discount: '21% off',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    images: [
      { id: 1, type: 'image' },
      { id: 2, type: 'image' },
      { id: 3, type: 'video' },
      { id: 4, type: 'image' },
      { id: 5, type: 'image' },
    ],
    variants: [
      { id: 1, color: '#000000', name: 'Black', inStock: true, quantity: 5 },
      { id: 2, color: '#FFFFFF', name: 'White', inStock: true, quantity: 3 },
      { id: 3, color: '#FF0000', name: 'Red', inStock: true, quantity: 2 },
      { id: 4, color: '#0000FF', name: 'Blue', inStock: true, quantity: 4 },
      { id: 5, color: '#008000', name: 'Green', inStock: true, quantity: 1 },
      { id: 6, color: '#808080', name: 'Gray', inStock: false, quantity: 0 },
    ],
    description: 'Premium quality training socks with extra cushioning for comfort during workouts. Made with moisture-wicking fabric that keeps your feet dry and comfortable throughout your training session.',
    specifications: {
      material: '75% Cotton, 20% Polyester, 5% Elastane',
      careInstructions: 'Machine wash cold, tumble dry low',
      origin: 'Made in Vietnam',
    },
    manufacturing: {
      sustainableMaterials: 'Uses recycled polyester fibers',
      ethicalProduction: 'Fair trade certified factory',
    },
    shipping: {
      delivery: 'Free shipping on orders over $50',
      returns: '30-day return policy',
      exchanges: 'Free exchanges within 60 days',
    },
    sizeAndFit: {
      comfort: 4.5,
      durability: 4.2,
      sizing: 'True to size',
    },
    reviews: [
      { 
        id: 1, 
        user: 'Ashutosh', 
        rating: 5, 
        comment: 'Amazing quality socks! Very comfortable for long workouts and the cushioning is perfect. Highly recommend for anyone who trains regularly.',
        date: '2 days ago'
      },
      { 
        id: 2, 
        user: 'Sarah M.', 
        rating: 4, 
        comment: 'Good quality, fits well. Would recommend for everyday wear.',
        date: '1 week ago'
      },
      { 
        id: 3, 
        user: 'Mike D.', 
        rating: 5, 
        comment: 'Love these socks! Very comfortable and durable. Worth the price.',
        date: '2 weeks ago'
      },
    ],
    recommendations: {
      youMightLike: [
        { id: 1, name: 'Training Shorts', price: 'US$35' },
        { id: 2, name: 'Workout Tee', price: 'US$25' },
        { id: 3, name: 'Sports Bra', price: 'US$45' },
        { id: 4, name: 'Running Shoes', price: 'US$120' },
      ],
      similarItems: [
        { id: 5, name: 'Athletic Socks', price: 'US$18' },
        { id: 6, name: 'Compression Socks', price: 'US$30' },
        { id: 7, name: 'Cotton Socks', price: 'US$15' },
        { id: 8, name: 'Performance Socks', price: 'US$28' },
      ],
      othersBought: [
        { id: 9, name: 'Gym Towel', price: 'US$12' },
        { id: 10, name: 'Water Bottle', price: 'US$20' },
        { id: 11, name: 'Wrist Bands', price: 'US$8' },
        { id: 12, name: 'Headband', price: 'US$15' },
      ],
    }
  };

  const productData = product || defaultProductData;

  const recommendationTabs = ['You Might Also Like', 'Similar Items', 'Others Also Bought'];

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleVariantPress = (variantIndex) => {
    setSelectedVariant(variantIndex);
    // Update images based on variant
    setSelectedImageIndex(0);
  };

  const handleImageScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const imageIndex = Math.round(contentOffset.x / screenWidth);
    setSelectedImageIndex(imageIndex);
  };

  const navigateToReviews = () => {
    // Navigate to full reviews page
    navigation.navigate('Reviews', { product: productData });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <BackIcon color="#000000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle} numberOfLines={1}>{productData?.name || 'Product Details'}</Text>
      <TouchableOpacity style={styles.searchButton}>
        <SearchIcon color="#000000" />
      </TouchableOpacity>
    </View>
  );

  const renderImageGallery = () => (
    <View style={styles.imageGalleryContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}
        onScroll={handleImageScroll}
        scrollEventThrottle={16}
      >
        {(productData?.images || []).map((image, index) => (
          <View key={image.id} style={styles.imageContainer}>
            {/* Image placeholder with variant color background */}
            <View style={[
              styles.imagePlaceholder,
              { backgroundColor: productData?.variants?.[selectedVariant]?.color || '#000000' }
            ]}>
              {/* Placeholder for actual image */}
              <View style={styles.imageContent}>
                <Text style={styles.imagePlaceholderText}>Product Image {index + 1}</Text>
              </View>
              {image.type === 'video' && (
                <View style={styles.videoIndicator}>
                  <Text style={styles.videoText}>VIDEO</Text>
                </View>
              )}
            </View>
            
            {/* Floating heart and cart icons */}
            <TouchableOpacity
              style={styles.floatingHeartIcon}
              onPress={toggleFavorite}
            >
              <HeartIcon filled={isFavorite} color={isFavorite ? '#FF0000' : '#000000'} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.floatingCartIcon}>
              <CartIcon color="#000000" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      {/* Image indicators */}
      <View style={styles.imageIndicators}>
        {(productData?.images || []).map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              selectedImageIndex === index && styles.activeIndicator
            ]}
          />
        ))}
      </View>
    </View>
  );

  const renderVariantSelector = () => (
    <View style={styles.variantContainer}>
      <Text style={styles.variantTitle}>Articles ({(productData?.variants || []).length} colors)</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.variantScroll}
        contentContainerStyle={styles.variantScrollContent}
      >
        {(productData?.variants || []).map((variant, index) => (
          <TouchableOpacity
            key={variant.id}
            style={[
              styles.variantItem,
              selectedVariant === index && styles.selectedVariantItem
            ]}
            onPress={() => handleVariantPress(index)}
          >
            <View
              style={[
                styles.variantColor,
                { backgroundColor: variant.color },
                !variant.inStock && styles.outOfStockVariant
              ]}
            >
              {!variant.inStock && <View style={styles.strikeThrough} />}
            </View>
            <Text style={[
              styles.variantName,
              !variant.inStock && styles.outOfStockText
            ]}>
              {variant.name}
            </Text>
            {!variant.inStock && (
              <Text style={styles.outOfStockLabel}>Out of Stock</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
  const renderProductInfo = () => (
    <View style={styles.productInfoContainer}>
      <Text style={styles.productTitle}>{productData?.name || 'Product Name'}</Text>
      <Text style={styles.productSubtitle}>{productData?.subtitle || 'Product Subtitle'}</Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>{productData?.price || 'US$0'}</Text>
        {productData?.originalPrice && (
          <Text style={styles.originalPrice}>{productData.originalPrice}</Text>
        )}
        {productData?.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{productData.discount}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderViewDetailsButton = () => (
    <TouchableOpacity
      style={styles.viewDetailsButton}
      onPress={() => toggleSection('details')}
    >
      <Text style={styles.viewDetailsText}>View Product Details</Text>
      <ChevronDownIcon
        color="#000000"
        style={[
          styles.chevronIcon,
          expandedSections.details && styles.chevronRotated
        ]}
      />
    </TouchableOpacity>
  );

  const renderExpandableSection = (title, section, content, isOpen = false) => (
    <View style={styles.expandableSection}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(section)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <ChevronDownIcon
          color="#000000"
          style={[
            styles.chevronIcon,
            expandedSections[section] && styles.chevronRotated
          ]}
        />
      </TouchableOpacity>
      {expandedSections[section] && (
        <View style={styles.sectionContent}>
          {content}
        </View>
      )}
    </View>
  );

  const renderBuyNowButton = () => (
    <TouchableOpacity style={styles.buyNowButton}>
      <Text style={styles.buyNowText}>Buy Now</Text>
    </TouchableOpacity>
  );

  const renderSizeAndFit = () => (
    <View style={styles.sizeAndFitContainer}>
      <TouchableOpacity
        style={styles.sizeAndFitHeader}
        onPress={() => toggleSection('sizeAndFit')}
      >
        <Text style={styles.sizeAndFitTitle}>Size & Fit</Text>
        <ChevronDownIcon
          color="#000000"
          style={[
            styles.chevronIcon,
            expandedSections.sizeAndFit && styles.chevronRotated
          ]}
        />
      </TouchableOpacity>
      {expandedSections.sizeAndFit && (
        <View style={styles.sizeAndFitContent}>
          <View style={styles.fitMetric}>
            <Text style={styles.fitLabel}>Comfort</Text>
            <View style={styles.ratingBar}>
              {[1, 2, 3, 4, 5].map((star) => (
                <View
                  key={star}
                  style={[
                    styles.ratingDot,
                    star <= (productData?.sizeAndFit?.comfort || 0) && styles.activeDot
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={styles.fitMetric}>
            <Text style={styles.fitLabel}>Durability</Text>
            <View style={styles.ratingBar}>
              {[1, 2, 3, 4, 5].map((star) => (
                <View
                  key={star}
                  style={[
                    styles.ratingDot,
                    star <= (productData?.sizeAndFit?.durability || 0) && styles.activeDot
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={styles.fitMetric}>
            <Text style={styles.fitLabel}>Sizing</Text>
            <Text style={styles.fitValue}>{productData?.sizeAndFit?.sizing || 'Unknown'}</Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderRatingAndReviews = () => (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingHeader}>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              filled={star <= Math.floor(productData?.rating || 0)}
              color="#FFD700"
            />
          ))}
        </View>
        <Text style={styles.ratingText}>
          {productData?.rating || 0} ({productData?.reviewCount || 0} reviews)
        </Text>
      </View>
      <TouchableOpacity onPress={navigateToReviews}>
        <Text style={styles.reviewsLink}>Reviews</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecommendations = () => {
    const getRecommendationData = () => {
      const recommendations = productData?.recommendations;
      if (!recommendations) return [];
      
      switch (selectedTab) {
        case 0:
          return recommendations.youMightLike || [];
        case 1:
          return recommendations.similarItems || [];
        case 2:
          return recommendations.othersBought || [];
        default:
          return recommendations.youMightLike || [];
      }
    };

    return (
      <View style={styles.recommendationsContainer}>
        <View style={styles.tabsContainer}>
          {recommendationTabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                selectedTab === index && styles.activeTab
              ]}
              onPress={() => setSelectedTab(index)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === index && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recommendationScroll}
          contentContainerStyle={styles.recommendationScrollContent}
        >
          {getRecommendationData().map((item) => (
            <TouchableOpacity key={item.id} style={styles.recommendationItem}>
              <View style={styles.recommendationImage}>
                {/* Placeholder for recommendation image */}
                <View style={styles.recommendationImagePlaceholder}>
                  <Text style={styles.recommendationImageText}>IMG</Text>
                </View>
              </View>
              <Text style={styles.recommendationName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.recommendationPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        {renderImageGallery()}
        
        {/* Variant Selector */}
        {renderVariantSelector()}
        
        {/* Product Information */}
        {renderProductInfo()}
        
        {/* View Product Details Button */}
        {renderViewDetailsButton()}
        
        {/* Product Details Section - Open by default */}
        {expandedSections.details && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>{productData?.description || 'No description available'}</Text>
          </View>
        )}
        
        {/* Specifications Section - Closed by default */}
        {renderExpandableSection(
          'Specifications',
          'specifications',
          <View style={styles.specificationsContent}>
            <Text style={styles.specItem}>Material: {productData?.specifications?.material || 'N/A'}</Text>
            <Text style={styles.specItem}>Care: {productData?.specifications?.careInstructions || 'N/A'}</Text>
            <Text style={styles.specItem}>Origin: {productData?.specifications?.origin || 'N/A'}</Text>
          </View>
        )}
        
        {/* Manufacturing Details Section - Closed by default */}
        {renderExpandableSection(
          'Manufacturing Details',
          'manufacturing',
          <View style={styles.manufacturingContent}>
            <Text style={styles.specItem}>Sustainable Materials: {productData?.manufacturing?.sustainableMaterials || 'N/A'}</Text>
            <Text style={styles.specItem}>Ethical Production: {productData?.manufacturing?.ethicalProduction || 'N/A'}</Text>
          </View>
        )}
        
        {/* Shipping, Returns & Exchanges Section - Closed by default */}
        {renderExpandableSection(
          'Shipping, Returns & Exchanges',
          'shipping',
          <View style={styles.shippingContent}>
            <Text style={styles.specItem}>Delivery: {productData?.shipping?.delivery || 'N/A'}</Text>
            <Text style={styles.specItem}>Returns: {productData?.shipping?.returns || 'N/A'}</Text>
            <Text style={styles.specItem}>Exchanges: {productData?.shipping?.exchanges || 'N/A'}</Text>
          </View>
        )}
        
        {/* Buy Now Button */}
        {renderBuyNowButton()}
        
        {/* Size & Fit Section */}
        {renderSizeAndFit()}
        
        {/* Rating and Reviews */}
        {renderRatingAndReviews()}
        
        {/* Recommendations */}
        {renderRecommendations()}
        
        {/* Extra spacing at bottom */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingTop: 50, // For status bar
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    fontFamily: FontFamilies.semiBold,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Spacing.md,
  },
  searchButton: {
    padding: Spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  
  // Image Gallery Styles
  imageGalleryContainer: {
    marginBottom: Spacing.lg,
  },
  imageGallery: {
    height: 400,
  },
  imageContainer: {
    width: screenWidth,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imagePlaceholder: {
    width: '85%',
    height: '85%',
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    width: '80%',
    height: '80%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  videoIndicator: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  videoText: {
    color: '#FFFFFF',
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
  },
  floatingHeartIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: BorderRadius.round,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  floatingCartIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: BorderRadius.round,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.textPrimary,
  },
  
  // Variant Selector Styles
  variantContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  variantTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  variantScroll: {
    flexGrow: 0,
  },
  variantScrollContent: {
    paddingRight: Spacing.lg,
  },
  variantItem: {
    alignItems: 'center',
    marginRight: Spacing.lg,
    minWidth: 60,
  },
  selectedVariantItem: {
    // Add visual feedback for selection
  },
  variantColor: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.border,
    position: 'relative',
  },
  selectedVariant: {
    borderColor: Colors.textPrimary,
    borderWidth: 3,
  },
  outOfStockVariant: {
    opacity: 0.5,
  },
  strikeThrough: {
    position: 'absolute',
    top: '50%',
    left: -5,
    right: -5,
    height: 2,
    backgroundColor: Colors.error,
    transform: [{ rotate: '45deg' }],
  },
  variantName: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  outOfStockText: {
    color: Colors.textTertiary,
  },
  outOfStockLabel: {
    fontSize: FontSizes.xs,
    color: Colors.error,
    textAlign: 'center',
  },
  
  // Product Info Styles
  productInfoContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  productTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    fontFamily: FontFamilies.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  productSubtitle: {
    fontSize: FontSizes.lg,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  currentPrice: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    fontFamily: FontFamilies.bold,
    color: Colors.textPrimary,
    marginRight: Spacing.md,
  },
  originalPrice: {
    fontSize: FontSizes.lg,
    color: Colors.textTertiary,
    textDecorationLine: 'line-through',
    marginRight: Spacing.sm,
  },
  discountBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    fontSize: FontSizes.sm,
    color: '#FFFFFF',
    fontWeight: FontWeights.bold,
  },
  
  // View Details Button
  viewDetailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.backgroundSecondary,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  viewDetailsText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.medium,
    color: Colors.textPrimary,
  },
  
  // Details Container
  detailsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.xl,
  },
  detailsText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  
  // Expandable Sections
  expandableSection: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
  chevronIcon: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  sectionContent: {
    paddingBottom: Spacing.lg,
  },
  specificationsContent: {
    // Specifications styles
  },
  manufacturingContent: {
    // Manufacturing styles
  },
  shippingContent: {
    // Shipping styles
  },
  specItem: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  
  // Buy Now Button
  buyNowButton: {
    backgroundColor: Colors.textPrimary,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: Colors.background,
  },
  
  // Size and Fit Styles
  sizeAndFitContainer: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  sizeAndFitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  sizeAndFitTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
  sizeAndFitContent: {
    paddingBottom: Spacing.lg,
  },
  fitMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  fitLabel: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    flex: 1,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: Colors.textPrimary,
  },
  fitValue: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  
  // Rating and Reviews Styles
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: Spacing.sm,
  },
  ratingText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  reviewsLink: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    textDecorationLine: 'underline',
    fontWeight: FontWeights.medium,
  },
  
  // Reviews Styles
  reviewsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  writeReviewButton: {
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  writeReviewText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.textPrimary,
  },
  reviewItem: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reviewUser: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
  reviewDate: {
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
  },
  reviewStars: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  reviewComment: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  
  // Recommendations Styles
  recommendationsContainer: {
    marginBottom: Spacing.xxxl,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  tab: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    marginRight: Spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.textPrimary,
  },
  tabText: {
    fontSize: FontSizes.md,
    color: Colors.textTertiary,
  },
  activeTabText: {
    color: Colors.textPrimary,
    fontWeight: FontWeights.semiBold,
  },
  recommendationScroll: {
    paddingLeft: Spacing.lg,
  },
  recommendationScrollContent: {
    paddingRight: Spacing.lg,
  },
  recommendationItem: {
    width: 140,
    marginRight: Spacing.md,
  },
  recommendationImage: {
    width: 140,
    height: 140,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  recommendationImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationImageText: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  recommendationName: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    lineHeight: 18,
  },
  recommendationPrice: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
  
  // Bottom spacing
  bottomSpacing: {
    height: 50,
  },
});

export default ProductDetailScreen;