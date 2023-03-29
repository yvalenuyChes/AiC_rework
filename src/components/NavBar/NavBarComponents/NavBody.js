import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '@mui/material';
import Cookies from 'universal-cookie'
import { useRouter } from "next/dist/client/router"
import Link from 'next/link'
import { MainPageTransitions } from './navLinks'
import AccordionBlock from '../../Accardion/Accardion'
import ModalBody from './ModalWindow/NavModalBody'
import { toggleNavOpen } from '@/redux/slices/openNav'
import { togglePopup } from '@/redux/slices/openPopup'
import styles from './NavBarComponents.module.scss'



export default function NavBody() {

	const router = useRouter()

	const cookies = new Cookies()
	const [isLogin, setLogin] = useState(false)

	const logout = () => {
		cookies.remove('TOKEN', {path: '/'})
		dispatch(toggleNavOpen())
	}

	useEffect(()=> {
		const token = cookies.get('TOKEN')
		if(token){
			setLogin(true)
		}
	}, [isLogin])


	const navOpen = useSelector(state => state.navOpen.navOpen)
	const popupOpen = useSelector(state => state.openPopup.openPopup)
	const dispatch = useDispatch()

	function PopupHandler (){
		dispatch((toggleNavOpen()))
		dispatch((togglePopup()))
	}

	return (
		<div className={navOpen ? `${styles.nav_phones__body + ' ' + styles.active}` : `${styles.nav_phones__body}`}>
			<div className={styles.nav_phones__body_itemWrapper}>
				<div className={styles.nav_phones__body_item}>
					<AccordionBlock
						title="Главная"
						content={<MainPageTransitions />}
					/>
				</div>
				<div className={styles.nav_phones__body_item}>
				</div>
				<div
					onClick={() => dispatch(toggleNavOpen())}
					className={`${styles.nav_phones__body_item}`}
				>
					<Link href="/personal_office">
						Личный кабинет
					</Link>
				</div>
				<div className={`${styles.nav_phones__body_item + ' ' + styles.login}`}>
				{isLogin 
				?
					<div
						onClick={ () => logout()}
						id="auth"
					>Выйти</div>
				:
						<div
						onClick={ PopupHandler}
						id="auth"
					>Авторизация</div>
				}				
					<Modal
						open={popupOpen}
					>
						<ModalBody />
					</Modal>
				</div>
			</div>
		</div >
	)
}