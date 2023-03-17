import CountrieBlockGallery from '../../components/CountrieBlockComponents/CountryBlockGallery/CountryBlockGallery'
import styles from './CountriesBlock.module.scss'

export default function CountrieBlock() {
	return (
		<section className={styles.main_content} id="main__content">
			<div className={styles.main_content__container}>
				<div className={styles.main_content__text}>
					<div className={`${styles.main_content__buttPerpose + ' ' + styles.button}`}>
						<a
							href="/countries"
						>Предложения</a>
					</div>
					<div
						className={styles.main_content__subtitle}
					>
						Увидь то, что не увидишь из своего окна,
						<br />
						почувствуй солёные брызги водопада,
						<br /> сравни архитектуру запада и востока,
						<br /> окунись в традиции незнакомых стран
					</div>
				</div>
				<CountrieBlockGallery />
			</div>
		</section>
	)
}