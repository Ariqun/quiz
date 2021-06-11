import React from 'react';

const Hints = ({checkHint}) => {
	const hints = [
		{name: '50 / 50', cost: 50, id: 'half'},
		{name: 'Смена вопроса', cost: 30, id: 'switch'},
		{name: 'Мнение эксперта', cost: 100, id: 'expert'}
	];

	const content = hints.map(hint => {
		const {name, cost, id} = hint;

		return(
			<div onClick={() => checkHint(id, cost)} className={`hint ${id}`} key={id}>
				<span className="name">{name}</span>
				<span className="cost">{cost}</span>
			</div>
		)
	})

	return(
		<div className="hints">
			{content}
		</div>
	)
}

export default Hints;