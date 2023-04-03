import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
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
import Input from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import styles from './styles.module.scss'






export default function Moscow(){


   const isLogin = useSelector(state => state.isAuth.isAuth)
   const [userEmail,setUserEmail] = useState('')

   useEffect(()=>{
      if(isLogin){
         axios.get('http://localhost:3000/user')
         .then(result => setUserEmail(result.data.email) )
         .catch(e => console.log(e))
      }
        
   }, [])

   console.log(userEmail)

   const [value, setValue] = useState({
      personNum:'',
      depDate: '',
      returnDate:''
   })

   const handleChange = name => event => {
		setValue({
			...value,
			[name]: event.target.value
		})
	}

   const handleSubmit = event => {
      event.preventDefault()
      const configuration = {
         method:'post',
         url:'http://localhost:3000/saint_petersburg',
         data:{
            email: userEmail,
            personNumber: personNum,
            dateFrom: depDate,
            dateCome: returnDate
         }
      }

      axios(configuration)
      .then(result => 
         console.log(result)
      )
      .catch(err => {
         console.log(err)
      })
   }

   const {personNum, depDate, returnDate} = value


   const pageWidth = useWindowWidth()


   return(
      <MainPage>
      <Head>
         <title>Санкт-Петербург</title>
      </Head>
      <section className={styles.wrapper}>
         {/* <ParralaxKanada /> */}
         <div className={styles.content_paralax}>
            <div className={styles.content__body}>
               <div className={styles.content__header} id="kanada_header">
                  <h1 className={styles.content__title}>Санкт-Петербург</h1>
                  <h2 className={styles.content__subtitle}>Мы покажем лучшие места этого прекрасного города</h2>
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
                     <div className={styles.row}  >
                           <div className={styles.col} id='order_ticketSPB' >
                              <h3>Заказать билет</h3>
                              <form  className={styles.ticket_order__form} onSubmit={handleSubmit} >
                                 <Input
                                    label={'Количество человек'}
                                    value={personNum}
                                    onChange={handleChange('personNum')}

                                 />
                                 <Input
                                    type="date"
                                    label="Отбытие"
                                    name="departure_date_bus"
                                    value={depDate}
                                    onChange={handleChange('depDate')}
                                 />
                                 <Input
                                    type="date"
                                    label="Когда вернетесь"
                                    name="return_date_bus"
                                    value={returnDate}
                                    onChange={handleChange('returnDate')}
                                 />
                                 <Button
                                    className={
                                       isLogin
                                       ?   styles.button
                                       :  styles.disabled
                                    }
                                    disabled = {!isLogin}
                                    title='Заказать билет'
                                    type='submit'
                                 />
                              </form>
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