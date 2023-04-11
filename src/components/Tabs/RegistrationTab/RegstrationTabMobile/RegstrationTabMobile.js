import  { useState } from 'react'
import Input from "@/components/Input/Input"
import Loader from "@/components/Loader/Loader"
import styles from './styles.module.scss'

export const RegstrationTabMobile = () => {

   const [accept, setAccept] = useState(false)

   const [values, setValues] = useState({
      name:'',
      email:'',
      password:'',
      repeatPassword:''
   })


   const [errors, setErrors] = useState({
      email:true,
      password:true,
      name:true,
      repeatPassword:true
   })

   const [loading, setLoading] = useState(false)

   const {name, email, password, repeatPassword  } = values

   const [serverResult, setServerResult] = useState('')
   const  [serverError, setServerError ]= useState('')

   const handleChange = name => event => {
      setValues({
         ...values,
         [name]: event.target.value
      })
   }

   function handleSubmit(event) {
      setLoading(true),
      event.preventDefault()
      const configuration = {
         method:'post',
         url:'http://localhost:3000/signup',
         data:{
            name: values.name.trim(),
            email:values.email.trim(),
            password: values.password.trim(),
         }
      }

      axios(configuration)
      .then(result => 
         setServerResult(result.data.message), 
         setServerError(null), 
      )
      .catch(err => {
         setServerError(err.response.data.message)
      })
      .finally(() => setLoading(false))
   }


   const validateEmail = (value) => {
      if(!new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value))
      {
         errors.email = true
      }else{
         errors.email = false
      }
   }

   const validateName = (value) => {
      if(value.length < 4)
      {
         errors.name = true
      }else{
         errors.name = false
      }
   }

   const validatePassword = (value) => {
      if(value.length < 8)
      {
         errors.password = true
      }else{
         errors.password = false
      }
   }
   
   const validateRepeatPassword = (value) => {
      if(password === value &&  value !== '')
      {
         errors.repeatPassword = false
      }else{
         errors.repeatPassword = true
      }
   }

   const handleButton = () => {
      if(serverResult){
         setValues({
            email:'',
            password:'',
            name:'',
            repeatPassword:''
         })
      }
   }

 

   return(
         <form
         method='POST'
         >
              <div className={styles.inputBox}>
               <Input
                  label="Введите e-mail"
                  name='email'
                  type="email"
                  inputMode="email"
                  value={email}
                  onBlur={validateEmail(email)}
                  onChange={handleChange('email')}
                  required
               />
            </div>
<div className={styles.inputBox}>
               <Input
                  label="Введите свое имя"
                  type="text"
                  value={name}
                  onChange={handleChange('name')}
                  onBlur={validateName(name)}
               />
            </div>
            <div className={styles.inputBox}>
               <Input
                  label="Введите пароль"
                  type="password"
                  value={password}
                  onBlur={validatePassword(password)}
                  onChange={handleChange('password')}

               />
            </div>
            <div className={styles.inputBox}>
               <Input
                  label="Повторите свой пароль"
                  type="password"
                  value={repeatPassword}
                  onChange={handleChange('repeatPassword')}
                  onBlur={validateRepeatPassword(repeatPassword)}
               />
            </div>
            <div className={styles.recover} >
						<label 
                  onClick={() => setAccept(!accept)} 
                  className={
                     accept
                     ? styles.signin_label + ' ' + styles.accepted
                     : styles.signin_label
                  } 
                  htmlFor="ckbox"
                  >Ознакомлен и принимаю <br/>
                     <a className={styles.signin_label__link} href="##"> условия регистрации</a>
                  </label>
					</div>
               {
                  errors.email 
                  || errors.name 
                  || errors.password 
                  || !accept
                  || errors.repeatPassword
                  ? <button
                  type="submit"
                  disabled
                  className={styles.tab_button_disabled}
                  >Зарегистрироваться</button>
                  :<button
                  type="submit"
                  className={styles.tab_button}
                  onClick={() => handleButton}
                  >{loading ? <Loader/> : 'Зарегистрироваться'}</button>
               }
                  {
                     serverResult 
                     ? <div 
                        className={styles.server_response}
                        > Вы успешно зарегистрировались, пожалуйста войдите в систему 
                     </div>
                     : null
                     
                  }
                  {
                     serverError
                     ? <div className={`${styles.server_response + ' ' + styles.err }`}>{serverError}</div>
                     : null
                  }
         </form>
   )
}