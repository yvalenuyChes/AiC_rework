import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

import styles from './MainContentImage.module.scss'
import { useSelector } from 'react-redux'

export default function MainContentImg({ 
	limiter, 
	imgSrc, 
	title, 
	content__text_subtitle, 
	value, 
	link
}) {

	const isLogin = useSelector(state => state.isAuth.isAuth)

	const [price, setPrice] = useState()


	const RUB_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
	async function getRubValue() {
		const dataRub = await axios.get(RUB_URL)
		setPrice(Math.floor(dataRub.data.Valute.USD.Value))
	}

	useEffect(() => {
		getRubValue()
	})

	return (
		<div className={ 
			limiter 
			? `${styles.contentCountries__wrapper} ${styles.limiter}` 
			: `${styles.contentCountries__wrapper}` 
			}>
			<div className={styles.img__wrapper}>
				<div className={styles.blockImg}>
					<Image src={imgSrc} className={styles.img_countries} alt="toorfirmImg" />
					<div className={styles.block_text}>
						<h2 className={styles.content__title}>{title}</h2>
						<span className={styles.content__price}>Цена за билет: от {value * price} руб</span>
						<div className={styles.content__text}>
							<div className={styles.content__text_title}>Предлагаем Вам посетить...</div>
							<div className={styles.content__text_subtitleClass}>{content__text_subtitle}</div>
						</div>
					</div>
					{
						isLogin
						? 
						<Link
							href={link ? link : '/toSmth'}
							className={styles.link_order }
						>
							Заказать билет
						</Link>
						:
						<button
							className={`${styles.link_order + ' ' + styles.disabled}`
						}
						>
						Заказать билет
						</button>
					}
					
					<Link
						href={link ? link : '/toSmth'}
						className={styles.link}
					>Подробнее...</Link>
				</div>
			</div>
		</div>
	)
}