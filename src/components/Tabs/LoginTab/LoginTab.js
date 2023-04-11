import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthTrue } from '@/redux/slices/isAuth'
import Loader from '@/components/Loader/Loader'
import Cookies from 'universal-cookie'
import axios from "axios"
import Input from '../../Input/Input'
import { togglePopup } from '@/redux/slices/openPopup'
import styles from './styles.module.scss'



export const LoginTab = () => {

	const [serverError, setServerError] = useState(null)
   const [loading, setLoading] = useState(false)

	const cookies = new Cookies()
   const dispatch = useDispatch()

	async function login(){
      setLoading(true)
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

		.then(() => {
			dispatch(setAuthTrue())
			dispatch(togglePopup())
			
		})

		 .catch(err => setServerError(err.response.data.message))

       .finally(setLoading(false))
	 }




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

	const handleSubmit = event => {
      event.preventDefault()
      login()
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
            <button
               type="submit"
               className={styles.tab_button}
            >{ loading ? <Loader/> : 'Войти' }</button>

         <a href="##" className={styles.tab_link}>Я забыл e-mail или пароль</a>
         <div className={styles.popup__errors}>
            {serverError}
         </div>
      </form>
   )
}