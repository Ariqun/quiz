import React from 'react';

import Progress from './progress';
import TypeQuestions from './typeQuestions';

import './index.sass';

const Head = ({questionNumber, questions}) => {
	return(
		<div className="head">
			<Progress questionNumber={questionNumber} questions={questions} />
			<TypeQuestions />
		</div>
	)
}

export default Head;