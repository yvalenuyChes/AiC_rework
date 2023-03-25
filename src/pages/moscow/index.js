import Head from 'next/head'
import MainPage from "../../layout/MainPage"
import useWindowWidth from '../../custumHooks/useWindowWidth'
import ParralaxKanada from '../../components/CityPageComponents/Parralax/Parralax'
import SlidingSlider from '../../components/CityPageComponents/Sliding slider/SlidingSlider'
import Card from '../../components/CityPageComponents/Card/Card'
import {
	FIFTH_TEXT_ITEM,
	FIRST_TEXT_ITEM,
	FOURTH_TEXT_ITEM,
	SECOND_TEXT_ITEM,
	SIXTH_TEXT_ITEM,
	THIRD_TEXT_ITEM
} from '../../components/CityPageComponents/CountriesPageText/moscow_text'
import styles from './styles.module.scss'



export default function Moscow(){


   const pageWidth = useWindowWidth()


   return(
      <MainPage>
      <Head>
         <title>Москва</title>
      </Head>
      <section className={styles.wrapper}>
         <ParralaxKanada />
         <div className={styles.content_paralax}>
            <div className={styles.content__body}>
               <div className={styles.content__header} id="kanada_header">
                  <h1 className={styles.content__title}>Москва</h1>
                  <h2 className={styles.content__subtitle}>Мы покажем удивительный мир канады</h2>
               </div>
               <div className={styles.content__article}>
                  <div className={styles.content__main}>
                     <div className={styles.row}>
                        <div className={styles.col} id="kanada_kitchen">
                           <h3>Еда</h3>
                           {pageWidth > 1000
                              ? <section className={styles.content_img}>
                                 <SlidingSlider
                                    sendClass={styles.kitchenFirstImage}
                                    title="Традиционный гуляш"
                                    subtitle={FIRST_TEXT_ITEM}
                                 />
                                 <SlidingSlider
                                    sendClass={styles.kitchenSecondImage}
                                    title="Канадский завтрак"
                                    subtitle={SECOND_TEXT_ITEM}
                                 />
                                 <SlidingSlider
                                    sendClass={styles.kitchenThirdImage}
                                    title="Кленовый сироп"
                                    subtitle={THIRD_TEXT_ITEM}
                                 />
                              </section>
                              : <section className={styles.wrapperCards}>
                                 <Card
                                    idCard={styles.firstCardItem}
                                    title='Традиционный гуляш'
                                    subtitle={FIRST_TEXT_ITEM}
                                 />
                                 <Card
                                    idCard={styles.secondCardItem}
                                    title='Канадский завтрак'
                                    subtitle={SECOND_TEXT_ITEM}
                                 />
                                 <Card
                                    idCard={styles.thirdCardItem}
                                    title='Кленовый сироп'
                                    subtitle={THIRD_TEXT_ITEM}
                                 />
                              </section>
                           }
                        </div>
                     </div>
                     <div className={styles.row}>
                        <div className={styles.col} id="kanada_interesting_places">
                           <h3>Интересные места</h3>
                           {pageWidth > 1000
                              ? <section className={styles.content_img}>
                                 <SlidingSlider
                                    sendClass={styles.interestingfirstImage}
                                    title="Ниагарский водопад"
                                    subtitle={FOURTH_TEXT_ITEM}
                                 />
                                 <SlidingSlider
                                    sendClass={styles.interestingSecondImage}
                                    title="Парламентский холм (Оттава)"
                                    subtitle={FIFTH_TEXT_ITEM}
                                 />
                                 <SlidingSlider
                                    sendClass={styles.interestingThirdImage}
                                    title="Парк Стэнли (Ванкувер)"
                                    subtitle={SIXTH_TEXT_ITEM}
                                 />
                              </section>
                              : <section className={styles.wrapperCards}>
                                 <Card
                                    idCard={styles.fourthCardItem}
                                    title='Ниагарский водопад'
                                    subtitle={FOURTH_TEXT_ITEM}
                                 />
                                 <Card
                                    idCard={styles.fifthCardItem}
                                    title='Парламентский холм (Оттава)'
                                    subtitle={FIFTH_TEXT_ITEM}
                                 />
                                 <Card
                                    idCard={styles.sixthCardItem}
                                    title='Парк Стэнли (Ванкувер)'
                                    subtitle={SIXTH_TEXT_ITEM}
                                 />
                              </section>

                           }
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </MainPage>
   )
}