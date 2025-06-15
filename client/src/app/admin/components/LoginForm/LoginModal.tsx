import { useState } from 'react';
import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import style from './loginForm.module.css';
import FormField from '../RegisterForm/FormField';
import { useAuth } from '../../../AuthContext';
import ForgotPasswordModal from '../PasswordRecovery/ForgotPasswordModal';


const validationSchema = Yup.object({
  email: Yup.string().email('Невалідна пошта').required('Email обов’язковий'),
  password: Yup.string().required('Пароль обов’язковий'),
});

const initialValues = {
  email: '',
  password: '',
};

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const LoginModal = ({ onClose, onSuccess }: Props) => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (values: typeof initialValues, { resetForm }: FormikHelpers<typeof initialValues>) => {
    try {
      const res = await fetch('http://localhost:5000/users/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const raw = await res.text();
        throw new Error('Невірна відповідь від сервера: ' + raw.slice(0, 100));
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Помилка авторизації');
      }

      login(data.user);  
      resetForm();
      onClose();
      onSuccess();  
    } catch (err: any) {
      setError(err.message);
    }
  };

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

              <p className={style.forgotPassword}>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className={style.forgotBtn}
                >
                  Забули пароль?
                </button>
              </p>

              <button type="submit" className={style.submitBtn}>
                Увійти
              </button>
            </Form>
          )}
        </Formik>

        {showForgotModal && (
          <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
