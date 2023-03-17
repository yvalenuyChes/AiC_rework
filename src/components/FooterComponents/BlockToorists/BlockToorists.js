import classes from './BlockToorists.module.scss'

export default function BlockToorists() {
	return (
		<div>
			<h2 className={classes.footer__title}>Туристам</h2>
			<ul className={classes.footer__list}>
				<li className={classes.footer__list_item}><a href="##">Пользовательское соглашение</a></li>
				<li className={classes.footer__list_item}><a href="##">Правила покупки</a></li>
				<li className={classes.footer__list_item}><a href="##">Частые вопросы</a></li>
				<li className={classes.footer__list_item}><a href="##">Туры в рассрочку</a></li>
				<li className={classes.footer__list_item}><a href="##">Страхование</a></li>
				<li className={classes.footer__list_item}><a href="##">Правила распространения и <br /> использования промокодов и/или купонов</a></li>
				<li className={classes.footer__list_item}><a href="##">Соглашение о конфиденциальности</a></li>
			</ul>
		</div>
	)
}