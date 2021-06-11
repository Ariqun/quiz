import React from 'react';

import Btn from '../../../components/buttons/btn';

const GameOver = ({score, rightCount, allCount}) => {
	const checkScore = () => {
		if (!score) return null;

		return(
			<div className="result_score">
				<div>Ваш счет: {score}</div>
				<div>Вы ответили правильно на {rightCount} вопросов из {allCount}</div>
			</div>
		)
	}

	const newGame = () => {
		window.location.reload();
	}

	return(
		<div className="game_over_page">
			<div className="container-xxl">
				{checkScore()}
				<Btn text="Новая игра" func={newGame} />
			</div>
		</div>
	)
}

export default GameOver;