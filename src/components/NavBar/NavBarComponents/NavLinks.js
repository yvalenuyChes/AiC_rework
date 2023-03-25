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

export function KanadaPageTransitions() {

	const dispatch = useDispatch()

	return (
		<ul>
			<li
				className="navMobileLink"
				onClick={() => dispatch({ type: 'TOGGLE_NAV' })}
			>
				<Link
					href='/kanada/'>
						Канада
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => dispatch({ type: 'TOGGLE_NAV' })}
			>
				<Link
					href='/kanada/#kanada_kitchen'>
						Кухня
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => dispatch({ type: 'TOGGLE_NAV' })}
			>
				<Link
					href='/kanada/#kanada_interesting_places'>
						Достопримечательности
				</Link>
			</li>
		</ul>
	)
}