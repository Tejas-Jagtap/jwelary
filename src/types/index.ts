export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  specifications: {
    material: string;
    weight: string;
    size: string;
    gemstone?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}
