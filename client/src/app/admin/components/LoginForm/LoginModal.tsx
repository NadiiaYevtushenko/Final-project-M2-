import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import style from './loginForm.module.css';
import FormField from '../RegisterForm/FormField';
import { useAuth } from '../../../AuthContext';

const validationSchema = Yup.object({
  email: Yup.string().email("Невалідна пошта").required("Email обов’язковий"),
  password: Yup.string().required("Пароль обов’язковий"),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Помилка авторизації');
      }

      login(data.token, data.user.isAdmin);
      resetForm();
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <button onClick={onClose} className={style.closeBtn} aria-label="Закрити">×</button>
        <h2 className={style.sectionTitle}>Вхід</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormField
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                confirmationMessage="Email введено"
                touched={touched.email}
                error={errors.email}
              />
              <FormField
                name="password"
                id="password"
                type="password"
                placeholder="Пароль"
                confirmationMessage="Пароль виглядає коректно"
                touched={touched.password}
                error={errors.password}
              />

              {error && <div className={style.error}>{error}</div>}

              <button type="submit" className={style.submitBtn}>
                Увійти
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginModal;
