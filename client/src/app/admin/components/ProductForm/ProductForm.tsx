import { useFormik } from 'formik';
import * as Yup from 'yup';

type ProductFormValues = {
  name: string; // ✅ раніше було title
  brand: string;
  model: string;
  price: number;
  imageUrl: string;
  category: string;
  currency: string;
};

const initialValues: ProductFormValues = {
  name: '',
  brand: '',
  model: '',
  price: 0,
  imageUrl: '',
  category: '',
  currency: 'UAH',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  brand: Yup.string().required('Brand is required'),
  model: Yup.string().required('Model is required'),
  price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
  imageUrl: Yup.string().url('Invalid image URL').required('Image URL is required'),
  category: Yup.string().required('Category is required'),
  currency: Yup.string().required('Currency is required'),
});

const ProductForm = () => {
  const formik = useFormik<ProductFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error('Failed to create product');

        alert('Product created successfully!');
        resetForm();
      } catch (error) {
        console.error(error);
        alert('Error creating product.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="product-form">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <div className="error">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          name="brand"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.brand}
        />
        {formik.errors.brand && formik.touched.brand && (
          <div className="error">{formik.errors.brand}</div>
        )}
      </div>

      <div>
        <label htmlFor="model">Model</label>
        <input
          id="model"
          name="model"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.model}
        />
        {formik.errors.model && formik.touched.model && (
          <div className="error">{formik.errors.model}</div>
        )}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        {formik.errors.price && formik.touched.price && (
          <div className="error">{formik.errors.price}</div>
        )}
      </div>

      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.imageUrl}
        />
        {formik.errors.imageUrl && formik.touched.imageUrl && (
          <div className="error">{formik.errors.imageUrl}</div>
        )}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.category}
        />
        {formik.errors.category && formik.touched.category && (
          <div className="error">{formik.errors.category}</div>
        )}
      </div>

      <div>
        <label htmlFor="currency">Currency</label>
        <select
          id="currency"
          name="currency"
          onChange={formik.handleChange}
          value={formik.values.currency}
        >
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="PLN">PLN</option>
        </select>
        {formik.errors.currency && formik.touched.currency && (
          <div className="error">{formik.errors.currency}</div>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
