import SliderBlock from '../../components/Slider/Slider'
import styles from './OrderTicket.module.scss'

export default function OrderTicket() {
	return (
		<section className={styles.orderToor} id="toor_order">
			<div className={`${styles.orderToor__title} ${styles.title}`}>
				<h2>Заказать билет</h2>
			</div>
			<div className={styles.orderToor__body}>
				<SliderBlock />
			</div>

		</section>
	)
}