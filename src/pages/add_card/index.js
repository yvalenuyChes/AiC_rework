import { useEffect, useState } from "react"
import styles from './styles.module.scss'
import axios from "axios"
import Card from "./components/Card/Card"
import Input from "@/components/Input/Input"



export default function AddCreditCard(){

   const [cardData, setCardData] = useState(null)

   const [holderName, setHolderName] = useState('Vladislav Zaporozhets')
   const [cardNumber, setCardNumber] = useState('')
   const [expireDate, setExpireDate] = useState('21/30')
   
   useEffect(() => {
      if(cardNumber.length === 6){
         const options = {
            method: 'POST',
            url: 'https://bin-ip-checker.p.rapidapi.com/',
            params: {bin: `${cardNumber}`},
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
              'X-RapidAPI-Host': process.env.X_RAPID_API_HOST
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

   return(
      <div className={styles.container} >
       <Card
         // bank={styles[cardData.bank]}
         brand={
            cardData
            ?  styles[cardData.BIN.brand.split(' ').join('')]
            : null
         
          }
         cardNumber={cardNumber}
         holderName={holderName}
         expire={expireDate}
       />
         <form>
         <Input
            type="number"
            label="Номер карты"
            value={cardNumber}
            onChange={cardNumberHandler}
            maxLength={16}
         />
         </form>
         <Input
            type='text'
            name='name'
            label='Ваше имя'
            value={holderName}
            onChange={holderNameHandler}
         />
         <div className={styles.card} >
            <div>

            </div>
         </div>
         
      </div>
   )
}