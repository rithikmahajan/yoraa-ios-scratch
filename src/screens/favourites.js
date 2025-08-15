import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { FontWeights, Spacing } from '../constants';
import { useFavorites } from '../contexts/FavoritesContext';
import BackButton from '../components/BackButton';
import { HeartIcon, DeleteIcon, CheckmarkIcon } from '../assets/icons';

const screenWidth = Dimensions.get('window').width;

const Favourites = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false);
  const { favorites, removeFromFavorites } = useFavorites();
  
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddToBagModal, setShowAddToBagModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(4);
  const [selectedSize, setSelectedSize] = useState('L (W 10-13 / M 8-12)');

  const quantities = ['Remove', 1, 2, 3, 4, 5, 6, 7, 8];
  const sizes = [
    'L (W 6-10 / M 6-8)',
    'L (W 10-13 / M 8-12)', 
    'XL (M 12-15 / M 6-8)'
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleDeleteItem = (itemId) => {
    removeFromFavorites(itemId);
  };

  const handleProductPress = (product) => {
    if (!editMode) {
      setSelectedProduct(product);
      setShowProductModal(true);
    }
  };

  const toggleShowBag = () => {
    setShowAddToBagModal(!showAddToBagModal);
    setShowProductModal(false);
  };

  const handleAddFavoritesNow = () => {
    navigation.navigate('Home');
  };

  // Empty State Component
  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContent}>
        <View style={styles.heartIconContainer}>
          <HeartIcon size={60} color="#14142B" />
        </View>
        <Text style={styles.emptyTitle}>
          Your Favourites is empty.{'\n'}
          When you add products, they'll{'\n'}
          appear here.
        </Text>
      </View>
      <View style={styles.emptyButtonContainer}>
        <TouchableOpacity style={styles.addFavoritesButton} onPress={handleAddFavoritesNow}>
          <Text style={styles.addFavoritesButtonText}>Add Favourites Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Product Component
  const Product = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleProductPress(item)}
      style={[
        styles.productContainer,
        { marginRight: index % 2 === 0 ? '2%' : 0 }
      ]}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {editMode && (
          <TouchableOpacity 
            style={styles.deleteIcon}
            onPress={() => handleDeleteItem(item.id)}
          >
            <View style={styles.deleteIconContainer}>
              <DeleteIcon size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>US${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  // Product Modal Component
  const ProductPopOver = ({ visible, onClose, product }) => (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.productHeader}>
            <Image source={{ uri: product?.image }} style={styles.modalProductImage} />
            <View style={styles.modalProductInfo}>
              <Text style={styles.modalProductName}>{product?.name}</Text>
              <Text style={styles.modalProductCategory}>Shoes</Text>
              <Text style={styles.modalProductPrice}>US${product?.price}</Text>
            </View>
          </View>

          <View style={styles.quantitySection}>
            <FlatList
              data={quantities}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.quantityOption,
                    selectedQuantity === item && styles.selectedQuantityOption
                  ]}
                  onPress={() => setSelectedQuantity(item)}
                >
                  <Text style={[
                    styles.quantityText,
                    selectedQuantity === item && styles.selectedQuantityText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={styles.sizeSection}>
            <Text style={styles.sizeTitle}>Size</Text>
            <FlatList
              data={sizes}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.sizeOption,
                    selectedSize === item && styles.selectedSizeOption
                  ]}
                  onPress={() => setSelectedSize(item)}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSize === item ? styles.selectedSizeText : 
                    index === 2 ? styles.disabledSizeText : styles.sizeText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <TouchableOpacity style={styles.sizeChartButton}>
            <Text style={styles.sizeChartText}>Size Chart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToBagButton} onPress={toggleShowBag}>
            <Text style={styles.addToBagButtonText}>Add to Bag</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Bag Added Modal Component  
  const BagPopOver = ({ visible, onClose }) => (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.bagModalOverlay}>
        <View style={styles.bagModalContainer}>
          <View style={styles.bagModalContent}>
            <View style={styles.checkIconContainer}>
              <CheckmarkIcon width={41} height={41} color="#4CAF50" />
            </View>
            <Text style={styles.addedToBagText}>Added to Bag</Text>
          </View>
          <View style={styles.bagModalButtonContainer}>
            <TouchableOpacity style={styles.viewBagButton} onPress={onClose}>
              <Text style={styles.viewBagButtonText}>View Bag</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={handleGoBack} style={styles.backButton} />
        
        <Text style={styles.headerTitle}>Favourites</Text>
        
        {favorites.length > 0 && (
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.editText}>
              {editMode ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Product Grid or Empty State */}
      <FlatList
        style={styles.productList}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        data={favorites}
        renderItem={({ item, index }) => <Product item={item} index={index} />}
        ListEmptyComponent={<EmptyList />}
      />

      {/* Modals */}
      <ProductPopOver
        visible={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={selectedProduct}
      />
      
      <BagPopOver
        visible={showAddToBagModal}
        onClose={() => setShowAddToBagModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 28,
    color: '#000',
  },
  headerTitle: {
    fontSize: 28,
    color: '#000',
    fontWeight: FontWeights.medium,
  },
  editText: {
    fontSize: 16,
    color: '#000',
  },

  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  heartIconContainer: {
    marginBottom: 20,
  },
  emptyHeartIcon: {
    width: 60,
    height: 60,
  },
  emptyTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    lineHeight: 24,
  },
  emptyButtonContainer: {
    position: 'absolute',
    bottom: 40,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  addFavoritesButton: {
    borderWidth: 1,
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 100,
  },
  addFavoritesButtonText: {
    fontSize: 16,
    color: '#fff',
  },

  // Product List Styles
  productList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  productContainer: {
    width: '49%',
    marginBottom: 21,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    resizeMode: 'cover',
    height: 184,
    width: '100%',
  },
  deleteIcon: {
    position: 'absolute',
    right: 10,
    top: -5,
  },
  deleteIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CA3327',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    paddingLeft: 14,
    paddingTop: 14,
  },
  productName: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  productPrice: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },

  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },

  // Product Header in Modal
  productHeader: {
    padding: 24,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    marginBottom: 24,
  },
  modalProductImage: {
    height: 154,
    width: 154,
    resizeMode: 'cover',
    marginRight: 16,
  },
  modalProductInfo: {
    justifyContent: 'space-between',
    paddingBottom: 8,
    flex: 1,
  },
  modalProductName: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalProductCategory: {
    color: '#767676',
    fontSize: 14,
    marginTop: 4,
  },
  modalProductPrice: {
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
  },

  // Quantity Section
  quantitySection: {
    marginBottom: 20,
  },
  quantityOption: {
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    marginLeft: 10,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  selectedQuantityOption: {
    borderColor: '#000',
  },
  quantityText: {
    color: '#BABABA',
    fontSize: 16,
  },
  selectedQuantityText: {
    color: '#000',
  },

  // Size Section
  sizeSection: {
    marginBottom: 18,
  },
  sizeTitle: {
    paddingVertical: 12,
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  sizeOption: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 4,
    marginLeft: 10,
  },
  selectedSizeOption: {
    borderColor: '#000',
  },
  sizeText: {
    fontSize: 16,
    color: '#000',
  },
  selectedSizeText: {
    color: '#000',
  },
  disabledSizeText: {
    color: '#BABABA',
  },

  // Size Chart Button
  sizeChartButton: {
    alignSelf: 'flex-end',
    paddingRight: 22,
    marginBottom: 16,
  },
  sizeChartText: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: '#000',
    fontSize: 14,
  },

  // Add to Bag Button
  addToBagButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    marginHorizontal: 22,
  },
  addToBagButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  // Bag Modal Styles
  bagModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bagModalContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bagModalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  checkIconContainer: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addedToBagText: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  bagModalButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 22,
  },
  viewBagButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  viewBagButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Favourites;
