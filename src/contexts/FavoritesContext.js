import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Air Jordan 1 Mid',
      price: 'US$125',
      image: 'https://via.placeholder.com/184x184/EEE/000000?text=Shoe+1',
      category: 'Shoes'
    },
    {
      id: 2,
      name: 'Air Jordan 1 Mid',
      price: 'US$125',
      image: 'https://via.placeholder.com/184x184/EEE/000000?text=Shoe+2',
      category: 'Shoes'
    },
    {
      id: 3,
      name: 'Air Jordan 1 Mid',
      price: 'US$125',
      image: 'https://via.placeholder.com/184x184/EEE/000000?text=Shoe+3',
      category: 'Shoes'
    },
    {
      id: 4,
      name: 'Air Jordan 1 Mid',
      price: 'US$125',
      image: 'https://via.placeholder.com/184x184/EEE/000000?text=Shoe+4',
      category: 'Shoes'
    },
  ]);

  const addToFavorites = (product) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (!exists) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const isInFavorites = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const toggleFavorite = (product) => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    toggleFavorite,
    clearAllFavorites,
    setFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
