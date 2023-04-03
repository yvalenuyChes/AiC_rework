import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import MainPage from '@/layout/MainPage'
import axios from 'axios'
import styles from './styles.module.scss'
import { Ticket } from './components/Ticket/Ticket'




export default function Profile(){

   const [user,setUser] = useState('')
   const [isLoading, setLoading] = useState(false)
   const [tikets, setTikets] = useState(null)
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
                     tikets.map(ticket => {
                        return(
                           <Ticket
                              city={ticket.name}
                              personNumber={ticket.personNumber}
                              dateFrom={ticket.dateFrom}
                              dateCome={ticket.dateCome}
                           />
                        )
                     })
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