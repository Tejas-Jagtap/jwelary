'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Shield, 
  Truck, 
  RotateCcw, 
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const product = products.find(p => p.id === productId);
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== productId)
    .slice(0, 4);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link 
            href="/products" 
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-yellow-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/products" className="hover:text-yellow-600">Products</Link></li>
            <li>/</li>
            <li className="text-gray-800">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                      index === selectedImageIndex ? 'ring-2 ring-yellow-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-800">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Material</dt>
                  <dd className="text-sm text-gray-800">{product.specifications.material}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Weight</dt>
                  <dd className="text-sm text-gray-800">{product.specifications.weight}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Size</dt>
                  <dd className="text-sm text-gray-800">{product.specifications.size}</dd>
                </div>
                {product.specifications.gemstone && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Gemstone</dt>
                    <dd className="text-sm text-gray-800">{product.specifications.gemstone}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Add to Cart */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  {product.inStock ? (
                    <>
                      <Check size={16} className="text-green-500 mr-1" />
                      In Stock
                    </>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-md font-semibold transition-colors ${
                    product.inStock
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                
                <button className="px-6 py-3 border-2 border-yellow-600 text-yellow-600 rounded-md font-semibold hover:bg-yellow-50 transition-colors flex items-center justify-center">
                  <Heart size={20} className="mr-2" />
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield size={16} className="text-yellow-600" />
                  <span>Lifetime Warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck size={16} className="text-yellow-600" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <RotateCcw size={16} className="text-yellow-600" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
