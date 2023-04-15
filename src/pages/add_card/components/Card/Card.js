import styles from  './styles.module.scss'


export default function Card({
   bank,
   cardNumber,
   expire,
   holderName,
   brand
}){
   return(
      <div
      className={
         bank 
         ?  styles.card + ' ' + bank
         : styles.card
      }
      >
         <div
            className={styles.card__number}
         >
            {cardNumber}
         </div>
         <div
            className={styles.card__expire}
         >
            {expire}
         </div>
        <div
         className={styles.card__holder_name}
        > {holderName} 
        </div> 
        <div
        className={
         brand
         ? styles.card__brand + ' ' + brand
         : styles.card__brand
        }
        />
      </div>
   )
}