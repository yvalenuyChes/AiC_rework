import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import MainPage from '@/layout/MainPage'
import axios from 'axios'
import styles from './styles.module.scss'
import { Ticket } from './components/Ticket/Ticket'
import Image from 'next/image'
import Add from '../../images/bankCard/Add.svg'
import { AddBankCardForm } from './components/AddBankCardForm/AddBankCardForm'
import { SmallBankCard } from './components/SmallBankCard/SmallBankCard'




export default function Profile(){

   const [user,setUser] = useState('')
   const [isLoading, setLoading] = useState(false)
   const [tikets, setTikets] = useState(null)
   const [userBankCards, setUserBankCards] = useState(null)
   const [addBankCard, setAddBankCard] = useState(false)
   const isLogin = useSelector(state => state.isAuth.isAuth)

   useEffect(()=>{
         axios.get('http://localhost:3000/user')
         .then(result => setUser(result.data) )
         .catch(e => console.log(e))
         // .finally(setLoading(false))
   }, [])

   useEffect(()=>{
      setLoading(true)
      setTikets(user.tickets)
      setUserBankCards(user.creditCards)
      setLoading(false)
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
             <h3 className={styles.profile_name} >  Ваше имя: {user.name}</h3>

           
             <div className={styles.profile__tickets} >
               <h3 className={styles.profile__tickets_title} >Ваши билеты</h3>
               <div className={styles.profile__tickets_list} >
                  {
                  tikets
                     ?
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
                     : null
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
               <div className={styles.user_pay_card_saved} >
                  {
                     userBankCards
                     ? userBankCards.map((bankCard, key) => {
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
                     : <div>
                        <h3>Нет привязанных банковских карт</h3>
                     </div>
                  }
               </div>
               <div>
                     <h3>Добавить карту</h3>
                     <div className={styles.user_pay_card__add_card} 
                     onClick={() => setAddBankCard(!addBankCard)}
                     >
                        
                       <Image
                       src={Add}
                       height={20}
                       width={20}
                       />
                     </div>
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