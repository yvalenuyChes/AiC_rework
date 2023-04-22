import { useSelector } from 'react-redux'
import CountrieBlockGallery from '../../components/CountrieBlockComponents/CountryBlockGallery/CountryBlockGallery'
import styles from './CountriesBlock.module.scss'

export default function CountrieBlock() {

	const isLogin = useSelector(state => state.isAuth.isAuth)


	return (
		<section className={styles.main_content} id="main__content">
			<div className={styles.main_content__container}>
				
				
					<div className={styles.main_content__warning} >
						{
								isLogin
								? null
								: 	'Чтобы заказать билет, Вы должны зарегистрироваться'
						}
					
						<br/>
						На данный момент пушешествия возможны только по России
					</div>
				
					
					<div className={styles.main_content__country_name} >
						<h3>
							Россия
						</h3>
					</div>
				<CountrieBlockGallery />
			</div>
		</section>
	)
}