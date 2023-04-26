import Loader from "@/components/Loader/Loader"
import { useState, useEffect } from "react"
import axios from "axios"
import { Ticket } from "../profile/components/Ticket/Ticket"



export default function UsedTickets(){

   const [userData, setUserData] = useState(null)

   useEffect(()=>{
      axios.get('http://localhost:3000/user')
      .then(result => setUserData(result.data) )
      .catch(e => console.log(e))
}, [])

   


   return(
      <div>
         {
            userData
            ?
               userData.tickets  !==  0
               ?  userData.tickets.map((ticket, key) => {
                  if(ticket.dateCome < new Date()){
                     return(
                        <Ticket
                        city={ticket.name}
                        personNumber={ticket.personNumber}
                        dateFrom={ticket.dateFrom}
                        dateCome={ticket.dateCome}
                        price={ticket.price}
                        key={key}
                       />
                     )
                  }else{
                     null
                  }
                 
               })
              

               : <div>Нет использованных билетов</div>
            : <Loader/>
         }
      </div>
   )
}