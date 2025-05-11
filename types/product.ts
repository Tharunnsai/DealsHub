export interface Product {
  id: string; // Adding an ID, useful for keys in React
  title: string;
  description: string;
  originalPrice: string; // Keeping as string for now, can be parsed to number if needed
  salePrice: string;
  discount?: string; // Optional as it can be calculated
  imageUrl: string;
  merchant: string;
  category: string;
  productLink: string;
  dateAdded?: string; // Optional
  availability?: string; // Optional
  rating?: string; // Optional
  reviews?: string; // Optional
} 