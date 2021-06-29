import allQuestions from '../questions';

const getQuestions = () => {
	const questions = JSON.parse(localStorage.getItem('questions'));

	if (!questions) return allQuestions();

	return questions;
}

export default getQuestions;