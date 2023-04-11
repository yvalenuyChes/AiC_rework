import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Head from 'next/head'
import MainPage from "../../layout/MainPage"
import useWindowWidth from '../../custumHooks/useWindowWidth'
// import ParralaxKanada from '../../components/CityPageComponents/Parralax/Parralax'
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
import Loader from '@/components/Loader/Loader'

export default function Saint_petersburg(){

   const currentDate =new Date()
   
   const isLogin = useSelector(state => state.isAuth.isAuth)
   const [serverResult, setServerResult] = useState(null)
   const [loadind, setLoading] = useState(false)
   const [serverError, setServerError] = useState(null)
   const [userEmail,setUserEmail] = useState('')
   const [price, setPrice] = useState(5000)
   const [personNum, setPersonNum] = useState(1)
   const [date, setDate] = useState(currentDate.toJSON().slice(0, 10))
   const [accept, setAccept] = useState(false)
   const [isValidPlusButton, setValidPlusButton] = useState(true)
   const [isValidMinusButton, setValidMinusButton] = useState(false)
   const pageWidth = useWindowWidth()
   const maxDate = new Date(new Date().setDate( new Date().getDate() + 30)) 

   useEffect(()=>{
         axios.get('http://localhost:3000/user')
         .then(result => setUserEmail(result.data.email) )
         .catch(e => console.log(e))
      
      
   }, [])

   
 useEffect(()=> {
   personNumValidator()
   }, [personNum])


   const handlePrice = () => {
      if(!accept){
         setPrice(prev => prev + 6000 )
      }else{
         setPrice(prev => prev - 6000 )
      }
   }

   const personNumValidator = () => {
      if(personNum === 5){
         setValidPlusButton(false)
      }else if(personNum === 1){
         setValidMinusButton(false)
      }else{
         setValidMinusButton(true)
         setValidPlusButton(true)
      }
      console.log(personNum);
   }

   const handleButtonIncrease = () => {
      setPersonNum(prev => prev + 1)
      setPrice(prev => prev + 5000)
   }

   const handleButtonSub = () => {
      setPersonNum(prev => prev - 1)
      setPrice(prev => prev - 5000)
   }

   const handleAccept = () => {
      setAccept(!accept)
      handlePrice()
   }

   const handleDate = event => {
      setDate(event.target.value)
   }

   const handleSubmit = event => {
      event.preventDefault()
      setLoading(true)
      const ticketDate =  new Date(date)
      const returnDate =  new Date(date).setDate(new Date(date).getDate() + 3)
      const resaltReturnDate = new Date(returnDate)

      const configuration = {
         method:'post',
         url:'http://localhost:3000/saint_petersburg',
         data:{
            email: userEmail,
            personNumber: personNum,
            dateFrom: ticketDate,
            dateCome: resaltReturnDate,
            price
         }
      }

      axios(configuration)
      .then(result => 
         setServerResult(result.data),
         setAccept(false),
         setServerError(null),
         setPersonNum(1),
         setDate(currentDate.toJSON().slice(0, 10))
      )
      .catch(err => {
        setServerError(err)
      })
      .finally(setLoading(false))
   }

 


   


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
                           <h3>Рестораны</h3>
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
                           <h3>Достопримечательности</h3>
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
                              <div className={styles.attention} >
                                 <p>Поездка занимает три дня</p>
                                 <p>Стоимость отеля 6000р</p>
                                 <p>Максимальное количество человек - 5</p>
                                 <p>
                                    В стоимость поездки не входит билет на автобус, однако вы можете заказать номер в нашем отеле
                                    <br/>
                                    (номер вмещает в себя 5 человек)
                                 </p>
                              </div>
                              <form  className={styles.ticket_order__form} onSubmit={handleSubmit} >
                                 <div className={styles.inputBox}>
                                    <Input
                                       label={'Количество человек'}
                                       value={personNum}
                                       type='number'
                                       disabled = {true}
                                       readOnly={true}
                                    />
                                    <button 
                                    onClick={handleButtonIncrease} 
                                    disabled={!isValidPlusButton}
                                    type='button' 
                                    className={isValidPlusButton 
                                       ? styles.inputButtons + ' ' + styles.inputButtons_plus  
                                       : styles.inputButtons + ' ' + styles.inputButtons_plus + ' '  + styles.disabled_button
                                    }
                                    >+</button>

                                    <button 
                                    onClick={handleButtonSub} 
                                    disabled={!isValidMinusButton}
                                    type='button' 
                                    className={
                                       isValidMinusButton
                                       ?  styles.inputButtons + ' ' + styles.inputButtons_minus
                                       : styles.inputButtons + ' ' + styles.inputButtons_minus + ' '  + styles.disabled_button
                                      
                                    }
                                    >-</button>
                                 </div>
                                <div className={styles.inputBox} >
                                 <Input
                                       type="date"
                                       label="На какое число"
                                       name="departure_date_spb"
                                       value={date}
                                       min={currentDate.toJSON().slice(0, 10)}
                                       max={maxDate.toJSON().slice(0, 10)}
                                      onChange={handleDate} 
                                      required = {true}
                                       
                                    />
                                </div>
                                 <div className={styles.recover} >
                                    <label 
                                    onClick={handleAccept} 
                                    className={
                                       accept
                                       ? styles.signin_label + ' ' + styles.accepted
                                       : styles.signin_label
                                    } 
                                    htmlFor="ckbox"
                                    >Нужен номер в отеле?
                                    </label>
                                 </div>
                                 <div className={styles.price} >
                                    Цена: {price}
                                 </div>
                                 <Button
                                    className={
                                       isLogin
                                       ?   styles.button
                                       :  styles.disabled
                                    }
                                    disabled = {!isLogin}
                                    title={loadind ? <Loader/> : 'Заказать билет'}
                                    type='submit'
                                 />
                                 <div className={styles.result} >
                                    {
                                       serverResult
                                       ? <div>Вы успешно приобрели билет</div>
                                       :<div>{serverError}</div>
                                    }
                                 </div>
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