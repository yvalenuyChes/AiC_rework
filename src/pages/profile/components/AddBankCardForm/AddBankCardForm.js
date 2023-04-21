import { useEffect, useState } from "react"
import styles from './styles.module.scss'
import axios from "axios"
import Card from "../../../../components/Card/Card"
import Input from "@/components/Input/Input"
import { X_RAPID_API_HOST, X_RAPID_API_KEY } from "@/keys"
import { useDispatch } from "react-redux"
import { setColor, setMessage, removeColor, removeMessage } from "@/redux/slices/AppMessage"

export const AddBankCardForm = ({userEmail}) => {
   const [cardData, setCardData] = useState(null)

   const [holderName, setHolderName] = useState('')
   const [cardNumber, setCardNumber] = useState('')
   const [expireDate] = useState('21/30')

   const dispatch = useDispatch()
   
   useEffect(() => {
      if(cardNumber.length === 6){
         const options = {
            method: 'POST',
            url: 'https://bin-ip-checker.p.rapidapi.com/',
            params: {bin: `${cardNumber}`},
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': X_RAPID_API_KEY,
              'X-RapidAPI-Host': X_RAPID_API_HOST
            },
            data: '{"bin":"448590"}'
          };
          
          axios.request(options)
          .then(function (response) {
            setCardData(response.data)
          })
          .catch(function (error) {
             console.error(error)
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
      // setLoading(true)
      
      const configuration = {
         method:'post',
         url:'http://localhost:3000/add_card',
         data:{
            email: userEmail,
            cardNumber,
            holderName,
            bankName: cardData.BIN.issuer.name.split(' ').join(''),
            brand:cardData.BIN.brand.split(' ').join('')
         }
      }

      axios(configuration)
      .then(() => 
         dispatch(setMessage('Вы успешно привязали карту')),
         dispatch(setColor('rgb(47, 160, 47)'))
      )
      .then(setTimeout(()=> {
         dispatch(removeMessage())
         dispatch(removeColor())
      }, 3000))
      .catch(err => {
      console.log(err)
      })
      // .finally(setLoading(false))
   }



   return(
      <div className={styles.container} >
       <Card
         bank={
            cardData 
            ? styles[cardData.BIN.issuer.name.split(' ').join('')]
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
         <button type="submit" >Привязать</button>
         </form>
         
         <div className={styles.card} >
            <div>

            </div>
         </div>
         
      </div>
   )
}