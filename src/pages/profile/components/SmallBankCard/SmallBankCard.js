import styles from './styles.module.scss'

export const SmallBankCard = ({
   cardNumber,
   brand,
   bank
}) => {

   const number = cardNumber.toString()


   return(
      <div
      className={styles.smallBankCard + ' ' + styles[bank] }
      
      >
         <div className={styles.smallBankCard_number} > **** {number.substring(number.length - 4)} </div>
         <div
         className={styles.smallBankCard_brand + ' ' + styles[brand]}
         
         />
      </div>
   )
}