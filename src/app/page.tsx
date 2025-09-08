import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Star, Shield, Truck, HeadphonesIcon } from "lucide-react";

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/products?featured=true`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const products = await res.json();
    return products.slice(0, 4);
  } catch {
    return [];
  }
}

async function getCategories() {
  return [
    {
      id: 'rings',
      name: 'Rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
      description: 'Engagement rings, wedding bands, and fashion rings'
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=300&fit=crop',
      description: 'Elegant necklaces and pendants for every occasion'
    },
    {
      id: 'earrings',
      name: 'Earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
      description: 'Stunning earrings from studs to statement pieces'
    },
    {
      id: 'bracelets',
      name: 'Bracelets',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop',
      description: 'Beautiful bracelets and bangles'
    }
  ];
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-yellow-50 to-yellow-100 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Exquisite
                <span className="text-yellow-600"> Jewelry</span>
                <br />
                Collection
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover our carefully curated selection of premium jewelry pieces. 
                From engagement rings to statement necklaces, find the perfect piece 
                for every special moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Shop Now
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-yellow-600 text-yellow-600 font-semibold rounded-md hover:bg-yellow-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop"
                  alt="Luxury Jewelry Collection"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Lifetime Warranty</h3>
              <p className="text-gray-600">All our jewelry comes with a lifetime warranty for your peace of mind.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Free Shipping</h3>
              <p className="text-gray-600">Complimentary shipping on all orders above $500.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Premium Quality</h3>
              <p className="text-gray-600">Handcrafted with the finest materials and precious stones.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <HeadphonesIcon className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">24/7 Support</h3>
              <p className="text-gray-600">Our jewelry experts are available round the clock for assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse collection of jewelry organized by category
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-gray-200 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and trending jewelry pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, 
            exclusive offers, and jewelry care tips.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
