
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'


export const AppMessage = () => {

   const message = useSelector(state => state.appMessage.appMessage)
   const borderColor =  useSelector(state => state.appMessage.color)


   return(
      message
      ?
         <div 
            className={styles.messageContainer} 
            style={ borderColor ? {border: `2px solid ${borderColor}`} : ''} 
         >
            {message}
         </div>
         
        : null
     
   )
}