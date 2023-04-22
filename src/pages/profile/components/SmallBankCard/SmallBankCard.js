import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setColor, setMessage } from '@/redux/slices/AppMessage'
import axios from 'axios'
import styles from './styles.module.scss'
import Loader from '@/components/Loader/Loader'


export const SmallBankCard = ({
   cardNumber,
   brand,
   bank,
   userEmail
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
      })
      .then(setTimeout(()=> {
         dispatch(removeMessage())
         dispatch(removeColor())
      }, 3000))
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
   }

   return(
      <div
      className={styles.smallBankCard + ' ' + styles[bank] }>
         {
            loading
            ? <div className={styles.smallBankCard__loader} ><Loader/></div>

            :
            <>
               <div className={styles.smallBankCard_number} > **** {number.substring(number.length - 4)} </div>
               <div
               className={styles.smallBankCard_brand + ' ' + styles[brand]}
               />
               <div className={styles.smallBankCard_buttons} >
                  <button 
                  className={styles.smallBankCard__select}
                  
                  >Выбрать для оплаты</button>
                  <button className={styles.smallBankCard__remove} 
                  onClick={removeCardHandler}
                  >Удалить карту</button>
               </div>
            </>
            
         }
        
      </div>
   )
}