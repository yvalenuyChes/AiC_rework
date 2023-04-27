import { useEffect } from "react"
import classes from './ButtonToTop.module.scss'

export default function ButtonToTop() {

	const getTop = () => window.pageYOffset || document.documentElement.scrollTop

	useEffect(() => {
		const offset = 100
		const scrollUp = document.querySelector(`.${classes.scroll_up}`)
		const scrollUpSvgPath = document.querySelector(`.${classes.scroll_up__path}`)
		const pathLength = scrollUpSvgPath.getTotalLength()
		scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`
		scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms'
		const Height = document.documentElement.scrollHeight - window.innerHeight
		const updateDashoffset = () => {
			const dashoffset = pathLength - (getTop() * pathLength / Height)
			scrollUpSvgPath.style.strokeDashoffset = dashoffset
		}
		if (getTop() > offset) {
			scrollUp.classList.add(`${classes.active}`)
		} else {
			scrollUp.classList.remove(`${classes.active}`)
		}
		updateDashoffset()
	}, [getTop])


	return (
		<div
			className={classes.scroll_up}
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				})
			}}
			role="button"
			tabIndex="0"
		>
			<svg className={classes.scroll_up__svg} viewBox="-2 -2 52 52">
				<path
					className={classes.scroll_up__path}
					d="
               M24, 0
               a24, 24 0 0, 1 0, 48
               a24, 24 0 0, 1 0, -48
               "
				/>
			</svg>
		</div>
	)
}