import classes from './styles.module.scss'
import Input from '../../Input/Input'

export default function PlaneTicketForm(
	{
		sliderTitle,
		sliderBackground
	}
) {
	return (
		<form
			className={`${classes.slider__item} ${sliderBackground}`}
			method="POST"
			action="/order_plane_ticket"
		>
			<div className={classes.container}>
				<h2 className={classes.slider__title}>{sliderTitle}</h2>
				<div className={classes.selectCountrie}>
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
					<div className={classes.orderToorBlock}>
						<Input
							type="text"
							label="Откуда отправляетесь"
							name="departure_point_plane"
						/>
						<Input
							type="text"
							label="Отбытие"
							name="departure_point_plane"
						/>
						<Input
							type="text"
							label="Когда вернетесь"
							name="departure_point_plane"
						/>
					</div>
					<div className={classes.orderToorBlock}>
						<Input
							type="text"
							label="Сколько взрослых"
							name="departure_point_plane"
						/>
						<Input
							type="text"
							label="Сколько детей"
							name="departure_point_plane"
						/>
					</div>
				</div>
				<div className={`${classes.tabButton} ${classes.orderButton}`}>
					<button type="submit">Заказать билет</button>
				</div>
			</div>
		</form>
	)
}