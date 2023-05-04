
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { removeColor, removeMessage } from '@/redux/slices/AppMessage'


export const AppMessage = () => {

   const message = useSelector(state => state.appMessage.appMessage)
   const borderColor =  useSelector(state => state.appMessage.color)

   const dispatch = useDispatch()

   const removeHandler = () => {
      dispatch(removeMessage())
      dispatch(removeColor())
   }


   return(
      message
      ?
         <div 
            className={styles.messageContainer} 
            style={ borderColor ? {border: `2px solid ${borderColor}`} : ''} 
            onClick={removeHandler}
         >
            {message}
         </div>
         
        : null
     
   )
}