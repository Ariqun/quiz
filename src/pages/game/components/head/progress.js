import React from 'react';

const Progress = ({questionNumber, questions}) => {
	const content = questions.map((question, i) => {
		const {difficult, id} = question;

		let className = `num`;

		if (questionNumber > i) className += ` ${difficult} complete`;
		if (questionNumber === i) className += ` ${difficult} current`;

		return(
			<div className={className} key={id}>
				<span>{i + 1}</span>
			</div>
		)
	})
	
	const createStyles = () => {
		let styles = {left: `calc(50% - 50px)`};

		if (questionNumber >= 1) {
			styles = {left: `calc(50% -  (50px + (${questionNumber} * 70px)))`};
		}

		return styles;
	}

	return(
		<div className="progress" style={createStyles()}>
			{content}
		</div>
	)
}

export default Progress;