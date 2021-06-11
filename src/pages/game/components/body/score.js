import React from 'react';

const Score = ({score}) => {

	return(
		<div className="score">
			<div className="score_block">
				<span className="text">Ваш счет:</span>
				<span className="count">{score}</span>
			</div>
		</div>
	)
}

export default Score;