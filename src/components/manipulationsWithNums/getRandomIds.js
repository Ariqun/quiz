import getRandomNum from "./getRandomNum";

const getRandomIds = (rightId) => {
	const hideIds = [];

	const getIdforHide = () => {
		if (hideIds.length >= 2) return;

		const num = getRandomNum(4);

		if (hideIds.includes(num) || num === rightId) {
			getIdforHide();
		} else {
			hideIds.push(num);
		}
	}

	getIdforHide();
	getIdforHide();

	return hideIds;
}

export default getRandomIds;