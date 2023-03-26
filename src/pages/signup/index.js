const { useState } = require("react")
import Input from "@/components/Input/Input"
import MainPage from "@/layout/MainPage"
import axios from "axios"
import Head from "next/head"
import styles from './styles.module.scss'

const signupPage = () => {
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

   const {name, email, password, repeatPassword  } = values

   const handleChange = name => event => {
      setValues({
         ...values,
         [name]: event.target.value
      })
   }

   function handleSubmit(event) {
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
      .then(result => console.log(result))
      .catch(err => console.log(err))
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

 



   return(
      <MainPage>
         <Head>
             <title>Регистрация</title>
         </Head>
         
         <form
            method="POST"
            onSubmit={handleSubmit}
            className={styles.container}
         >
            <div className={styles.errorsField} >
               <div className={styles.errorsField__container}>
                  <h3 className={styles.errorsField__title} > Заполните поля формы</h3>
                  <div className={
                     `
                     ${
                        errors.email
                        ? styles.errorsField__item + ' ' + styles.errors
                        : styles.errorsField__item
                     }
                     
                     `
                     }>Электронная почта
                     {
                        errors.email
                        ? null
                        : <span className={styles.errorsField__item_tip}/>
                     }
                     
                     </div>
                  <div className={`
                 ${
                  errors.name
                  ? styles.errorsField__item + ' ' + styles.errors
                  : styles.errorsField__item
                 }
                 `}>Имя
                 {
                        errors.name
                        ? null
                        : <span className={styles.errorsField__item_tip}/>
                  }
                 </div>
                  <div 
                  className={
                    errors.password
                    ? styles.errorsField__item + ' ' + styles.errors
                    : styles.errorsField__item
                  }


                  >{errors.password ? 'В пароле должно быть минимум 8 символов' : 'Пароль корректен'}
                   {
                        errors.password
                        ? null
                        : <span className={styles.errorsField__item_tip}/>
                  }
                  </div>
                  <div className={
                     `
                     ${
                        errors.repeatPassword
                        ? styles.errorsField__item + ' ' + styles.errors
                        : styles.errorsField__item 
                     }
                     
                     `
                     }>
                        {errors.repeatPassword ? 'Пароли не совпадают' : 'Пароли совпадают' }
                     {
                        errors.repeatPassword
                        ? null
                        :   <span className={styles.errorsField__item_tip}/>
                     }
                     
                     </div>
               </div>
            </div>
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
                  >Зарегистрироваться</button>
               }
         </form>
        
      </MainPage>
   )
}

export default signupPage