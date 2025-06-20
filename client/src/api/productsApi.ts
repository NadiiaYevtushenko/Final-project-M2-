export type Product = {
  _id: string;
  name: string;                // ✅ назва товару (було title)
  brand: string;
  model: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  imageUrl: string;
  slug: string;                // ✅ SEO-slug товару
  categorySlug: string;        // ✅ SEO-slug категорії
};

export async function fetchProducts(categorySlug?: string): Promise<Product[]> {
  const endpoint = categorySlug
    ? `/api/products?category=${encodeURIComponent(categorySlug)}`
    : `/api/products`;

  const res = await fetch(`http://localhost:5000${endpoint}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
