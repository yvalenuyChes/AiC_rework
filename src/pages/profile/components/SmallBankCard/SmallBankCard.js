import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setColor, setMessage, removeMessage, removeColor } from '@/redux/slices/AppMessage'
import axios from 'axios'
import styles from './styles.module.scss'
import Loader from '@/components/Loader/Loader'


export const SmallBankCard = ({
   cardNumber,
   brand,
   bank,
   userEmail,
   setReloadCards
}) => {

   const number = cardNumber.toString()

   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)

   const removeCardHandler = () => {
      setLoading(true)
      const configuration = {
         method:'post',
         url:'http://localhost:3000/delete_card',
         data:{
            email: userEmail,
            cardNumber: cardNumber.toString()
         }
      }


      axios(configuration)
      .then(result=> {
         dispatch(setMessage(`${result.data.message}`))
         dispatch(setColor(`${result.data.color}`))
         setReloadCards(new Date())
         localStorage.removeItem('AiW_Credit_Card')
      })
      .then(setTimeout(()=> {
         dispatch(removeMessage())
         dispatch(removeColor())
      }, 3000))
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
   }

   const selectDefoultCard = () => {
      localStorage.setItem('AiW_Credit_Card', number)
      setReloadCards(new Date())
   }

   return(
      <div
      className={
         number == localStorage.getItem('AiW_Credit_Card')
         ?   styles.smallBankCard + ' ' + styles[bank] + ' ' + styles.selectedCard
         :   styles.smallBankCard + ' ' + styles[bank] 
         }>
         {
            loading
            ? <div className={styles.smallBankCard__loader} ><Loader/></div>

            :
            <>
               <div className={styles.smallBankCard_number} > **** {number.substring(number.length - 4)} </div>
               <div
               className={styles.smallBankCard_brand + ' ' + styles[brand]
               }
               />
               <div className={styles.smallBankCard_buttons} >
                  <button 
                  className={styles.smallBankCard__select + ' ' + styles.smallBankCard__button}
                  onClick={selectDefoultCard}
                  >Выбрать для оплаты</button>
                  <button className={styles.smallBankCard__remove + ' ' + styles.smallBankCard__button} 
                  onClick={removeCardHandler}
                  >Удалить карту</button>
               </div>
            </>
            
         }
        
      </div>
   )
}