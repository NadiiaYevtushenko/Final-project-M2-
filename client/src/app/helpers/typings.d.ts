// === Тип для форми товару ===
export interface FormData {
  id?: string;
  productName: string;
  shortDescription: string;
  productDescription: string;
  category: string;
  subCategory: string;
  productType: string;
  price: number | null;
  availability: string;
  sku: string;
  productImage?: FileList | null;
  productImageUrl?: string | null;
  galleryImages?: Array<{ image: FileList | null }>;
  galleryImageUrls?: Array<{ image: string | null }>;
  variations: Array<{ [key: string]: any }>;
}

// === Типи для кошика ===
export interface CartItem {
  id: string;
  productName: string;
  article: string;
  quantity: number;
  price: number;
  total: number;
  productImageUrl?: string | null;
  variation?: Record<string, any>; // краще ніж `{}`
}

export interface CartState {
  items: CartItem[];
}

// === Типи для продуктів ===
export interface Product {
  id: string;
  category: string;
  subCategory?: string;
  [key: string]: any;
}

export interface ProductState {
  items: FormData[];
  loadedCategories: string[];
  loadedSubCategories: string[];
  currentCategory: string | null;
  currentSubCategory: string | null;
  selectedProduct: FormData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
