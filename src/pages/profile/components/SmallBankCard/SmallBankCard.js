import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setColor, setMessage, removeMessage, removeColor } from '@/redux/slices/AppMessage'
import axios from 'axios'
import styles from './styles.module.scss'
import Loader from '@/components/Loader/Loader'


export default function SmallBankCard ({
   cardNumber,
   brand,
   bank,
   userEmail,
   setReloadCards
}) {

   const number =  cardNumber ? cardNumber.toString() : ''

   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const [AiC_creditCard, setAiC_creditCard] = useState(null)

   useEffect(() => {
      setAiC_creditCard(localStorage.getItem('AiW_Credit_Card')) 
   }, [])

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
         if(window !== undefined){
            localStorage.removeItem('AiW_Credit_Card')
         }
        
      })
      .then(setTimeout(()=> {
         dispatch(removeMessage())
         dispatch(removeColor())
      }, 3000))
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
   }

   const selectDefoultCard = () => {
      if(window !== undefined){
         localStorage.setItem('AiW_Credit_Card', number)
      }
    
      setReloadCards(new Date())
   }

   return(
      <div
      className={
         number == AiC_creditCard
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