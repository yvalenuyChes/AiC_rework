import { useEffect, useState } from 'react'
import useWindowWidth from '../../../custumHooks/useWindowWidth'
import styles from './style.module.scss'
import styles2 from '../../../pages/saint_petersburg/styles.module.scss'

export default function ParralaxCountries({
   page,
   background,
   firstImage,
   secondImage
}) {

   const [documentScroll, setScroll] = useState(0)

   // useEffect(() => {
   //    		window.addEventListener('scroll', () => { setScroll(prev => window.scrollY + 1) })
   //    		return () => {
   //    			window.removeEventListener('scroll', () => { setScroll(prev => 0) })
   //    		}
   //    	})

	// function parralax() {
   //    const windowWidth = useWindowWidth()
	// 	useEffect(() => {
   //       const scroll = documentScroll.toFixed()
   //       const page = document.querySelector(`.${styles.page}`)

        
   //       const parralaxContentHeight = document.querySelector(`.${styles2.content_paralax}`).offsetHeight
   //       const hightTopBlock = page.querySelector(`.${styles.paralax}`).offsetHeight
   //       const paralaxMontainBackground = page.querySelector(`.${styles.paralax__montain_1}`)
   //       const paralaxMontainSecond = page.querySelector(`.${styles.paralax__montain_2}` )
   //       const paralaxMontainThird = page.querySelector(`.${styles.paralax__montain_3}`)

   //       const p = ((scroll / parralaxContentHeight * 100)).toFixed()
   //       const topScroll = ((scroll / hightTopBlock * 100) + 1).toFixed()
	// 		window.addEventListener('scroll', event => {
	// 			// для фоновой горы(очень плавный скрол)
	// 			const background = 1 + (windowWidth / 5000000 * p)
	// 			paralaxMontainBackground.style.transform = `scale(${background})`

	// 			// вторая гора
	// 			const firtsMountain = (1 + windowWidth * 0.000005 * topScroll)
	// 			paralaxMontainSecond.style.transform = `scale(${firtsMountain})`

	// 			// третья гора
	// 			const thirdMountainSpeed = 1 + (windowWidth * 0.00001 * topScroll)
	// 			paralaxMontainThird.style.transform = `scale(${thirdMountainSpeed})`
	// 		})
	// 		return () => {
	// 			window.removeEventListener('scroll', null)
	// 		}
	// 	})
	// }
	// parralax()
	return (
		<div className={styles.page}>
			<div className={styles.paralax}>
				<div className={`${styles.paralax__montain + ' ' + styles.paralax__montain_1}`} />
				<div className={`${styles.paralax__montain + ' ' + styles.paralax__montain_2}`} />
				<div className={`${styles.paralax__montain + ' ' + styles.paralax__montain_3}`} />
			</div>
		</div>
	)
}