import axios from 'axios'
import styles from './styles.module.scss'

export const SmallBankCard = ({
   cardNumber,
   brand,
   bank,
   userEmail
}) => {

   const number = cardNumber.toString()

   const removeCardHandler = () => {

      const configuration = {
         method:'post',
         url:'http://localhost:3000/delete_card',
         data:{
            email: userEmail,
            cardNumber: cardNumber.toString()
         }
      }


      axios(configuration)
      .then(()=> console.log('Card deleted'))
      .catch(e => console.log(e))
   }

   return(
      <div
      className={styles.smallBankCard + ' ' + styles[bank] }>
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
      </div>
   )
}