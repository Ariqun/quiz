import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import addQuestionInLS from '../../components/localStorage/addQuestionInLS';

import './index.sass';

const AddQuestion = () => {
	const [question, setQuestion] = useState('');
	const [a1, setAnswer1] = useState('');
	const [a2, setAnswer2] = useState('');
	const [a3, setAnswer3] = useState('');
	const [a4, setAnswer4] = useState('');
	const [right, setRightAnswer] = useState('');
	const [difficult, setQuestionDifficult] = useState('');

	const difficults = [{easy: 'Лёгкий'}, {medium: 'Средний'}, {hard: 'Сложный'}, {expert: 'Эксперт'}];

	const difficultBlock = difficults.map(difficult => {
		const engName = Object.keys(difficult)[0];
		const rusName = difficult[engName];

		return(
			<label className="radio" key={engName}>
				<input onChange={() => setQuestionDifficult(engName)} type="radio" name="difficult" value={engName} required />
				<div className="radio__text">{rusName}</div>
			</label>
		)
	})

	const pushQuestion = () => {
		addQuestionInLS({question, a1, a2, a3, a4, right, difficult});

		document.querySelector('.submit_wrapper button').classList.add('ok');
	}

	return(
		<div className="add_page">
			<div className="title">Добавление вопроса в базу данных</div>

			<div className="container_for_form">
				<form onSubmit={() => pushQuestion()}>
					<label htmlFor="question_name"><span>Напишите свой вопрос:</span></label>
					<input value={question} onChange={(e) => setQuestion(e.target.value)} id="question_name" type="text" name="question" autoComplete="off" required/>

					<label className="options" htmlFor="right"><span>Заполните 4 варианта ответа и отметьте правильный:</span>
						<div className="radio_wrapper">
							<label className="radio">
								<input onChange={() => setRightAnswer(1)} type="radio" name="right" required />
								<div className="radio__text"></div>
								<input value={a1} onChange={(e) => setAnswer1(e.target.value)} type="text" name="answer" autoComplete="off" required />
							</label>
							<label className="radio">
								<input onChange={() => setRightAnswer(2)} type="radio" name="right" required />
								<div className="radio__text"></div>
								<input value={a2} onChange={(e) => setAnswer2(e.target.value)} type="text" name="answer" autoComplete="off" required />
							</label>
							<label className="radio">
								<input onChange={() => setRightAnswer(3)} type="radio" name="right" required />
								<div className="radio__text"></div>
								<input value={a3} onChange={(e) => setAnswer3(e.target.value)} type="text" name="answer" autoComplete="off" required />
							</label>
							<label className="radio">
								<input onChange={() => setRightAnswer(4)} type="radio" name="right" required />
								<div className="radio__text"></div>
								<input value={a4} onChange={(e) => setAnswer4(e.target.value)} type="text" name="answer" autoComplete="off" required />
							</label>
						</div>
					</label>

					<label className="difficult" htmlFor="difficult"><span>Оцените сложность вопроса:</span>
						<div className="radio_wrapper">
							{difficultBlock}
						</div>
					</label>

					<div className="submit_wrapper">
						<button></button>
					</div>
				</form>	

				<Link to={`/game`}>
					<div className="btn">Новая игра</div>
				</Link>
			</div>
		</div>
	)
}

export default AddQuestion;