import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import style from './RegisterModal.module.css';
import FormField from '../RegisterForm/FormField';
import SuccessModal from './SuccessModal';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Імʼя обовʼязкове').min(2).max(30),
  lastName: Yup.string().required('Прізвище обовʼязкове').min(2).max(30),
  email: Yup.string().required('Email обовʼязковий').email('Невірний формат email'),
  phone: Yup.string()
    .required('Телефон обовʼязковий')
    .matches(/^\+380\d{9}$/, 'Формат +380XXXXXXXXX'),
  password: Yup.string().required('Пароль обовʼязковий').min(5),
  confirmPassword: Yup.string()
    .required('Підтвердження обовʼязкове')
    .oneOf([Yup.ref('password')], 'Паролі не збігаються'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const RegisterModal = ({ onClose }: { onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Помилка під час реєстрації');
      }

      console.log('✔️ Успішна реєстрація');
      setSubmitted(true);
      resetForm();
    } catch (err: any) {
      alert(err.message);
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
                name="phone"
                id="phone"
                type="text"
                placeholder="Телефон +380..."
                confirmationMessage="Телефон валідний"
                touched={touched.phone}
                error={errors.phone}
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

              <button type="submit" className={style.submitBtn} disabled={!isValid}>
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
