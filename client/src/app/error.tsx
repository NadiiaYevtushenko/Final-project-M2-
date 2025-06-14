import { useRouteError } from 'react-router';
import style from '../page.module.css';

export default function ErrorPage() {
  const error = useRouteError() as Error;

  console.error(error);

  return (
    <div className={style.errorPage}>
      <h2>Щось пішло не так!</h2>
      <p>{error.message || 'Невідома помилка'}</p>
    </div>
  );
}
