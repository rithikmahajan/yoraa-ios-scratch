// Search helper functions
export const searchProducts = (products, query) => {
  if (!query.trim()) {
    return products;
  }
  
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.subtitle.toLowerCase().includes(searchTerm) ||
    product.category?.toLowerCase().includes(searchTerm)
  );
};

export const getSearchSuggestions = (products, query) => {
  if (!query.trim()) {
    return [];
  }
  
  const searchTerm = query.toLowerCase();
  const suggestions = new Set();
  
  products.forEach(product => {
    // Add product name parts as suggestions
    const nameWords = product.name.toLowerCase().split(' ');
    nameWords.forEach(word => {
      if (word.includes(searchTerm) && word.length > 2) {
        suggestions.add(word);
      }
    });
    
    // Add subtitle parts as suggestions
    const subtitleWords = product.subtitle.toLowerCase().split(' ');
    subtitleWords.forEach(word => {
      if (word.includes(searchTerm) && word.length > 2) {
        suggestions.add(word);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, 10);
};
