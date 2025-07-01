import { useState } from 'react';
import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import style from './RegisterModal.module.css';
import FormField from '../RegisterForm/FormField';
import SuccessModal from './SuccessModal';
import { useAuth } from '../../../../app/AuthContext';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Імʼя обовʼязкове').min(2).max(30),
  lastName: Yup.string().required('Прізвище обовʼязкове').min(2).max(30),
  email: Yup.string().required('Email обовʼязковий').email('Невірний формат email'),
  password: Yup.string().required('Пароль обовʼязковий').min(5),
  confirmPassword: Yup.string()
    .required('Підтвердження обовʼязкове')
    .oneOf([Yup.ref('password')], 'Паролі не збігаються'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const RegisterModal = ({ onClose, onSuccess }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      // 🔹 Реєстрація
      const registerRes = await fetch('http://localhost:5000/users/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const registerContentType = registerRes.headers.get('Content-Type') || '';
      if (!registerContentType.includes('application/json')) {
        const raw = await registerRes.text();
        throw new Error('Сервер повернув не JSON: ' + raw.slice(0, 100));
      }

      const registerData = await registerRes.json();
      if (!registerRes.ok) {
        throw new Error(registerData.message || 'Помилка під час реєстрації');
      }

      // 🔹 Логін після успішної реєстрації
      const loginRes = await fetch('http://localhost:5000/users/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const loginContentType = loginRes.headers.get('Content-Type') || '';
      if (!loginContentType.includes('application/json')) {
        const raw = await loginRes.text();
        throw new Error('Сервер повернув не JSON під час входу: ' + raw.slice(0, 100));
      }

      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        throw new Error(loginData.message || 'Реєстрація пройшла, але вхід не вдався');
      }

      // Передаємо user і token (token може бути undefined, якщо бекенд не повертає)
      login(loginData.user, loginData.token || '');

      resetForm();
      onSuccess();
      setSubmitted(true);
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
        <button onClick={onClose} className={style.closeBtn} aria-label="Закрити">×</button>
        <h2 className={style.sectionTitle}>Реєстрація</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {({ errors, touched, isValid }) => (
            <Form autoComplete="off">
              <FormField
                name="firstName"
                id="firstName"
                type="text"
                placeholder="Імʼя *"
                confirmationMessage="Імʼя введено вірно"
                touched={touched.firstName}
                error={errors.firstName}
              />
              <FormField
                name="lastName"
                id="lastName"
                type="text"
                placeholder="Прізвище *"
                confirmationMessage="Прізвище введено вірно"
                touched={touched.lastName}
                error={errors.lastName}
              />
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
                confirmationMessage="Пароль виглядає добре"
                touched={touched.password}
                error={errors.password}
              />
              <FormField
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Підтвердження пароля *"
                confirmationMessage="Паролі збігаються"
                touched={touched.confirmPassword}
                error={errors.confirmPassword}
              />

              {error && <div className={style.error}>{error}</div>}

              <button
                type="submit"
                className={style.submitBtn}
                disabled={!isValid}
              >
                Зареєструватися
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterModal;
