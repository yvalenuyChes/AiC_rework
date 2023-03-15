import { useState } from 'react'
import styles from './Input.module.scss'

export default function Input(
	{
		label,
		type,
		name,
		inputMode,
		value,
		onChange
	}
) {

	// const [valueInput, changeValue] = useState(value)
	const [isFocus, changeFocus] = useState(false)

	// const onChange = event => {
	// 	changeValue(event.target.value)
	// }

	// const toggleOnFocusInput = classNames({
	// 	: true,
	// 	'focus-for-order': isFocus || value !== ''
	// })

	return (
		<>
			<div
				className=
				{
					isFocus || value !== '' 
					? `${styles.input__box_order_ticket + ' ' + styles.focus_for_order}`
					:`${styles.input__box_order_ticket}` 
				}
			>
				<label className={styles.label_order_ticket} htmlFor={name}> {label} </label>
				<input
					inputMode={inputMode}
					id={name}
					name={name}
					onChange={onChange}
					value={value}
					onFocus={() => changeFocus(prev => !isFocus)}
					onBlur={() => changeFocus(prev => !isFocus)}
					className={styles.input_order_ticket}
					type={type}
					required
				/>
			</div>
		</>
	)
}