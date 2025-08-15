import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

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
  <Svg width={23} height={23} viewBox="0 0 23 23" fill="none">
    <G clipPath="url(#clip0_533_7825)">
      <Path
        d="M19.5403 6.71155L20.2952 22.0387H3.63501L4.38989 6.71155H19.5403Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Path
        d="M7.82043 9.72615L7.82043 5.32004C7.82043 4.22082 8.2571 3.16662 9.03437 2.38935C9.81164 1.61208 10.8658 1.17542 11.9651 1.17542C13.0643 1.17542 14.1185 1.61208 14.8958 2.38935C15.673 3.16662 16.1097 4.22082 16.1097 5.32004V9.72615"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_533_7825">
        <Rect width="23" height="23" fill="white"/>
      </ClipPath>
    </Defs>
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

const ChevronDownIcon = ({ color = '#000000', rotated = false }) => (
  <Svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16" 
    fill="none"
    style={{ transform: [{ rotate: rotated ? '180deg' : '0deg' }] }}
  >
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
    details: true, // Open by default as shown in Figma
    specifications: false,
    manufacturing: false,
    shipping: false,
    sizeAndFit: false,
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const scrollViewRef = useRef(null);

  // Mock product data based on Figma designs
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
      { id: 6, type: 'image' },
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
        { id: 1, name: 'Nike Everyday Max Cushioned', price: 'US$25' },
        { id: 2, name: 'Nike Dri-FIT Low', price: 'US$18' },
        { id: 3, name: 'Nike Elite Crew', price: 'US$35' },
        { id: 4, name: 'Nike Spark Crew', price: 'US$20' },
      ],
      similarItems: [
        { id: 5, name: 'Adidas Athletic Socks', price: 'US$18' },
        { id: 6, name: 'Under Armour Performance', price: 'US$22' },
        { id: 7, name: 'Puma Sports Socks', price: 'US$15' },
        { id: 8, name: 'Reebok Training Socks', price: 'US$19' },
      ],
      othersBought: [
        { id: 9, name: 'Nike Training Shorts', price: 'US$45' },
        { id: 10, name: 'Nike Dri-FIT Tee', price: 'US$30' },
        { id: 11, name: 'Nike Wristbands', price: 'US$12' },
        { id: 12, name: 'Nike Headband', price: 'US$15' },
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
    setSelectedImageIndex(0);
  };

  const handleImageScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const imageIndex = Math.round(contentOffset.x / screenWidth);
    setSelectedImageIndex(imageIndex);
  };

  const navigateToReviews = () => {
    navigation.navigate('Reviews', { product: productData });
  };

  const handleSearchPress = () => {
    if (navigation) {
      navigation.navigate('Search');
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <BackIcon color="#000000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {productData?.name || 'Product Details'}
      </Text>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
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
            {/* Image placeholder */}
            <View style={[
              styles.imagePlaceholder,
              styles.imageBackgroundGray
            ]}>
              {/* Nike logo or product representation */}
              <View style={styles.imageContent}>
                <Text style={styles.nikeLogoText}>✓</Text>
              </View>
              {image.type === 'video' && (
                <View style={styles.videoIndicator}>
                  <Text style={styles.videoText}>▶</Text>
                </View>
              )}
            </View>
            
            {/* Floating heart icon */}
            <TouchableOpacity
              style={styles.floatingHeartIcon}
              onPress={toggleFavorite}
            >
              <HeartIcon filled={isFavorite} color={isFavorite ? '#FF0000' : '#000000'} />
            </TouchableOpacity>
            
            {/* Floating cart icon */}
            <TouchableOpacity style={styles.floatingCartIcon}>
              <CartIcon color="#000000" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      {/* Thumbnail images */}
      <View style={styles.thumbnailContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailScrollContent}
        >
          {(productData?.images || []).map((image, index) => (
            <TouchableOpacity
              key={image.id}
              style={[
                styles.thumbnailItem,
                selectedImageIndex === index && styles.selectedThumbnail
              ]}
              onPress={() => setSelectedImageIndex(index)}
            >
              <View style={styles.thumbnailImage}>
                <Text style={styles.thumbnailText}>✓</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const getVariantStyle = (variant, index) => {
    return {
      backgroundColor: variant.color,
      borderColor: variant.color === '#FFFFFF' ? '#DDD' : variant.color
    };
  };

  const renderVariantSelector = () => (
    <View style={styles.variantContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
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
                getVariantStyle(variant, index),
                selectedVariant === index && styles.selectedVariantColor,
                !variant.inStock && styles.outOfStockVariant
              ]}
            >
              {!variant.inStock && <View style={styles.strikeThrough} />}
            </View>
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
        rotated={expandedSections.details}
      />
    </TouchableOpacity>
  );

  const renderExpandableSection = (title, section, content) => (
    <View style={styles.expandableSection}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(section)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <ChevronDownIcon
          color="#000000"
          rotated={expandedSections[section]}
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
    <TouchableOpacity 
      style={styles.buyNowButton}
      onPress={() => navigation.navigate('BuyNow', { product: productData })}
    >
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
          rotated={expandedSections.sizeAndFit}
        />
      </TouchableOpacity>
      {expandedSections.sizeAndFit && (
        <View style={styles.sizeAndFitContent}>
          <View style={styles.fitMetric}>
            <Text style={styles.fitLabel}>Comfort</Text>
            <View style={styles.ratingBar}>
              {[1, 2, 3, 4, 5].map((dot) => (
                <View
                  key={dot}
                  style={[
                    styles.ratingDot,
                    dot <= (productData?.sizeAndFit?.comfort || 0) && styles.activeDot
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={styles.fitMetric}>
            <Text style={styles.fitLabel}>Durability</Text>
            <View style={styles.ratingBar}>
              {[1, 2, 3, 4, 5].map((dot) => (
                <View
                  key={dot}
                  style={[
                    styles.ratingDot,
                    dot <= (productData?.sizeAndFit?.durability || 0) && styles.activeDot
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
      <View style={styles.ratingLeft}>
        <View style={styles.ratingStars}>
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
                <View style={styles.recommendationImagePlaceholder}>
                  <Text style={styles.recommendationImageText}>✓</Text>
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
            <Text style={styles.detailsText}>
              {productData?.description || 'No description available'}
            </Text>
          </View>
        )}
        
        {/* Specifications Section */}
        {renderExpandableSection(
          'Specifications',
          'specifications',
          <View style={styles.specificationsContent}>
            <Text style={styles.specItem}>
              Material: {productData?.specifications?.material || 'N/A'}
            </Text>
            <Text style={styles.specItem}>
              Care: {productData?.specifications?.careInstructions || 'N/A'}
            </Text>
            <Text style={styles.specItem}>
              Origin: {productData?.specifications?.origin || 'N/A'}
            </Text>
          </View>
        )}
        
        {/* Manufacturing Details Section */}
        {renderExpandableSection(
          'Manufacturing Details',
          'manufacturing',
          <View style={styles.manufacturingContent}>
            <Text style={styles.specItem}>
              Sustainable Materials: {productData?.manufacturing?.sustainableMaterials || 'N/A'}
            </Text>
            <Text style={styles.specItem}>
              Ethical Production: {productData?.manufacturing?.ethicalProduction || 'N/A'}
            </Text>
          </View>
        )}
        
        {/* Shipping, Returns & Exchanges Section */}
        {renderExpandableSection(
          'Shipping, Returns & Exchanges',
          'shipping',
          <View style={styles.shippingContent}>
            <Text style={styles.specItem}>
              Delivery: {productData?.shipping?.delivery || 'N/A'}
            </Text>
            <Text style={styles.specItem}>
              Returns: {productData?.shipping?.returns || 'N/A'}
            </Text>
            <Text style={styles.specItem}>
              Exchanges: {productData?.shipping?.exchanges || 'N/A'}
            </Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50, // For status bar
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  searchButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  
  // Image Gallery Styles
  imageGalleryContainer: {
    marginBottom: 20,
  },
  imageGallery: {
    height: 350,
  },
  imageContainer: {
    width: screenWidth,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imagePlaceholder: {
    width: '90%',
    height: '90%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackgroundGray: {
    backgroundColor: '#F5F5F5',
  },
  imageContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nikeLogoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000000',
  },
  videoIndicator: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  floatingHeartIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingCartIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Thumbnail Styles
  thumbnailContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  thumbnailScrollContent: {
    paddingRight: 16,
  },
  thumbnailItem: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  selectedThumbnail: {
    borderColor: '#000000',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  
  // Variant Selector Styles
  variantContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  variantScrollContent: {
    paddingRight: 16,
  },
  variantItem: {
    marginRight: 12,
  },
  selectedVariantItem: {
    // Add any selection styling if needed
  },
  variantColor: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#DDD',
    position: 'relative',
  },
  selectedVariantColor: {
    borderWidth: 3,
    borderColor: '#000000',
  },
  outOfStockVariant: {
    opacity: 0.5,
  },
  strikeThrough: {
    position: 'absolute',
    top: '50%',
    left: -3,
    right: -3,
    height: 2,
    backgroundColor: '#FF0000',
    transform: [{ rotate: '45deg' }],
  },
  
  // Product Info Styles
  productInfoContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  // View Details Button
  viewDetailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  viewDetailsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  
  // Details Container
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  detailsText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  
  // Expandable Sections
  expandableSection: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  sectionContent: {
    paddingBottom: 16,
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
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 22,
  },
  
  // Buy Now Button
  buyNowButton: {
    backgroundColor: '#000000',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  
  // Size and Fit Styles
  sizeAndFitContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sizeAndFitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  sizeAndFitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  sizeAndFitContent: {
    paddingBottom: 16,
  },
  fitMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fitLabel: {
    fontSize: 16,
    color: '#000000',
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
    backgroundColor: '#E0E0E0',
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#000000',
  },
  fitValue: {
    fontSize: 16,
    color: '#666666',
  },
  
  // Rating and Reviews Styles
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  ratingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#666666',
  },
  reviewsLink: {
    fontSize: 16,
    color: '#000000',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  
  // Recommendations Styles
  recommendationsContainer: {
    marginBottom: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    color: '#999999',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },
  recommendationScroll: {
    paddingLeft: 16,
  },
  recommendationScrollContent: {
    paddingRight: 16,
  },
  recommendationItem: {
    width: 140,
    marginRight: 12,
  },
  recommendationImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  recommendationImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationImageText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  recommendationName: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
    lineHeight: 18,
  },
  recommendationPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  
  // Bottom spacing
  bottomSpacing: {
    height: 50,
  },
});

export default ProductDetailScreen;
