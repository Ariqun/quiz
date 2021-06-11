import React, { useEffect, useState } from 'react';

import Head from './components/head';
import Body from './components/body';
import allQuestions from '../../components/questions';
import Btn from '../../components/buttons/btn';
import GameOver from './components/gameOver';

import './index.sass';

const Game = () => {
	const [questions, setQuestions] = useState([]);
	const [questionNumber, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [rightCount, setRightCount] = useState(0);
	const [showRight, setShowRight] = useState(false);
	const [hideWrong, setHideWrong] = useState(false);
	const [isGameOver, setGameOver] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const shuffleArray = (arr) => {
			for (let i = arr.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
	
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
	
			return arr;
		}

		const qs = shuffleArray(allQuestions());
		setQuestions(qs);
		setLoading(false);
	}, [])

	if (isLoading) return null;
	if (isGameOver) {
		return <GameOver score={score} rightCount={rightCount} allCount={questions.length}/>
	}
	if (questionNumber >= questions.length) setGameOver(true);

	const checkAnswer = (answer) => {
		const types = {'easy': 5, 'medium': 10, 'hard': 20, 'expert': 40};
		const currentQuestion = questions[questionNumber];
		const {right, difficult} = currentQuestion;
		
		if (answer !== right) setScore(score - types[difficult]);
		if (answer === right) {
			setScore(score + types[difficult]);
			setRightCount(rightCount + 1);
		}

		setCurrentQuestion(questionNumber + 1);
	}

	const checkHint = (hint, cost) => {
		if (score < cost) return;

		if (hint === 'switch') setCurrentQuestion(questionNumber + 1);
		if (hint === 'expert') setShowRight(true);
		if (hint === 'half') setHideWrong(true);

		setScore(score - cost);
	}

	const gameOver = () => {
		setGameOver(true);
	}

	return(
		<div className="game_page">
			<Head questionNumber={questionNumber} questions={questions} />
			<Body questionNumber={questionNumber} 
				  questions={questions} 
				  score={score} 
				  checkAnswer={checkAnswer} 
				  checkHint={checkHint}
				  showRight={showRight}
				  hideWrong={hideWrong}
			/>

			<Btn text="Закончить игру" func={gameOver}/>
		</div>
	)
}

export default Game;