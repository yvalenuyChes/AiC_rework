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
					href='/cities/moscow#moscow_order_ticket'>
						Москва
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/saint_petersburg#spb_order_ticket'>
						Санкт-Петербург
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/viborg#viborg_order_ticket'>
						Выборг
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/kazan#kazan_order_ticket'>
						Казань
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/sochi#sochi_order_ticket'>
						Сочи
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/barnayl#barnayl_order_ticket'>
						Барнаул
				</Link>
			</li>
		</ul>
	)
}