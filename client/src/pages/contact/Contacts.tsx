import { useAppDispatch } from '../../app/useAppDispatch';
import { useEffect } from 'react';

import { resetStatus } from '../../app/contactSlice'; // тут можна замінити на useAppDispatch
import ContactForm from '../../components/ContactForm/ContactForm';

import img from '../../assets/banner-3.webp';
import style from './contacts.module.css';

const Contact = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  return (
    <>
      <section className={style.heroSection}>
        <h1 className={style.heroTitle}>Контактна інформація</h1>
        <p className={style.heroText}>
          Зв’яжіться з нами зручним для вас способом.
          <br />
          Ми завжди відкриті до співпраці та нових ініціатив.
        </p>
        <p className={style.heroCall}>
          Нижче розміщено контактну форму, за допомогою якої ви можете
          надіслати нам свій запит. Також ви можете зв’язатися з нами телефоном
          або електронною поштою.
        </p>
      </section>

      <section className={style.sectionContainer}>
        <img src={img} alt="Наша команда" className={style.img} />
        <h2 className={style.addressTitle}>Подзвоніть Нам</h2>
        <address>
          <ul>
            <li className={style.addressContainer}>
              <p className={style.addressText}>Телефон</p>
              <a href="tel:+380660344230" className={style.addressLink}>
                +380 66 034 42 30
              </a>
            </li>
            <li className={style.addressContainer}>
              <p className={style.addressText}>Email</p>
              <a
                href="mailto:sales@drone-hive.tech"
                className={style.addressLink}
              >
                sales@3d-print.tech
              </a>
            </li>
            <li className={style.addressContainer}>
              <p className={style.addressText}>Адреса</p>
              <a
                href="https://maps.app.goo.gl/o4bnro8XfPgNta2K7"
                target="_blank"
                rel="noopener noreferrer"
                className={style.addressLink}
              >
                Україна, Київська область, м.Київ, вул. Хрещатик 1.
              </a>
            </li>
          </ul>
        </address>
      </section>

      <section className={style.contactSection}>
        <h3 className={style.addressTitle}>Зв’яжіться з нами</h3>
        <p className={style.addressText}>Форма для зв’язку</p>
        <ContactForm />
      </section>
    </>
  );
};

export default Contact;
