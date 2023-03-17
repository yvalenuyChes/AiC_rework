import classes from './InfoLinks.module.scss'

export default function InfoLinks() {
	return (
		<div className={classes.footer__listLinks}>
			<h2 className={classes.footer__title}>О компании</h2>
			<ul className={classes.footer__list}>
				<li className={classes.footer__list_item}><a href="##">Офисы продаж</a></li>
				<li className={classes.footer__list_item}><a href="##">О нас</a></li>
				<li className={classes.footer__list_item}><a href="##">Отзывы о нас</a></li>
				<li className={classes.footer__list_item}><a href="##">Наши партнеры</a></li>
				<li className={classes.footer__list_item}><a href="##">Контакты</a></li>
			</ul>
		</div>
	)
}