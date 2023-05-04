import Input from "@/components/Input/Input";
import MainPage from "@/layout/MainPage";
import { setColor, setMessage } from "@/redux/slices/AppMessage";
import axios from "axios";
import { useState} from "react";


export default function ResetPassword(){

   const [user, setUser] = useState(null)
   const [email, setEmail] = useState('')
   const [code, setCode] = useState('')
   const [serverMessageCheckCode, setServerMessageCheckCode] = useState(null)
   const [validCode, setValidCode] = useState(false)
   const [newPassword, setNewPassword] = useState('')

   const findEmail = event => {
      event.preventDefault()

      const configuration = {
         method:'post',
         url:'http://localhost:3000/send_reset_password_code',
         data:{
            email
         }
      }

      axios(configuration)
      .then(user => {
         setUser(user)
      })
      .catch(err => {
         console.log(err)
         setMessage(err.name)
      })
   }

   const checkCode = event => {
      event.preventDefault()
      const configuration = {
         method:'post',
         url:'http://localhost:3000/verify-reset-password-code',
         data:{
            email,
            send_code:code
         }
      }

      axios(configuration)
      .then(result => {
         setServerMessageCheckCode(result.data.message)
         setValidCode(result.data.isCkecked)
      })
      .catch(err => {
         console.log(err)
      })
   }

   const sendNewPassword = event => {
      event.preventDefault()

      const configuration = {
         method:'post',
         url:'http://localhost:3000/change-password',
         data:{
            email,
            newPassword
         }
      }

      axios(configuration)
      .then(result => {
         setMessage(result.data.message)
         setColor(result.data.color)
      })
      .catch(err => {
         console.log(err)
      })
   }





   return(
      <MainPage>
 <div>
         <form onSubmit={findEmail} >
            <h3>Введите Вашу почту</h3>
            <Input
               value={email}
               onChange={event => setEmail(event.target.value)}
            />
            <button type="'submit"  >Продолжить</button>
         </form>
        {
         user
         ?
         <form onSubmit={checkCode} >
            <h2>
               Введите проверочный код
            </h2>
            <Input
               value={code}
               onChange={event => setCode(event.target.value)}
            />
            <button type='submit' >Отправить код</button>
            {
               serverMessageCheckCode
            }
         </form>
         : null
        }

        {
            validCode
            ? 
            <form onSubmit={sendNewPassword} >
               <h3>
                  Введите новый пароль
               </h3>
               <Input
                  value={newPassword}
                  onChange={event => setNewPassword(event.target.value)}
               />
               <button>Изменить пароль</button>
            </form>

            : null
        }
      </div>
      </MainPage>
     
   )
}