/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Dimensions, SafeAreaView, Text} from 'react-native';

// Placeholder image URL for products
const placeholderImage = 'https://via.placeholder.com/184x184/CCCCCC/FFFFFF?text=Product';

const screenWidth = Dimensions.get('window').width;

// Empty List Component
const EmptyList = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 60, color: '#CCCCCC'}}>♡</Text>
        <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 400}}>
          Your Favourites is empty.{'\n'}
          When you add products, they'll{'\n'}
          appear here.
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          width: screenWidth,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}>
        <View style={style.buttonContainer}>
          <Text style={{fontSize: 16, color: '#fff'}}>Add Favourites Now</Text>
        </View>
      </View>
    </View>
  );
};

// Product Component
const Product = ({
  name,
  price,
  image,
  addMargin,
  isDeleteMode,
  toggleProduct,
}) => {
  return (
    <TouchableOpacity
      onPress={toggleProduct}
      style={{
        width: '49%',
        marginRight: addMargin ? '2%' : 0,
        marginBottom: 21,
      }}>
      <View style={{position: 'relative'}}>
        <Image
          source={typeof image === 'string' ? {uri: image} : image}
          style={{resizeMode: 'cover', height: 184, width: '100%'}}
        />
        {isDeleteMode && (
          <TouchableOpacity style={{position: 'absolute', right: 10, top: -5}}>
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: '#CA3327',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>×</Text>
            </View>
          </TouchableOpacity>
        )}
        <Image />
      </View>

      <View style={{paddingLeft: 14, paddingTop: 14}}>
        <Text style={{color: '#000', fontSize: 14, fontWeight: 500}}>
          {name}
        </Text>
        <Text style={{color: '#000', fontSize: 14, fontWeight: 500}}>
          US${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Product PopOver Component
const ProductPopOver = ({visible, onClose, toggleShowBag}) => {
  const activeNumber = 4;
  const numberData = ['Remove', 1, 2, 3, 4, 5, 6, 7, 8];

  const size = [
    'L (W 6-10 / M 6-8)',
    'L (W 10-13 / M 8-12)',
    'XL (M 12-15 / M 6-8)',
  ];

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={style.overlay}>
        <View style={style.container2}>
          <View style={{padding: 24, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E4E4E4', marginBottom: 24}}>
            <Image source={{uri: placeholderImage}} style={style.image} />
            <View style={{justifyContent: 'space-between', paddingBottom: 8, flex: 1}}>
              <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>Air Jordan 1 Mid</Text>
              <Text style={{color: '#767676', fontSize: 14, marginTop: 4}}>Shoes</Text>
              <Text style={{color: '#000', fontWeight: '500', fontSize: 14}}>US$125</Text>
            </View>
          </View>

          <View style={{marginBottom: 20}}>
            <FlatList
              data={numberData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F6F6F6',
                    borderWidth: 1,
                    borderColor: activeNumber === item ? '#000' : '#E4E4E4',
                    marginLeft: 10,
                    paddingVertical: 16,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                  }}>
                  <Text style={{color: activeNumber === item ? '#000' : '#BABABA', fontSize: 16}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={{marginBottom: 18}}>
            <Text style={{paddingVertical: 12, fontSize: 20, color: '#000', textAlign: 'center'}}>Size</Text>
            <FlatList
              data={size}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 16,
                    borderWidth: 1,
                    borderColor: index === 1 ? '#000' : '#E4E4E4',
                    borderRadius: 4,
                    marginLeft: 10,
                  }}>
                  <Text style={{fontSize: 16, color: index === 2 ? '#BABABA' : '#000'}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <Text style={style.sizeChart}>Size Chart</Text>

          <TouchableOpacity style={style.button} onPress={toggleShowBag}>
            <Text style={style.buttonText}>Add to Bag</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Bag PopOver Component
const BagPopOver = ({visible, onClose}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={style.overlay}>
        <View style={style.container2}>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <View style={{
              width: 81,
              height: 81,
              borderRadius: 40.5,
              backgroundColor: '#4CAF50',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{color: 'white', fontSize: 48, fontWeight: 'bold'}}>✓</Text>
            </View>
            <Text
              style={{
                fontSize: 24,
                color: '#000',
                textAlign: 'center',
                marginTop: 20,
              }}>
              Added to Bag
            </Text>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 20,
              width: '100%',
              paddingHorizontal: 22,
            }}>
            <TouchableOpacity style={style.button} onPress={onClose}>
              <Text style={style.buttonText}>View Bag</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Favourites = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddToBad, setShowAddToBag] = useState(false);
  const toggleDeleteMode = () => setIsDeleteMode(!isDeleteMode);
  const toggleProduct = () => setShowProductModal(!showProductModal);

  const toggleShowBag = () => {
    setShowAddToBag(!showAddToBad);
    setShowProductModal(false);
  };
  
  return (
    <SafeAreaView style={style.safeAreaViewContainer}>
      <View style={{paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}}>
        <View style={{width: 60}} />
        <Text style={{fontSize: 28, paddingVertical: 16, color: '#000000', fontWeight: 'bold'}}>
          Favourites
        </Text>
        <TouchableOpacity onPress={toggleDeleteMode}>
          <Text style={{fontSize: 16, color: '#000'}}>
            {isDeleteMode ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ProductPopOver
        toggleShowBag={toggleShowBag}
        visible={showProductModal}
        onClose={toggleProduct}
      />
      <BagPopOver visible={showAddToBad} onClose={toggleShowBag} />

      <FlatList
        style={{flex: 1}}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={{flexGrow: 1}}
        data={[
          {
            name: 'Air Jordan 1 Mid',
            price: '125',
            id: 1,
            image: placeholderImage,
          },
          {
            name: 'Air Jordan 2 Mid',
            price: '130',
            id: 2,
            image: placeholderImage,
          },
          {
            name: 'Air Jordan 3 Mid',
            price: '140',
            id: 3,
            image: placeholderImage,
          },
          {
            name: 'Air Jordan 4 Mid',
            price: '160',
            id: 4,
            image: placeholderImage,
          },
        ]}
        renderItem={({item, index}) => (
          <Product
            {...item}
            isDeleteMode={isDeleteMode}
            addMargin={index % 2 === 0}
            toggleProduct={toggleProduct}
          />
        )}
        ListEmptyComponent={<EmptyList />}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    borderWidth: 1,
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 100,
  },
  sizeChart: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginBottom: 16,
    marginRight: 22,
    color: '#000',
    fontSize: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container2: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  image: {
    height: 154,
    width: 154,
    resizeMode: 'cover',
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#43484B',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    marginHorizontal: 22,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Favourites;
