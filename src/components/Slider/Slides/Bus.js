import styles from './styles.module.scss'
import Input from '../../Input/Input'

export default function BusTicketForm(
	{
		sliderTitle,
		sliderBackground
	}
) {
	return (
		<form
			className={`${styles.slider__item} ${sliderBackground}`}
			method="POST"
			action="/order_bus_ticket"
		>
			<div className={styles.container}>
				<h2 className={styles.slider__title}>{sliderTitle}</h2>
				<div className={styles.selectCountrie}>
					<h3>Выберете место прибытия</h3>
					<select>
						<option value="Нидерланды">Нидерланды</option>
						<option value="Мальдивы">Мальдивы</option>
						<option value="Венгрия">Венгрия</option>
						<option value="Мрамрный каньон">Мрамрный каньон</option>
						<option value="Нью-Йорк">Нью-Йорк</option>
						<option value="Канада">Канада</option>
					</select>
				</div>
				<div>
					<div className={styles.orderToorBlock}>
						<Input
							type="text"
							label="Откуда отправляетесь"
							name="departure_point_bus"
						/>
						<Input
							type="date"
							label="Отбытие"
							name="departure_date_bus"
						/>
						<Input
							type="date"
							label="Когда вернетесь"
							name="return_date_bus"
						/>
					</div>
					<div className={styles.orderToorBlock}>
						<Input
							type="text"
							label="Сколько взрослых"
							name="adult_count_bus"
						/>
						<Input
							type="text"
							label="Сколько детей"
							name="children_count_bus"
						/>
					</div>
				</div>
				<div className={`${styles.tabButton} ${styles.orderButton}`}>
					<button type="submit">Заказать билет</button>
				</div>
			</div>
		</form>
	)
}