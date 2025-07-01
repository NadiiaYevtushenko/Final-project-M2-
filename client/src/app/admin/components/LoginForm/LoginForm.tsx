import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import style from './loginForm.module.css';
import FormField from '../RegisterForm/FormField';
import SuccessModal from '../RegisterForm/SuccessModal';

const validationSchema = Yup.object({
  email: Yup.string().required('Email обовʼязковий').email('Невірний формат email'),
  password: Yup.string().required('Пароль обовʼязковий'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      const res = await fetch('http://localhost:5000/users/api/login', {
        method: 'POST',
        credentials: 'include', // 🔒 необхідно для надсилання cookie
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const raw = await res.text();
        throw new Error('Невірна відповідь від сервера: ' + raw.slice(0, 100));
      }

      const data = await res.json();
      console.log('Login response:', data);

      if (!res.ok) {
        throw new Error(data.message || 'Помилка входу');
      }

      // ✅ Збереження користувача (опціонально)
      localStorage.setItem('user', JSON.stringify(data.user));

      setSubmitted(true);
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (submitted) {
    return <SuccessModal onClose={onClose} />;
  }

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <button onClick={onClose} className={style.closeBtn} aria-label="Закрити">
          ×
        </button>
        <h2 className={style.sectionTitle}>Вхід</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {({ errors, touched, isValid }) => (
            <Form autoComplete="off">
              <FormField
                name="email"
                id="email"
                type="email"
                placeholder="Email *"
                confirmationMessage="Email виглядає коректно"
                touched={touched.email}
                error={errors.email}
              />
              <FormField
                name="password"
                id="password"
                type="password"
                placeholder="Пароль *"
                confirmationMessage="Пароль введено"
                touched={touched.password}
                error={errors.password}
              />

              {error && <div className={style.error}>{error}</div>}

              <button type="submit" className={style.submitBtn} disabled={!isValid}>
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
