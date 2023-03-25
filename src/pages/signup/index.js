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
      password:''
   })

   const {name, email, password  } = values

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
            name: values.name,
            email:values.email,
            password: values.password,
         }
      }

      axios(configuration)
      .then(result => console.log(result))
      .catch(err => console.log(err))
   }


   return(
      <MainPage>
         <Head>
             <title>Регестрация</title>
         </Head>
         <form
            method="POST"
            onSubmit={handleSubmit}
            className={styles.container}
         >
            <div className={styles.inputBox}>
               <Input
                  label="Введите e-mail"
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={handleChange('email')}
               />
            </div>
            <div className={styles.inputBox}>
               <Input
                  label="Введите свое имя"
                  type="text"
                  value={name}
                  onChange={handleChange('name')}
               />
            </div>
            <div className={styles.inputBox}>
               <Input
                  label="Введите пароль"
                  type="password"
                  value={password}
                  onChange={handleChange('password')}
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
               <button
						type="submit"
						className={styles.tab_button}
					>Зарегистрироваться</button>
         </form>
        
      </MainPage>
   )
}

export default signupPage