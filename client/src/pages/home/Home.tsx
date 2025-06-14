import Button from '../../components/Button/Button';
import MyImg from '../../components/MyImg/MyImg';

import team from '../../assets/team.png';
import soldiers from '../../assets/soldier.png';
import processEngineer from '../../assets/processEngineer.png';
import dinosaur from '../../assets/dinosaur.png';
import style from '../../page.module.css';

const Home = () => {
  return (
    <>
      <h1 lang="en" className={style.visuallyHidden}>
        3D Printing Hive
      </h1>

      {/* Секція привітання */}
      <section className={style.sectionContainer}>
        <div className={style.flexContainer}>
          <div className={style.columnWidth}>
            <h2 className={style.title}>
              Всім привіт! <br /> Ми — команда <br /> творчих та <br />
              технічних спеціалістів, <br />
              <span> що об'єдналися створювати інноваційні 3D-продукти для сучасного світу</span>
            </h2>
            <p className={style.text}>
              Ми спеціалізуємось на 3D-друку продукції для побуту, техніки, інженерії та кастомізованих рішень.
              Наша мета — зробити 3D-технології доступними для кожного.
            </p>
            <Button
              buttonText="Дізнатись більше про наші вироби"
              redirectPath="/production"
            />
          </div>

          <div className={style.imgGradient}>
            <div className={style.team}>
              <MyImg
                imgSrc={team}
                alt="Ілюстративне зображення команди"
                width={264}
                height={264}
              />
            </div>
            <div className={style.soldiers}>
              <MyImg
                imgSrc={soldiers}
                alt="Ілюстративне зображення солдат"
                width={264}
                height={264}
              />
            </div>
            <div className={style.containerGradient}>
              <div className={style.columnGradient}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Секція інженера */}
      <section className={style.sectionContainer}>
        <div className={style.description}>
          <MyImg
            imgSrc={processEngineer}
            alt="Зображення інженера"
            width={400}
            height={400}
          />
          <div>
            <h2 className={style.productionTitle}>
              МИ СТВОРЮЄМО ПРОДУКТИ, ЯКІ ПРАЦЮЮТЬ ДЛЯ ВАС
            </h2>
            <p className={style.aboutProduct}>
              Наш підхід заснований на індивідуальних замовленнях: ми враховуємо кожну деталь, 
              кожен технічний запит і кожну ідею клієнта. 
            </p>
          </div>
        </div>
      </section>

      {/* Секція кастомних рішень */}
      <section className={style.sectionContainer}>
        <div className={style.descriptionRevert}>
          <div>
            <h2 className={style.productionTitle}>
              КАСТОМНІ 3D-РІШЕННЯ ДЛЯ БУДЬ-ЯКОГО ЗАПИТУ
            </h2>
            <p className={style.aboutProduct}>
              Ми не просто виконуємо завдання — ми занурюємося в контекст, розуміємо ваші цілі й трансформуємо ідеї у функціональні, ефективні та естетично довершені рішення. <br />
              Наш підхід заснований на індивідуальних замовленнях: ми враховуємо кожну деталь, кожен технічний запит і кожну ідею клієнта. <br />
              Кожна технічна вимога аналізується, адаптується й реалізується згідно з найкращими практиками. Ми проектуємо продукти з нуля, під конкретні потреби — без шаблонів, без компромісів. <br />
              Усе, що ми створюємо, — це результат тісної співпраці з вами. Ваша ідея стає нашою технічною задачею. Ваш виклик — наш інженерний фокус. Ваш успіх — наша мета.
            </p>
          </div>
          <MyImg
            imgSrc={dinosaur}
            alt="Зображення динозавра"
            width={400}
            height={400}
          />
        </div>
      </section>

      {/* Секція продукції */}
      <section className={style.sectionContainer}>
        <h2 className={style.productTitle}>Наша продукція</h2>
        <ul className={style.flexContainerWrapp}>
          {[
            {
              title: 'Корпуси та деталі для техніки',
              text: 'Друковані корпуси, монтажні платформи, адаптери та елементи для інженерних проєктів',
            },
            {
              title: 'Побутові аксесуари',
              text: 'Органайзери, тримачі, гачки, елементи декору та практичні рішення для дому',
            },
            {
              title: 'Кастомні 3D-запчастини',
              text: 'Надруковані запчастини, які більше не випускаються, або які важко знайти на ринку',
            },
            {
               title: 'Іграшки та колекційні фігурки',
               text: 'Кастомні іграшки, екшн-фігурки, сувенірні моделі, брелоки та ігрові елементи, надруковані на замовлення',
            },
          ].map((item, i) => (
            <li className={style.productList} key={i}>
              <article className={style.productArticle}>
                <h3 className={style.productListTitle}>{item.title}</h3>
                <p className={style.aboutProductList}>{item.text}</p>
              </article>
              <div className={style.buttonContainer}>
                <Button buttonText="Переглянути" redirectPath="#" />
              </div>
            </li>
          ))}
        </ul>
      </section>

    </>
  );
};

export default Home;
