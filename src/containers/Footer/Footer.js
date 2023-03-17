import AccordionBlock from '../../components/Accardion/Accardion'
import { forTootists, moreAboutCompany } from '../../components/Accardion/AccardionContent/AccardionContent'
import AppLinks from '../../components/FooterComponents/AppLinks/AppLinks'
import BlockToorists from '../../components/FooterComponents/BlockToorists/BlockToorists'
import InfoLinks from '../../components/FooterComponents/InfoLinks/InfoLinks'
import ShortInfoBlock from '../../components/FooterComponents/ShortInfoBlock/ShortInfoBlock'
import classes from './Footer.module.scss'
import useWindowWidth from '../../custumHooks/useWindowWidth'

export default function Footer() {

	const width = useWindowWidth()

	return (
		<section className={classes.footer} id="footer">
			<div className={classes.footer__container}>
				{width > 1000 ?
					<div className={classes.footer__links}>
						<BlockToorists />
						<InfoLinks />
					</div>
					: <>
						<AccordionBlock
							title="Туристам"
							content={forTootists()}
						/>
						<AccordionBlock
							title="О компании"
							content={moreAboutCompany()}
						/>
					</>
				}
				<div className={classes.footer__appLinks}>
					<AppLinks />
				</div>
				<div className={classes.footer__shortInfo}>
					<ShortInfoBlock />
				</div>
			</div>
		</section>
	)
}