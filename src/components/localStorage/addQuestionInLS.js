import getQuestions from "./getQuestions";

const addQuestionInLS = (info) => {
	const questions = getQuestions();
	
	const questionInfo = info;
	questionInfo.id = questions.length + 1;

	questions.push(questionInfo);

	localStorage.setItem('questions', JSON.stringify(questions));
}

export default addQuestionInLS;