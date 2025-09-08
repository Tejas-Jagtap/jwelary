import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jwelary.com' },
    update: {},
    create: {
      email: 'admin@jwelary.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  console.log('Created admin user:', admin.email);

  // Create categories
  const categories = [
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

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  console.log('Created categories');

  // Create products
  const products = [
    {
      id: '1',
      name: 'Diamond Solitaire Ring',
      price: 2500,
      originalPrice: 3000,
      description: 'Elegant diamond solitaire ring featuring a brilliant cut diamond set in 18k white gold. Perfect for engagements and special occasions.',
      category: 'rings',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop'
      ]),
      inStock: true,
      featured: true,
      stockQuantity: 15,
      material: '18k White Gold',
      weight: '3.2g',
      size: 'Adjustable',
      gemstone: '1 Carat Diamond'
    },
    {
      id: '2',
      name: 'Pearl Drop Earrings',
      price: 450,
      description: 'Classic pearl drop earrings with sterling silver hooks. Timeless elegance for any occasion.',
      category: 'earrings',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1588444650700-6c6ea3d2d136?w=500&h=500&fit=crop'
      ]),
      inStock: true,
      featured: true,
      stockQuantity: 25,
      material: 'Sterling Silver',
      weight: '2.1g',
      size: '2.5cm length',
      gemstone: 'Freshwater Pearls'
    },
    {
      id: '3',
      name: 'Gold Chain Necklace',
      price: 1200,
      description: 'Luxurious 22k gold chain necklace with intricate detailing. A statement piece for special occasions.',
      category: 'necklaces',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop'
      ]),
      inStock: true,
      featured: false,
      stockQuantity: 8,
      material: '22k Gold',
      weight: '15.5g',
      size: '18 inches',
      gemstone: null
    },
    {
      id: '4',
      name: 'Sapphire Tennis Bracelet',
      price: 1800,
      originalPrice: 2200,
      description: 'Stunning sapphire tennis bracelet with alternating blue sapphires and diamonds in white gold setting.',
      category: 'bracelets',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop'
      ]),
      inStock: true,
      featured: true,
      stockQuantity: 3,
      material: '18k White Gold',
      weight: '8.3g',
      size: '7 inches',
      gemstone: 'Blue Sapphires & Diamonds'
    },
    {
      id: '5',
      name: 'Rose Gold Wedding Band',
      price: 800,
      description: 'Classic rose gold wedding band with subtle texture and comfortable fit.',
      category: 'rings',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop'
      ]),
      inStock: true,
      featured: false,
      stockQuantity: 20,
      material: '18k Rose Gold',
      weight: '4.1g',
      size: 'Adjustable',
      gemstone: null
    },
    {
      id: '6',
      name: 'Emerald Pendant Necklace',
      price: 950,
      description: 'Beautiful emerald pendant necklace with delicate gold chain. Perfect for adding a pop of color.',
      category: 'necklaces',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop'
      ]),
      inStock: false,
      featured: true,
      stockQuantity: 0,
      material: '14k Gold',
      weight: '5.2g',
      size: '16 inches',
      gemstone: 'Natural Emerald'
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }

  console.log('Created products');
  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
