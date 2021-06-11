const getRandomNum = (length) => {
	return Math.floor(Math.random() * (length - 1) + 1);
}

export default getRandomNum;