export type Product = {
  _id: string;
  name: string;              
  brand: string;
  model: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  imageUrl: string;
  slug: string;               
  categorySlug: string;      
};

export async function fetchProducts(categorySlug?: string): Promise<Product[]> {
  const endpoint = categorySlug
    ? `/api/products?category=${encodeURIComponent(categorySlug)}`
    : `/api/products`;

  const res = await fetch(`http://localhost:5000${endpoint}`, {
    credentials: 'include',                     
    headers: { 'Accept': 'application/json' }  
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch products: ${res.status} ${errorText}`);
  }

  return res.json();
}
