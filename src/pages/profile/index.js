import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import MainPage from '@/layout/MainPage'
import axios from 'axios'
import { Ticket } from './components/Ticket/Ticket'
import { AddBankCardForm } from './components/AddBankCardForm/AddBankCardForm'
import { SmallBankCard } from './components/SmallBankCard/SmallBankCard'
import Loader from '@/components/Loader/Loader'
import styles from './styles.module.scss'




export default function Profile(){

   const [user,setUser] = useState('')
   const [tikets, setTikets] = useState(null)
   const [userBankCards, setUserBankCards] = useState(null)
   const [addBankCard, setAddBankCard] = useState(false)
   const isLogin = useSelector(state => state.isAuth.isAuth)

   useEffect(()=>{
         axios.get('http://localhost:3000/user')
         .then(result => setUser(result.data) )
         .catch(e => console.log(e))
   })


   useEffect(()=>{
      setTikets(user.tickets)
      setUserBankCards(user.creditCards)
   })


   return(
      <MainPage>
         <Head>
            <title>Профиль</title>
         </Head>
         <div className={styles.wrapper} >
         {
            isLogin
            ?
            <div className={styles.profile_block}>
             <h3 className={styles.profile_title} >Профиль</h3>
             <div className={styles.profile_name}>
               <h3 className={styles.profile_name_title} >  Ваше имя: {user === '' ?  <Loader/>  : user.name }</h3>
             </div>
       

           
             <div className={styles.profile__tickets} >
               <h3 className={styles.profile__tickets_title} >Ваши билеты</h3>
               <div>
                  {
                  tikets
                  ?  
                  tikets.length !== 0
                  ?
                  <div className={styles.profile__tickets_list} >
                     {
                        tikets.map((ticket, key) => {
                           return(
                              <Ticket
                                 city={ticket.name}
                                 personNumber={ticket.personNumber}
                                 dateFrom={ticket.dateFrom}
                                 dateCome={ticket.dateCome}
                                 price={ticket.price}
                                 key={key}
                              />
                           )
                        })
                     }
                  </div>
                  : <div className={styles.profile__tickets__no_tickets} >Вы еще не заказали билеты</div> 

                 
                  : 
                  <div className={styles.profile__tickets__loader} > <Loader/></div>
                  
                  }
               </div>
             </div>
             <div className={styles.user_pay_card} >
               <h3 className={styles.user_pay_card__title} >Ваши банковские карты</h3>
               <div className={styles.user_pay_card_message} >
                  Данное приложение поддерживает 7 банковских карточек:
                  <br/>
                  Сбер,
                  <br/>
                  Росбанк,
                  <br/> 
                  Тинькоф,
                  <br/> 
                  Альфа банк,
                  <br/> 
                  банк Открытие, 
                  <br/>
                  ВТБ, 
                  <br/>
                  Газпром банк
               </div>
               <div className={styles.user_pay_card_container} >
                  {

                     userBankCards
                     ? 
                     userBankCards.length !== 0
                        ? 
                        <div className={styles.user_pay_card_saved}>
                           {
                              userBankCards.map((bankCard, key) => {
                                 return(
                                    <SmallBankCard
                                       cardNumber={bankCard.cardNumber}
                                       bank={bankCard.bankName}
                                       brand={bankCard.brand}
                                       key={key}
                                       userEmail={user.email}
                                    />
                                 )
                              })
                           }
                         
                        </div>
                       
                        : <div className={styles.user_pay_card__no_cards} >
                           <h3>Нет привязанных банковских карт</h3>
                        </div>
                     :  <div className={styles.user_pay_card__loader} > <Loader/></div>
                  }
               </div>
               <div className={styles.user_pay_card__add_card__container}  >
                    
                     <button 
                     type='button'  
                     onClick={() => setAddBankCard(!addBankCard)}
                     className={styles.user_pay_card__add_card__button}
                     >
                        Добавить карту
                    </button>
                     {
                        addBankCard
                        ? 
                        <AddBankCardForm
                           userEmail={user.email}
                        />
                        : null
                     }
                  </div>
             </div>
            </div>


            :
            <div className={styles.profile_no_login}>
            <h3>
               Вы не авторизированны, войдите пожалуйста в систему
            </h3>
            </div>
         }
         </div>
      </MainPage>
   )
}