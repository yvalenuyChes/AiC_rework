import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '@mui/material';
// import { useRouter } from "next/dist/client/router"
import Link from 'next/link'
import { MainPageTransitions, KanadaPageTransitions } from './navLinks'
import AccordionBlock from '../../Accardion/Accardion'
import ModalBody from './ModalWindow/NavModalBody'
import { toggleNavOpen } from '@/redux/slices/openNav'
import { togglePopup } from '@/redux/slices/openPopup'
// import { isAuth , signout} from '../../../../actions/auth'
import styles from './NavBarComponents.module.scss'



export default function NavBody() {

	// const router = useRouter()

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
					<AccordionBlock
						title="Канада"
						content={<KanadaPageTransitions />}
					/>
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
				{/* {isAuth() ?
					<div
						onClick={ () => signout(() => router.push('/'))}
						id="auth"
					>Выйти</div>
					:
						<div
						onClick={() => dispatch({ type: 'OPEN_MODAL_WINDOW' }, { type: 'NAV_OPEN' })}
						id="auth"
					>Авторизация</div>
				} */}
					<div
						onClick={ PopupHandler}
						id="auth"
					>Авторизация
					</div>
					
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