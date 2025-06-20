const BASE_URL = 'http://localhost:5000';

export const resolveCategoryInfo = (
  categoryName: string,
  imageUrlFromDb?: string // <- це з MongoDB
) => {
  const fallback = `${BASE_URL}/uploads/placeholder.jpg`;

  return {
    title: categoryName,
    slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
    img: imageUrlFromDb ? `${BASE_URL}${imageUrlFromDb}` : fallback,
  };
};