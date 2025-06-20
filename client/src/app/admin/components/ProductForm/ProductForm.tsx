import { useFormik } from 'formik';
import * as Yup from 'yup';

type ProductFormValues = {
  title: string;
  brand: string;
  model: string;
  price: number;
  imageUrl: string;
};

const initialValues: ProductFormValues = {
  title: '',
  brand: '',
  model: '',
  price: 0,
  imageUrl: '',
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  brand: Yup.string().required('Brand is required'),
  model: Yup.string().required('Model is required'),
  price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
  imageUrl: Yup.string().url('Invalid image URL').required('Image URL is required'),
});

const ProductForm = () => {
  const formik = useFormik<ProductFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('http://localhost:5000/products/api', {
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
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title && formik.touched.title && (
          <div className="error">{formik.errors.title}</div>
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
