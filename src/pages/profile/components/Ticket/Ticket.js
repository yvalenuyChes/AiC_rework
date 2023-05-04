import moment from 'moment'

import styles from './style.module.scss'

export default function Ticket({
   city,
   personNumber,
   dateFrom,
   dateCome,
   price
}){
   return(
      <div className={styles.ticket} >
         <h4 className={styles.ticket__title} >Билет в {city}</h4>
         <div className={styles.ticket__person_number} >Количество человек {personNumber}</div>
         <div className={styles.ticket__dates} >
            <div className={styles.ticket__date_from} >{moment(dateFrom).utc().format('DD-MM-YYYY')} </div>
            <div className={styles.ticket__date_come} >{moment(dateCome).utc().format('DD-MM-YYYY')} </div>
         </div>   
         <div className={styles.ticket__price} >Цена: {price}</div>
      </div>
   )
}