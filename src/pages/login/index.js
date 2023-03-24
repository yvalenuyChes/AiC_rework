import {  useState } from 'react'
import Cookies from 'universal-cookie'
import axios from "axios"


export default function Signin(){

   const cookies = new Cookies()


  async function login(){
      const configuration = {
         method: "post",
         url: "http://localhost:3000/login",
         data: {
           email,
           password,
         },
      }
      axios(configuration)
      .then(result => {
         cookies.set('TOKEN', result.data.token, {
            path:'/',
         })
      })
      .catch(err => console.log(err))

   }

   const [values, setValues] = useState({
      email:'',
      password:''
   })

   const { email, password  } = values

   const handleChange = name => event => {
      setValues({
         ...values,
         [name]: event.target.value
      })
   }

   const handleSubmit = event => {
      event.preventDefault()
      login()
   }


   return(
      <div>
         <form method="POST" onSubmit={handleSubmit} >
            <input value={email} onChange={handleChange('email')} />
            <input value={password} onChange={handleChange('password')} />
            <button type="submit" >Send</button>
         </form>
      </div>
   )
}