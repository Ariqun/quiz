import React from 'react';

import Question from './question';
import Answers from './answers';
import Score from './score';
import Hints from './hints';

import './index.sass';

const Body = ({questionNumber, questions, score, checkAnswer, checkHint, showRight, hideWrong}) => {
	const currentQuestion = questions[questionNumber];

	return(
		<div className="body">
			<Question currentQuestion={currentQuestion} />
			<Answers currentQuestion={currentQuestion} 
					 checkAnswer={checkAnswer}
					 showRight={showRight}
					 hideWrong={hideWrong}
			/>
			<Score score={score} />
			<Hints checkHint={checkHint} />
		</div>
	)
}

export default Body;