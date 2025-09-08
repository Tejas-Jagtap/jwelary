'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X, Plus, Loader } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  stockQuantity: number;
  specifications: {
    material?: string;
    weight?: string;
    size?: string;
    gemstone?: string;
  };
}

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    category: '',
    inStock: true,
    featured: false,
    stockQuantity: '',
    material: '',
    weight: '',
    size: '',
    gemstone: ''
  });
  const [images, setImages] = useState<string[]>(['']);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const productData = await apiClient.getProduct(productId) as Product;
      setProduct(productData);
      
      // Populate form with existing data
      setFormData({
        name: productData.name,
        price: productData.price.toString(),
        originalPrice: productData.originalPrice?.toString() || '',
        description: productData.description,
        category: productData.category,
        inStock: productData.inStock,
        featured: productData.featured,
        stockQuantity: productData.stockQuantity.toString(),
        material: productData.specifications?.material || '',
        weight: productData.specifications?.weight || '',
        size: productData.specifications?.size || '',
        gemstone: productData.specifications?.gemstone || ''
      });
      
      setImages(productData.images.length > 0 ? productData.images : ['']);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product');
      router.push('/admin/products');
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index: number) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const filteredImages = images.filter(img => img.trim() !== '');
      
      await apiClient.updateProduct(productId, {
        ...formData,
        images: filteredImages,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stockQuantity: parseInt(formData.stockQuantity)
      });

      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="animate-spin" size={24} />
          <span>Loading product...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link href="/admin/products" className="text-blue-600 hover:text-blue-800">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/products"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Products
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelets">Bracelets</option>
                  <option value="watches">Watches</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Specifications</h3>
              
              <div>
                <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  placeholder="e.g., 14K Gold, Sterling Silver"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="e.g., 2.5g"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="e.g., 7, Medium"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gemstone" className="block text-sm font-medium text-gray-700 mb-1">
                  Gemstone
                </label>
                <input
                  type="text"
                  id="gemstone"
                  name="gemstone"
                  value={formData.gemstone}
                  onChange={handleInputChange}
                  placeholder="e.g., Diamond, Ruby, Sapphire"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                    In Stock
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                    Featured Product
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Product Images</h3>
            <div className="space-y-3">
              {images.map((image, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Enter image URL"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Plus size={20} className="mr-1" />
                Add Another Image
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href="/admin/products"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save size={20} className="mr-2" />
              {isLoading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
