import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import MainPage from '@/layout/MainPage'
import axios from 'axios'
import  Ticket  from './components/Ticket/Ticket'
import  AddBankCardForm from './components/AddBankCardForm/AddBankCardForm'
import  SmallBankCard  from './components/SmallBankCard/SmallBankCard'
import Loader from '@/components/Loader/Loader'
import styles from './styles.module.scss'
import Link from 'next/link'


//!!!!!!!!!!!!!!!!!!!!! Поставь фон для карточек, чтобы при медленной загрузке было понятно, что за карточка

export default function Profile(){

   const [user,setUser] = useState('')
   const [addBankCard, setAddBankCard] = useState(false)
   const isLogin = useSelector(state => state.isAuth.isAuth)
   const [reloadCards, setReloadCards] = useState('')

   useEffect(()=>{
         axios.get('http://localhost:3000/user')
         .then(result => setUser(result.data) )
         .catch(e => console.log(e))
   }, [addBankCard, reloadCards])

   const sendVerifiedLetter = () =>{

      const configuration = {
         method:'post',
         url:'http://localhost:3000/send_virified_letter',
         data:{
            email:user.email
         }
      }


      axios(configuration)
      .then(result => {
         console.log(result)
      })
      .catch(e => console.log(e))
   }

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
               <h3 className={styles.profile_name_title} >  Ваше имя: {user === null ?  <Loader/>  : user.name }</h3>
             </div>
            <div>
               <p>Ваша почта: {user === null ? <Loader/> : user.email}  </p>

               <button onClick={sendVerifiedLetter} >Подтвердить почту</button>
            </div>

           
             <div className={styles.profile__tickets} >
               <h3 className={styles.profile__tickets_title} >Ваши билеты</h3>
               <h4>Действующие билеты</h4>
               <div>
                  {
                  user.tickets
                  ?  
                  user.tickets.length !== 0
                  ?
                  <div className={styles.profile__tickets_list} >
                     {
                         user.tickets.map((ticket, key) => {
                           
                           if(ticket.dateCome < (new Date().toISOString()))
                           {
                             return null
                           }else{
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
                           }               
                        })
                     }
                  </div>
                  : <div className={styles.profile__tickets__no_tickets} >Вы еще не заказали билеты</div> 

                 
                  : 
                  <div className={styles.profile__tickets__loader} > <Loader/></div>
                  
                  }
               </div>
               <Link href={'/used_tickets'}  >Использованные билеты</Link>
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

                     user.creditCards
                     ? 
                     user.creditCards.length !== 0
                        ? 
                        <div className={styles.user_pay_card_saved}>
                           {
                              user.creditCards.map((bankCard, key) => {
                                 return(
                                    <SmallBankCard
                                       cardNumber={bankCard.cardNumber}
                                       bank={bankCard.bankName}
                                       brand={bankCard.brand}
                                       key={key}
                                       userEmail={user.email}
                                       setReloadCards={setReloadCards}
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
                           setAddBankCard={setAddBankCard}
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