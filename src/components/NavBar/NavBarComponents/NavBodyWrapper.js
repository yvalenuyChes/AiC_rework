import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBody from './navBody'
import {toggleNavOpen} from '../../../redux/slices/openNav'
import styles from './NavBarComponents.module.scss'



export default function NavBodyWrapper() {

	const navOpen = useSelector(state => state.navOpen.navOpen)
	const dispatch = useDispatch()

	useEffect(() => {
		if (navOpen) {
			document.body.classList.add('bodyLock')
		} else {
			document.body.classList.remove('bodyLock')
		}
	}, [navOpen])

	useEffect(() => {
		const wrapper = document.querySelector('.wrapper')
		if (navOpen) {
			wrapper.classList.add('blur')
		} else {
			wrapper.classList.remove('blur')
		}
	}, [navOpen])

	return (
		<>
			<div
				className={navOpen ? `${styles.nav__button + ' ' + styles.active}` : `${styles.nav__button}`  }
				onClick={() => {dispatch(toggleNavOpen())}}
				role="button"
				tabIndex={0}
			>
				<span />
			</div>
			<NavBody />
		</>
	)
}