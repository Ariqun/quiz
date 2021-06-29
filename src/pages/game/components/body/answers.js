import React from 'react';

import getRandomIds from '../../../../components/manipulationsWithNums/getRandomIds';

const Answers = ({currentQuestion, checkAnswer, showRight, hideWrong}) => {
	const {a1, a2, a3, a4, right} = currentQuestion;
	const hideIds = getRandomIds(right);

	const content = [a1, a2, a3, a4].map((answer, i) => {
		let className = 'answer';

		if (showRight && right === i + 1) className += ' right';
		if (hideWrong && hideIds.includes(i + 1)) {
			return(
				<div className={className} id={`a${i + 1}`} key={i}>
					<div className="number">{i + 1}</div>
					<span className="text"></span>
				</div>
			)
		}

		return(
			<div onClick={() => checkAnswer(i + 1)} className={className} id={`a${i + 1}`} key={i}>
				<div className="number">{i + 1}</div>
				<span className="text">{answer}</span>
			</div>
		)
	})

	return(
		<div className="answers">
			{content}
		</div>
	)
}

export default Answers;