import Image from 'next/image';
import { Award, Users, Heart, Gem, Clock, Shield } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Gem,
      title: 'Quality Craftsmanship',
      description: 'Every piece is meticulously handcrafted by skilled artisans using the finest materials and traditional techniques passed down through generations.'
    },
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'Our love for jewelry design drives us to create pieces that not only look beautiful but also carry emotional significance for our customers.'
    },
    {
      icon: Shield,
      title: 'Trust & Authenticity',
      description: 'We guarantee the authenticity of every gemstone and precious metal, backed by certificates and our lifetime warranty promise.'
    },
    {
      icon: Users,
      title: 'Customer Dedication',
      description: 'Your satisfaction is our priority. We work closely with each customer to ensure they find or create the perfect piece for their special moments.'
    }
  ];

  const milestones = [
    { year: '1995', event: 'Founded Jwelary with a vision to create timeless jewelry pieces' },
    { year: '2000', event: 'Opened our first flagship store and expanded our artisan team' },
    { year: '2010', event: 'Launched online presence and began serving customers worldwide' },
    { year: '2015', event: 'Introduced sustainable sourcing practices and ethical partnerships' },
    { year: '2020', event: 'Expanded to custom design services and virtual consultations' },
    { year: '2025', event: 'Celebrating 30 years of creating memories through exceptional jewelry' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:h-96 bg-gradient-to-r from-yellow-50 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-12 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
              Our Story of
              <span className="text-yellow-600"> Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              For over three decades, Jwelary has been crafting exceptional jewelry pieces 
              that celebrate life's most precious moments. Our commitment to quality, 
              authenticity, and customer satisfaction has made us a trusted name in luxury jewelry.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                Our Mission
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                At Jwelary, we believe that jewelry is more than just an accessory—it's a 
                symbol of love, achievement, and life's most treasured moments. Our mission 
                is to create exceptional pieces that not only showcase exquisite craftsmanship 
                but also tell your unique story.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We are committed to using ethically sourced materials, supporting skilled 
                artisans, and providing personalized service that ensures every customer 
                finds their perfect piece of jewelry.
              </p>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=400&fit=crop"
                  alt="Jewelry craftsman at work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from design to customer service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-3 md:space-y-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                  <value.icon className="text-yellow-600" size={32} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">{value.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold">30+</div>
              <div className="text-yellow-100 text-sm md:text-base">Years of Excellence</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold">50K+</div>
              <div className="text-yellow-100 text-sm md:text-base">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold">1000+</div>
              <div className="text-yellow-100 text-sm md:text-base">Unique Designs</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold">25+</div>
              <div className="text-yellow-100 text-sm md:text-base">Master Craftsmen</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Three decades of innovation, growth, and commitment to excellence
            </p>
          </div>

          <div className="relative">
            {/* Timeline line - hidden on mobile, shown on tablet+ */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-200"></div>
            
            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center md:${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-l-4 md:border-l-0 border-yellow-600">
                      <div className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">{milestone.year}</div>
                      <div className="text-sm md:text-base text-gray-700">{milestone.event}</div>
                    </div>
                  </div>
                  
                  {/* Timeline dot - hidden on mobile */}
                  <div className="hidden md:block relative z-10 w-4 h-4 bg-yellow-600 rounded-full border-4 border-white shadow-md"></div>
                  
                  <div className="hidden md:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind every exceptional piece
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="John Smith - Master Craftsman"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">John Smith</h3>
              <p className="text-yellow-600 mb-2 text-sm md:text-base">Master Craftsman & Founder</p>
              <p className="text-gray-600 text-xs md:text-sm">
                With over 30 years of experience, John leads our design team and ensures 
                every piece meets our exacting standards.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
                  alt="Sarah Johnson - Design Director"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Sarah Johnson</h3>
              <p className="text-yellow-600 mb-2 text-sm md:text-base">Creative Design Director</p>
              <p className="text-gray-600 text-xs md:text-sm">
                Sarah brings contemporary flair to traditional designs, creating pieces 
                that resonate with modern jewelry lovers.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                  alt="Michael Chen - Quality Assurance"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Michael Chen</h3>
              <p className="text-yellow-600 mb-2 text-sm md:text-base">Quality Assurance Director</p>
              <p className="text-gray-600 text-xs md:text-sm">
                Michael ensures every gemstone is authentic and every setting is perfect, 
                maintaining our reputation for excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Let us help you discover jewelry that tells your unique story. 
            Browse our collection or schedule a consultation with our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition-colors"
            >
              Shop Collection
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 border-2 border-yellow-600 text-yellow-600 font-semibold rounded-md hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
