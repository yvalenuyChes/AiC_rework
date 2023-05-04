import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthTrue } from '@/redux/slices/isAuth'
import Loader from '@/components/Loader/Loader'
import Cookies from 'universal-cookie'
import axios from "axios"
import Input from '../../Input/Input'
import { togglePopup } from '@/redux/slices/openPopup'
import styles from './styles.module.scss'
import { removeColor, removeMessage, setColor, setMessage } from '@/redux/slices/AppMessage'
import Link from 'next/link'



export const LoginTab = () => {

	const [serverError, setServerError] = useState(null)
   const [loading, setLoading] = useState(false)

	const cookies = new Cookies()
   const dispatch = useDispatch()

	const [values, setValues] = useState({
		email:'',
		password:''
	})

	const {email, password} = values


	const handleChange = name => event => {
      setValues({
         ...values,
         error: false,
         [name]: event.target.value
      })
   }

	function handleSubmit(event) {
      setLoading(true),
      event.preventDefault()

		 const configuration = {
			method: "post",
			url: "http://localhost:3000/login",
			data: {
			   email:email.toLowerCase().trim(),
				password: password.trim(),
			 },
		 }
		 axios(configuration)
		 .then(result => {
			 cookies.set('TOKEN', result.data.token, {
				 path:'/',
			 })
          dispatch(setMessage(`${result.data.message}`))
          dispatch(setColor(`${result.data.color}`))
		 })

		.then(() => {
			dispatch(setAuthTrue())
			dispatch(togglePopup())
		})

      .then(setTimeout(()=> {
         dispatch(removeMessage())
         dispatch(removeColor())
      }, 3000))

		 .catch(err => setServerError(err.response.data.message))

       .finally(() => setLoading(false))
   }



   return(
      <form
         method="POST"
         className={styles.tab_form}
         onSubmit={handleSubmit}
      >
         <div className={styles.inputBox}>
            <Input
               label="Введите e-mail"
               type="email"
               name="authEmail"
               inputMode="email"
               value = {email}
               onChange= {handleChange('email')}
            />
         </div>
         <div className={styles.inputBox}>
            <Input
               label="Введите пароль"
               type="password"
               name="authPassword"
               inputMode="text"
               value={password}
               onChange={handleChange('password')}
            />
         </div>
         {

         }
            <button
               type="submit"
               disabled={loading || email === '' || password === '' }
               className={
                  loading || email === '' || password === '' 
                  ?  styles.tab_button_disabled   
                  : styles.tab_button
               }
            >{ loading ? <Loader/> : 'Войти' }</button>

         <div onClick={() => dispatch(togglePopup())}  >
            <Link href="/reset-password" className={styles.tab_link} >Я забыл пароль</Link>
         </div> 
         <div className={styles.popup__errors}>
            {serverError}
         </div>
      </form>
   )
}