import {
	TOORISTS_FIFTH_ITEM,
	TOORISTS_FIRST_ITEM,
	TOORISTS_FOURTH_ITEM,
	TOORISTS_SECOND_ITEM,
	TOORISTS_SEVENTH_ITEM,
	TOORISTS_SIXTH_ITEM,
	TOORISTS_THIRD_ITEM,
	ABOUT_COMPANY_FIRST_ITEM,
	ABOUT_COMPANY_SECOND_ITEM,
	ABOUT_COMPANY_THIRD_ITEM,
	ABOUT_COMPANY_FOURTH_ITEM,
	ABOUT_COMPANY_FIFTH_ITEM
} from '../../FooterComponents/FooterLinksText/FooterLinksText'
export function forTootists() {
	return (
		<ul className="accordionList">
			<li>{TOORISTS_FIRST_ITEM}</li>
			<li>{TOORISTS_SECOND_ITEM}</li>
			<li>{TOORISTS_THIRD_ITEM}</li>
			<li>{TOORISTS_FOURTH_ITEM}</li>
			<li>{TOORISTS_FIFTH_ITEM}</li>
			<li>{TOORISTS_SIXTH_ITEM}</li>
			<li>{TOORISTS_SEVENTH_ITEM}</li>
		</ul>
	)
}

export function moreAboutCompany() {
	return (
		<ul lassName="accordionList">
			<li>{ABOUT_COMPANY_FIRST_ITEM}</li>
			<li>{ABOUT_COMPANY_SECOND_ITEM}</li>
			<li>{ABOUT_COMPANY_THIRD_ITEM}</li>
			<li>{ABOUT_COMPANY_FOURTH_ITEM}</li>
			<li>{ABOUT_COMPANY_FIFTH_ITEM}</li>
		</ul>
	)
}