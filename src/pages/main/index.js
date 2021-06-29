import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import './index.sass';

const Main = ({location}) => {
	const checkScore = () => {
		if (!location.data) return null;

		const [score, rightCount, allCount] = location.data;

		return(
			<div className="result_score">
				<div>Ваш счет: {score}</div>
				<div>Вы ответили правильно на {rightCount} вопросов из {allCount}</div>
			</div>
		)
	}

	return(
		<div className="main_page">
			<div className="container-xxl">
				{checkScore()}

				<Link to={`/game`}>
					<div className="btn">Новая игра</div>
				</Link>

				<Link to={`/addQuestion`}>
					<div className="btn">Добавить свой вопрос в базу данных</div>
				</Link>
			</div>
		</div>
	)
}

export default withRouter(Main);