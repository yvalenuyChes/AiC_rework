import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
// import { signin, authenticate } from '../../../../actions/auth'
import Input from '../../../Input/Input'
import { togglePopup } from '@/redux/slices/openPopup'
import styles from './NavModalBody.module.scss'

function ModalBody() {

	// const router = useRouter()

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


	// function handleSubmit(event) {
   //    event.preventDefault()

   //    setValues({ ...values, loading: true, error: false })
   //    const user = { email, password }

   //    signin(user).then(data => {
   //       if (data.error) {
   //          setValues({ ...values, error: data.error, loading: false })
   //          console.log(data.error);
   //       } else {
   //          authenticate(data, () => {
	// 				router.push(`/`)
   //          })

   //       }
   //    })

   // }

	return (
		<>
			<div
				className={styles.popup__body}
			>
				<div
					className={styles.popup__content}
				>
					<span
						role="button"
						className={styles.popup__close}
						onClick={() => dispatch(togglePopup())}
					/>
					<div className={styles.popup__title}>Добро пожаловать</div>
					<div className={styles.popup__main} />
					<form
						method="POST"
						className={styles.tab_form}
						// onSubmit={handleSubmit}
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
						>Войти</button>
						<a href="##" className={styles.tab_link}>Я забыл e-mail или пароль</a>


						<p className={styles.registration_link}>Нет аккаунта?
						 <Link href="/registration">
							<p className={styles.tab_linkReg}> 
						 	Зарегистируйтесь
							</p>
						 </Link>
						 </p>
					</form>
				</div>
			</div>
		</>
	)


}
export default ModalBody