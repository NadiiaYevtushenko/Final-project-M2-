import { Field, ErrorMessage } from 'formik';
import ConfirmationMessage from '../RegisterForm/ConfirmationMessage';
import style from './RegisterModal.module.css';

type Props = {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  confirmationMessage: string;
  touched?: boolean;
  error?: string;
  ariaLabel?: string;
};

const FormField = ({
  id,
  name,
  type = 'text',
  placeholder,
  confirmationMessage,
  touched,
  error,
  ariaLabel,
}: Props) => {
  const inputClassName = `${style.input} ${
  touched && error ? style.error : touched && !error ? style.valid : ''
}`;

  return (
    <div>
      {ariaLabel && (
        <label htmlFor={id} className={style['visually-hidden']}>
          {ariaLabel}
        </label>
      )}
      <Field
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete="on"
        aria-label={ariaLabel}
        className={inputClassName}
      />
      <ErrorMessage name={name} component="div" className={style.error} />
      <ConfirmationMessage message={confirmationMessage} touched={touched} error={error} />
    </div>
  );
};

export default FormField;
