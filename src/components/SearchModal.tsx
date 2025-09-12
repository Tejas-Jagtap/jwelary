'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useSearch, useSearchHistory } from '@/hooks/useSearch';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const { query, setQuery, results, loading, clearSearch } = useSearch();
  const { recentSearches, addToHistory, clearHistory } = useSearchHistory();
  const [popularSearches] = useState([
    'Diamond Rings',
    'Gold Necklaces',
    'Silver Earrings',
    'Wedding Bands',
    'Bracelets'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle modal close with search clear
  const handleClose = () => {
    clearSearch();
    onClose();
  };

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search submission
  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      addToHistory(searchQuery);
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      handleClose();
    }
  };

  // Handle product click
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    handleClose();
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Transparent backdrop - only for click area */}
      <div className="absolute inset-0" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mt-0 sm:mt-4 md:mt-16 bg-white bg-opacity-95 backdrop-blur-sm rounded-none sm:rounded-lg shadow-2xl border overflow-hidden mx-0 sm:mx-4 h-screen sm:h-auto max-h-screen sm:max-h-[85vh] z-10">
        {/* Search Input */}
        <div className="flex items-center p-4 border-b bg-white">
          <Search className="text-gray-400 mr-3 flex-shrink-0" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search jewelry..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 text-lg text-gray-900 placeholder-gray-500 outline-none"
          />
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-80px)] sm:max-h-96">
          {query.trim().length >= 2 ? (
            <div className="p-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                </div>
              ) : results.length > 0 ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Products</h3>
                  <div className="space-y-2">
                    {results.slice(0, 6).map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <div className="relative w-12 h-12 mr-3 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {product.images && product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <Search size={16} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                        </div>
                        <div className="text-sm font-semibold text-yellow-600 flex-shrink-0">
                          ${product.price}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleSearch(query)}
                    className="w-full mt-3 p-3 text-center text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors text-sm"
                  >
                    View all results for "{query}"
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search size={48} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No products found for "{query}"</p>
                  <button
                    onClick={() => handleSearch(query)}
                    className="mt-2 text-yellow-600 hover:text-yellow-700 transition-colors text-sm"
                  >
                    Search anyway
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center">
                      <Clock size={16} className="mr-2" />
                      Recent
                    </h3>
                    <button
                      onClick={clearHistory}
                      className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.slice(0, 5).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-md transition-colors text-gray-700 text-sm"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <TrendingUp size={16} className="mr-2" />
                  Popular
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="p-3 text-left hover:bg-gray-50 rounded-md transition-colors text-gray-700 text-sm"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;