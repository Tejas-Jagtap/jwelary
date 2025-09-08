import { Request, Response } from 'express';
import { prisma } from '@/lib/prisma';
import { AuthRequest } from '@/middleware/auth';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, featured } = req.query;

    const where: any = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    const productsWithImages = products.map(product => ({
      ...product,
      images: JSON.parse(product.images),
      specifications: {
        material: product.material,
        weight: product.weight,
        size: product.size,
        gemstone: product.gemstone
      }
    }));

    res.json(productsWithImages);
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      ...product,
      images: JSON.parse(product.images),
      specifications: {
        material: product.material,
        weight: product.weight,
        size: product.size,
        gemstone: product.gemstone
      }
    });
  } catch (error) {
    console.error('Fetch product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const {
      name,
      price,
      originalPrice,
      description,
      category,
      images,
      inStock,
      featured,
      stockQuantity,
      material,
      weight,
      size,
      gemstone
    } = req.body;

    if (!name || !price || !description || !category || !images) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        description,
        category,
        images: JSON.stringify(images),
        inStock: inStock ?? true,
        featured: featured ?? false,
        stockQuantity: parseInt(stockQuantity) || 0,
        material: material || '',
        weight: weight || '',
        size: size || '',
        gemstone: gemstone || null
      }
    });

    res.status(201).json({
      message: 'Product created successfully',
      product: {
        ...product,
        images: JSON.parse(product.images)
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      originalPrice,
      description,
      category,
      images,
      inStock,
      featured,
      stockQuantity,
      material,
      weight,
      size,
      gemstone
    } = req.body;

    const updateData: any = {};
    
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (originalPrice !== undefined) updateData.originalPrice = originalPrice ? parseFloat(originalPrice) : null;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (images !== undefined) updateData.images = JSON.stringify(images);
    if (inStock !== undefined) updateData.inStock = inStock;
    if (featured !== undefined) updateData.featured = featured;
    if (stockQuantity !== undefined) updateData.stockQuantity = parseInt(stockQuantity);
    if (material !== undefined) updateData.material = material;
    if (weight !== undefined) updateData.weight = weight;
    if (size !== undefined) updateData.size = size;
    if (gemstone !== undefined) updateData.gemstone = gemstone;

    const product = await prisma.product.update({
      where: { id },
      data: updateData
    });

    res.json({
      message: 'Product updated successfully',
      product: {
        ...product,
        images: JSON.parse(product.images)
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id }
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
