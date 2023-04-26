import { useDispatch } from 'react-redux'
import Link from 'next/link'
import {toggleNavOpen} from '../../../redux/slices/openNav'
import styles from './NavBarComponents.module.scss'

export function MainPageTransitions() {

	const dispatch = useDispatch()

	return (
		<ul className="navMobileList">
			<li
				className={styles.navMobileLink}
				onClick={() => {dispatch(toggleNavOpen())}}
				>
				<Link
					href='/'>
						Главная
				</Link>
			</li>
			<li
				className={styles.navMobileLink}
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/#toor_order'>
				Заказ билета
				</Link>
			</li>
			<li
				className={styles.navMobileLink}
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/#advantages'>
						Преимущества фирмы
				</Link>
			</li>
			<li
				className={styles.navMobileLink}
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/#footer'>
						Дополнительная информация
				</Link>
			</li>
		</ul>

	)
}

export function OrderTicketTransition() {

	const dispatch = useDispatch()

	return (
		<ul>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/moskow#order_ticket'>
						Москва
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='saint_petersburg#order_ticket'>
						Санкт-Петербург
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => dispatch({ type: 'TOGGLE_NAV' })}
			>
				<Link
					href='/viborg#order_ticket'>
						Выборг
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => dispatch({ type: 'TOGGLE_NAV' })}
			>
				<Link
					href='/kazan#order_ticket'>
						Казань
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => dispatch({ type: 'TOGGLE_NAV' })}
			>
				<Link
					href='/sochi#order_ticket'>
						Сочи
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => dispatch({ type: 'TOGGLE_NAV' })}
			>
				<Link
					href='/barnayl#order_ticket'>
						Барнаул
				</Link>
			</li>
		</ul>
	)
}