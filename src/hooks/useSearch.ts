'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';
import { Product } from '@/types';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search products with debouncing
  useEffect(() => {
    const searchProducts = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const products = await apiClient.getProducts() as Product[];
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          (product.specifications?.material?.toLowerCase().includes(query.toLowerCase())) ||
          (product.specifications?.gemstone?.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(filtered);
      } catch (err) {
        setError('Failed to search products');
        setResults([]);
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
  };

  // Search suggestions based on products
  const getSuggestions = async (searchTerm: string): Promise<string[]> => {
    try {
      const products = await apiClient.getProducts() as Product[];
      const suggestions = new Set<string>();

      products.forEach(product => {
        // Add product names that match
        if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          suggestions.add(product.name);
        }
        // Add categories that match
        if (product.category.toLowerCase().includes(searchTerm.toLowerCase())) {
          suggestions.add(product.category);
        }
        // Add materials that match
        if (product.specifications?.material?.toLowerCase().includes(searchTerm.toLowerCase())) {
          suggestions.add(product.specifications.material);
        }
      });

      return Array.from(suggestions).slice(0, 5);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      return [];
    }
  };

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch,
    getSuggestions
  };
};

// Hook for managing search history
export const useSearchHistory = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jwelary_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  // Add search to history
  const addToHistory = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    const updatedHistory = [
      searchTerm,
      ...recentSearches.filter(term => term !== searchTerm)
    ].slice(0, 10); // Keep only last 10 searches

    setRecentSearches(updatedHistory);
    localStorage.setItem('jwelary_recent_searches', JSON.stringify(updatedHistory));
  };

  // Remove specific search from history
  const removeFromHistory = (searchTerm: string) => {
    const updatedHistory = recentSearches.filter(term => term !== searchTerm);
    setRecentSearches(updatedHistory);
    localStorage.setItem('jwelary_recent_searches', JSON.stringify(updatedHistory));
  };

  // Clear all search history
  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('jwelary_recent_searches');
  };

  return {
    recentSearches,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
};