import { useParams } from 'react-router';

const ProductsPage = () => {
  const { category } = useParams();

  return (
    <div>
      <h1>Товари для категорії: {category}</h1>
      {/* Тут буде список товарів */}
    </div>
  );
};

export default ProductsPage;
