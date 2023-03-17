import Image from 'next/image'
import classes from './AppLinks.module.scss'
// import appleApp from '../../img/apps/apple.jpg'
// import googleApp from '../../img/apps/GoogleAppStore.png'

export default function AppLinks() {
	return (
		<div className={classes.footer__apps}>
			<h2 className={`${classes.footer__title} ${classes.footer__appTitle}`}>Скачайте наше приложение</h2>
			<div className={classes.appleApp}>
				<Image  src={require('../../../images/apps/apple.jpg')} alt="appleApp" className={classes.appleApp} />
			</div>
			<div className={classes.googleApp}>
				<Image  src={require('../../../images/apps/GoogleAppStore.png')} alt="appleApp" className={classes.googleApp} />
			</div>
		</div >
	)
}