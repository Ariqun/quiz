import React from 'react';

const TypeQuestions = () => {
	const types = {
		'easy': ['Легкий', 5], 
		'medium': ['Средний', 10], 
		'hard': ['Сложный', 20], 
		'expert': ['Эксперт', 40]
	};

	const content = Object.keys(types).map(type => {
		const name = types[type][0];
		const value = types[type][1];

		return(
			<div className={`type ${type}`} key={value}>
				<span className="type_name">{name}</span>
				<span className="type_value">{value}</span>
			</div>
		)
	})

	return(
		<div className="type_questions">
			{content}
		</div>
	)
}

export default TypeQuestions;