import { useEffect, useState } from "react"
import styles from './styles.module.scss'
import axios from "axios"
import Card from "../../../../components/Card/Card"
import Input from "@/components/Input/Input"
import { X_RAPID_API_HOST, X_RAPID_API_KEY } from "@/keys"
import { useDispatch } from "react-redux"
import { setColor, setMessage, removeColor, removeMessage } from "@/redux/slices/AppMessage"
import Loader from "@/components/Loader/Loader"

export default function AddBankCardForm ({userEmail, setAddBankCard, setCreditCard}) {


 //!!!!!!!!!!!!!!!!!!! СТРАННЫЙ БАГ, ПРИ ПЕРЕХОДЕ ИЗ ФОРМЫ ЗАКАЗА БИЛЕТА КАРТА НЕ ПОДГРУЖАЕТСЯ ПРИ ЗАПОЛНЕНИИ 

   useEffect(()=> {
      if(userEmail){
         setEmail(userEmail)
      }else{
         axios.get('http://localhost:3000/user')
         .then(result => setEmail(result.data.email) )
         .catch(e => console.log(e))
      }
   }, [])


   const [cardData, setCardData] = useState(null)
   const [email, setEmail] = useState(null)

   const [holderName, setHolderName] = useState('')
   const [cardNumber, setCardNumber] = useState('')
   const [expireDate] = useState('21/30')
   const [loading, setLoading] = useState(false)
   const [cardError, setCardError] = useState(true)
   

   const dispatch = useDispatch()
   
   useEffect(() => {
      if(cardNumber.length === 15){
         const options = {
            method: 'POST',
            url: 'https://bin-ip-checker.p.rapidapi.com/',
            params: {bin: `${cardNumber}`},
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': X_RAPID_API_KEY,
              'X-RapidAPI-Host': X_RAPID_API_HOST
            },
          };
          
          axios.request(options)
          .then(response => {
               setCardData(response.data)
            if( 
               response.data.BIN.issuer.name.split(' ').join('') === 'CJSCALFA-BANK'
               || response.data.BIN.issuer.name.split(' ').join('').substring(34,42) === 'SBERBANK'
               || response.data.BIN.issuer.name.split(' ').join('') === 'GAZPROMBANKOJSC' 
               || response.data.BIN.issuer.name.split(' ').join('') === 'TINKOFFBANK' 
               || response.data.BIN.issuer.name.split(' ').join('') === 'VNESHTORGBANK' 
               || response.data.BIN.issuer.name.split(' ').join('') === 'CBOTKRITIECJSC' 
               || response.data.BIN.issuer.name.split(' ').join('') === 'JSCBROSBANK' 
            )
           {
            setCardError(false)
           }else{
            dispatch(setMessage('Карта не поддерживается')) 
            dispatch(setColor('rgb(208, 97, 97)'))
            setCardError(true)
            setTimeout(()=> {
              dispatch(removeMessage())
              dispatch(removeColor())
           }, 3000)
           }
            
           
          })
        
          .catch(err =>  {
             dispatch(setMessage('Карта не поддерживается')) 
             dispatch(setColor('rgb(208, 97, 97)'))
             setCardError(true)
             setTimeout(()=> {
               dispatch(removeMessage())
               dispatch(removeColor())
            }, 3000)
          })
   }
   }, [cardNumber])


   const cardNumberHandler = event => {
         setCardNumber((event.target.value).replace(/\D/g,'').substr(0,16))
   }

    const holderNameHandler = event => {
      
         setHolderName((event.target.value).replace(/[а-яё]+/i, ""))
      
    }

    const handleSubmit = event => {
      event.preventDefault()
      setLoading(true)
      
      const configuration = {
         method:'post',
         url:'http://localhost:3000/add_card',
         data:{
            email,
            cardNumber:cardNumber.trim(),
            holderName:holderName.trim(),
            bankName: 
            cardData.BIN.issuer.name.split(' ').join('').substring(34,42) === "SBERBANK" 
            ? cardData.BIN.issuer.name.split(' ').join('').substring(34,42)
            : cardData.BIN.issuer.name.split(' ').join('')
            ,

            brand:cardData.BIN.brand.split(' ').join('')
         }
      }

      axios(configuration)
      .then(result => {
         dispatch(setMessage(`${result.data.message}`))
         dispatch(setColor(`${result.data.color}`))
         if(result.data.message === 'Вы успешно привязали карту'){
            setAddBankCard(false)
            if(window !== undefined){
               localStorage.setItem('AiW_Credit_Card', `${cardNumber.trim()}` )
               setCreditCard(localStorage.getItem('AiW_Credit_Card'))
            }
           
         }
      })
      .then(
         setTimeout(()=> {
            dispatch(removeMessage())
            dispatch(removeColor())
         }, 3000)
      )
      .catch(err => {
         console.log(err)
      })
      .finally(() => setLoading(false))
   }



   return(
      <div className={styles.container} >
       <Card
         bank={
            cardData
            ?
            cardData.BIN.issuer.name.split(' ').join('').substring(34,42) === 'SBERBANK'

               ? styles[cardData.BIN.issuer.name.split(' ').join('').substring(34,42)]
               : styles[cardData.BIN.issuer.name.split(' ').join('')]
            : null
         }
         
         brand={
            cardData
            ?  styles[cardData.BIN.brand.split(' ').join('')]
            : null
          }
         cardNumber={cardNumber}
         holderName={holderName}
         expire={expireDate}
       />
         <form
         onSubmit={handleSubmit}
         >
         <Input
            autoFocus={true}
            type="number"
            label="Номер карты"
            value={cardNumber}
            onChange={cardNumberHandler}
            maxLength={16}
            onPaste={true}
         />
         <Input
            type='text'
            name='name'
            label='Ваше имя'
            value={holderName}
            onChange={holderNameHandler}
         />
         <button 
         disabled={loading || cardNumber.length < 16 || holderName === ''|| cardError
         }  
         className={ 
            loading || 
            cardNumber.length < 16 || 
            holderName === '' || 
            cardError ? styles.button__disabled :  styles.button  
         } 
         type="submit" 
         >{loading ? <Loader/> : 'Привязать'}</button>
         </form>
         
      </div>
   )
}