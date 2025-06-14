import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Button from '../../components/Button/Button';
import printer from '../../assets/3d_printing.png';
import scaner from '../../assets/3d_scanner.png';
import epoxy from '../../assets/epoxy.png';
import carbo from '../../assets/carbo.png';
import prototype from '../../assets/prototype.png';
import finish from '../../assets/finish_stage.png';
import style from '../../pages/services/services.module.css';
// import { fetchServices } from '../store/servicesSlice';
// import type { AppDispatch } from '../app/store';

// const dispatch = useDispatch<AppDispatch>();



export default function Services() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Виклик майбутньої асинхронної логіки
    // dispatch(fetchServices());
  }, [dispatch]);

  return (
    <>
      <section className={style.heroSection}>
        <p className={style.heroText}>
          Розділ Для Тих Хто Хоче Знайти Вирішення Його Задачі Або Реалізувати Ідею
        </p>
      </section>

      {/* Сервіси з 3D */}
      <section>
        <div className={style.line}>
          <div className={style.circle}>
            <FontAwesomeIcon icon={faArrowDown} size="2xl" style={{ color: '#f2f3f5' }} className={style.icon} />
          </div>
        </div>
        <div className={style.sectionContainer}>
          <h2 className={style.productTitle}>Сервіси з 3D</h2>
          <ul className={style.flexContainerWrapp}>
            {[
              {
                title: '3D Printing',
                description1:
                  'ДРУК НА 3D-ПРИНТЕРІ З ТОЧНІСТЮ ДО 25 МІКРОН ВІД 1 РОБОЧОГО ДНЯ ЗА ПІДТРИМКИ НАШИХ ІНЖЕНЕРІВ.',
              },
              {
                title: '3D Modeling',
                description1:
                  '3D-МОДЕЛЮВАННЯ ОБʼЄКТІВ БУДЬ-ЯКОЇ СКЛАДНОСТІ ЗА КРЕСЛЕННЯМИ, ФОТО ЧИ ІДЕЯМИ. ВІД ОДНОГО РОБОЧОГО ДНЯ.',
              },
              {
                title: '3D Scanning',
                description1:
                  '3D-МОДЕЛЮВАННЯ ОБʼЄКТІВ БУДЬ-ЯКОЇ СКЛАДНОСТІ ЗА КРЕСЛЕННЯМИ, ФОТО ЧИ ІДЕЯМИ. ВІД ОДНОГО РОБОЧОГО ДНЯ.',
              },
            ].map((item, index) => (
              <li className={style.productList} key={index}>
                <article className={style.productArticle}>
                  <h3 lang="en" className={style.productListTitle}>{item.title}</h3>
                  <p className={style.aboutProductList}>{item.description1}</p>                  
                </article>
                <div className={style.buttonContainer}>
                  <Button buttonText="Зв'язатися з нами" redirectPath="/contact" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Інші Виробничі сервіси */}
      <section>
        <div className={style.line}>
          <div className={style.circle}>
            <FontAwesomeIcon icon={faArrowDown} size="2xl" style={{ color: '#f2f3f5' }} className={style.icon} />
          </div>
        </div>
        <div className={style.sectionContainer}>
          <h2 className={style.productTitle}>Інші Виробничі сервіси</h2>
          <ul className={style.list}>
            {[
              [
                {
                  title: 'Створення прототипу',
                  image: epoxy,
                },
                {
                  title: 'Кастомні проекти',
                  image: carbo,
                },
              ],
              [
                { title: 'Лиття під тиском', image: prototype },
                {
                  title: 'Архітектурні проекти',
                  image: finish,
                },
              ],
            ].map((group, groupIndex) => (
              <div className={style.cardContainer} key={groupIndex}>
                {group.map((item, index) => (
                  <li className={style.listItem} key={index}>
                    <article className={style.listArticle}>
                      <h3 className={style.listTitle}>{item.title}</h3>
                      <img src={item.image} alt={item.title} className={style.img} />
                    </article>
                    <div className={style.buttonContainer}>
                      <Button buttonText="Зв'язатися з нами" redirectPath="/contact" />
                    </div>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}