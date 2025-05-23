export interface FurnitureProduct {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  galleryImages?: string[];
  modelUrl: string | null; // Path to 3D model
  category: string;
  rating: number;
  reviewCount: number;
  features?: string[];
  dimensions?: {
    width: number;
    depth: number;
    height: number;
  };
  weight?: number;
  material?: string;
  colors?: string[];
  assemblyRequired?: boolean;
  warranty?: string;
  countryOfOrigin?: string;
  isFeatured?: boolean;
}