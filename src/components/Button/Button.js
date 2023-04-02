import styles from './styles.module.scss'


export const Button = ({
   title,
   type,
   onClick,
   disabled,
   className,
}) => {
   return(
         <div>
            <button
             className={
               className 
               ? `${styles.button + ' ' + className}`
               : styles.button
            }
            type={type}
            disabled={disabled}
            onClick={onClick}
            >
                  {title}
            </button>
         </div>
   )
}