import { useDispatch } from 'react-redux'

import {Tabs} from '../../../Tabs/Tabs'
import { togglePopup } from '@/redux/slices/openPopup'

import styles from './NavModalBody.module.scss'


function ModalBody() {

	const dispatch = useDispatch()

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
					<Tabs/>
				</div>
			</div>
		</>
	)


}
export default ModalBody