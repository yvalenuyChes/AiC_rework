import { useState } from 'react'
import styles from './Input.module.scss'

export default function Input(
	{
		label,
		type,
		name,
		inputMode,
		value,
		onChange, 
		onBlur,
		min,
		max,
		disabled,
		readOnly,
		required,
		maxLength,
		onPaste,
		autoFocus
	}
) {
	const [isFocus, changeFocus] = useState(false)

	const onBlurHandler = () => {
		changeFocus(prev => !isFocus)
		onBlur
	}

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
					onBlur={onBlurHandler}
					className={styles.input_order_ticket}
					type={type}
					required = {required}
					min={min}
					max={max}
					disabled = {disabled}
					readOnly={readOnly}
					maxLength={maxLength}
					onPaste={
						onPaste
						? event => event.preventDefault()
						: () => false
					}
					autoFocus={autoFocus}
				/>
			</div>
		</>
	)
}