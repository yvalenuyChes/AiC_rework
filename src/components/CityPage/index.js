import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Head from 'next/head'
import MainPage from "../../layout/MainPage"
import useWindowWidth from '../../custumHooks/useWindowWidth'
// import ParralaxKanada from '../../components/CityPageComponents/Parralax/Parralax'
import SlidingSlider from '../../components/CityPageComponents/Sliding slider/SlidingSlider'
import Card from '../../components/CityPageComponents/Card/Card'
import Input from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import styles from './styles.module.scss'
import Loader from '@/components/Loader/Loader'
import { setColor, setMessage, removeColor, removeMessage } from '@/redux/slices/AppMessage'
import { Modal } from '@mui/material'
import  AddBankCardForm  from '@/pages/profile/components/AddBankCardForm/AddBankCardForm'


export default function CityPage({
   cityName,
   cityNameEng,
   firstImage, firstTitle,  firstText, firstCardImage,
   secondImage, secondTitle, secondText, secondCardImage,
   thirdImage, thirdTitle, thirdText, thirdCardImage, 
   fourthImage, fourthTitle, fourthText, fourthCardImage,
   fifthImage, fifthTitle, fifthText, fifthCardImage,
   sixthImage, sixthTitle, sixthText, sixthCardImage,

   ticketPrice = 10000,
   hotelPrice  = 6000,
}){

   const currentDate =new Date()
   
   const isLogin = useSelector(state => state.isAuth.isAuth)
   const [loadind, setLoading] = useState(false)
   const [userEmail,setUserEmail] = useState('')
   const [price, setPrice] = useState(ticketPrice)
   const [personNum, setPersonNum] = useState(1)
   const [date, setDate] = useState(currentDate.toJSON().slice(0, 10))
   const [accept, setAccept] = useState(false)
   const [isValidPlusButton, setValidPlusButton] = useState(true)
   const [isValidMinusButton, setValidMinusButton] = useState(false)
   const maxDate = new Date(new Date().setDate( new Date().getDate() + 30)) 
   const [creditCard, setCreditCard] = useState(null)
   const [openPopup, setOpenPopup] = useState(false)


   const dispatch = useDispatch()

   const pageWidth = useWindowWidth()

   useEffect(()=>{
         axios.get('http://localhost:3000/user').then(result => {
            setUserEmail(result.data.email)
            if(window !== undefined){
               setCreditCard(localStorage.getItem('AiW_Credit_Card'))
            }
          
         })
         .catch(e => console.log(e))
   }, [])

   
 useEffect(()=> {
   personNumValidator()
   }, [personNum])


   const handlePrice = () => {
      if(!accept){
         setPrice(prev => prev + hotelPrice )
      }else{
         setPrice(prev => prev - hotelPrice )
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
   }

   const handleButtonIncrease = () => {
      setPersonNum(prev => prev + 1)
      setPrice(prev => prev + ticketPrice)
   }

   const handleButtonSub = () => {
      setPersonNum(prev => prev - 1)
      setPrice(prev => prev - ticketPrice)
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
         url:'http://localhost:3000/order_ticket',
         data:{
            email: userEmail,
            name:`${cityName}`,
            personNumber: personNum,
            dateFrom: ticketDate,
            dateCome: resaltReturnDate,
            price
         }
      }

      creditCard
      ?
         axios(configuration)
         .then(result => {
            dispatch(setMessage(result.data.message))
            dispatch(setColor(result.data.color))
            setTimeout(()=> {
               dispatch(removeMessage())
               dispatch(removeColor())
            }, 3000)
            setAccept(false)
            setPersonNum(1)
            setPrice(5000)
            setDate(currentDate.toJSON().slice(0, 10))
         }
         
         )
         .catch(err => {
            console.log(err);
         })
         .finally(() => setLoading(false))
      :
         setOpenPopup(true)
         setLoading(false)

      
   }

 


   
   //!!!!!!!!!! На главной странице слетели размеры картинок, картинки стран

   return(
      <MainPage>
      <Head>
         <title>{cityName}</title>
      </Head>
      <section className={styles.wrapper}>
         {/* <ParralaxKanada /> */}
         <div className={styles.content_paralax}>
            <div className={styles.content__body}>
               <div className={styles.content__header} id={`${cityNameEng}_header`}>
                  <h1 className={styles.content__title}>{cityName}</h1>
                  <h2 className={styles.content__subtitle}>Мы покажем лучшие места этого прекрасного города</h2>
               </div>
               <div className={styles.content__article}>
                  <div className={styles.content__main}>
                     <Modal
                        open={openPopup}
                        
                     >
                        <div className={styles.modal__container} >
                           <div
                              className={styles.modal__body}
                           >
                              <span
                                 role="button"
                                 className={styles.popup__close}
                                 onClick={() => setOpenPopup(!openPopup)}
                              />
                              <h4
                              className={styles.modal__body_title}
                              >Привязка банковской карты</h4>
                              <AddBankCardForm
                                 setAddBankCard={setOpenPopup}
                                 setCreditCard = {setCreditCard}
                              />
                           </div>
                           
                        </div>
                       
                     </Modal>
                     <div className={styles.row}>
                        <div className={styles.col} id={`${cityNameEng}_kitchen`}>
                           <h3>Рестораны</h3>
                           {pageWidth > 1000
                              ? <section className={styles.content_img}>
                                 <SlidingSlider
                                    sendClass={firstImage}
                                    title={`${firstTitle}`}
                                    subtitle={`${firstText}`}
                                 />
                                 <SlidingSlider
                                    sendClass={secondImage}
                                    title= {`${secondTitle}`}
                                    subtitle={`${secondText}`}
                                 />
                                 <SlidingSlider
                                    sendClass={thirdImage}
                                    title={`${thirdTitle}`}
                                    subtitle={thirdText}
                                 />
                              </section>
                              : <section className={styles.wrapperCards}>
                                 <Card
                                    idCard={firstCardImage}
                                    title= {`${firstTitle}`}
                                    subtitle={`${firstText}`}
                                 />
                                 <Card
                                    idCard={secondCardImage}
                                    title= {`${secondTitle}`}
                                    subtitle={`${secondText}`}
                                 />
                                 <Card
                                    idCard={thirdCardImage}
                                    title={`${thirdTitle}`}
                                    subtitle={`${thirdText}`}
                                 />
                              </section>
                           }
                        </div>
                     </div>
                     <div className={styles.row}>
                        <div className={styles.col} id={`${cityNameEng}_interesting_places`}>
                           <h3>Достопримечательности</h3>
                           {pageWidth > 1000
                              ? <section className={styles.content_img}>
                                 <SlidingSlider
                                    sendClass={fourthImage}
                                    title={`${fourthTitle}`}
                                    subtitle={`${fourthText}`}
                                 />
                                 <SlidingSlider
                                    sendClass={fifthImage}
                                    title={`${fifthTitle}`}
                                    subtitle={`${fifthText}`}
                                 />
                                 <SlidingSlider
                                    sendClass={sixthImage}
                                    title= {`${sixthTitle}`}
                                    subtitle={`${sixthText}`}
                                 />
                              </section>
                              : <section className={styles.wrapperCards}>
                                 <Card
                                    idCard={fourthCardImage}
                                    title={`${fourthTitle}`}
                                    subtitle={`${fourthText}`}
                                 />
                                 <Card
                                    idCard={fifthCardImage}
                                    title={`${fifthTitle}`}
                                    subtitle={`${fifthText}`}
                                 />
                                 <Card
                                    idCard={sixthCardImage}
                                    title={`${sixthTitle}`}
                                    subtitle={`${sixthText}`}
                                 />
                              </section>

                           }
                        </div>
                     </div>
                     <div className={styles.row}  >
                           <div className={styles.col} id={`${cityNameEng}_order_ticket`} >
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
                                 {
                                    isLogin
                                    ?
                                       creditCard
                                       ? null
                                       : <p style={{color:'red'}} >Чтобы купить билет, привяжите в личном кабинете банковскую карту</p>
                                    : 
                                    <>
                                     <p>Для приобретения билета нужно зарегистрироваться или войти в систему</p>  
                                     <p>Чтобы купить билет, привяжите в личном кабинете банковскую карту</p>
                                    </>
                                   
                                 }
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
                                       // isLogin && creditCard
                                       // ?   styles.button
                                       // :  styles.disabled

                                       isLogin
                                       ?   styles.button
                                       :  styles.disabled
                                    }
                                    // disabled = {!isLogin || !creditCard}
                                    disabled = {!isLogin}
                                    title={loadind ? <Loader/> : 'Заказать билет'}
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