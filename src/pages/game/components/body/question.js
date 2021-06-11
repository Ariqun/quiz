import React from 'react';

const Question = ({currentQuestion}) => {
	const {question} = currentQuestion;
	
	return(
		<div className="question">
			<span>{question}</span>
			<div className="timer"></div>
		</div>
	)
}

export default Question;