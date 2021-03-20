import PutQuestions from "./putQuestion";

export default class GetQuestions {
	constructor() {
		this.questions = questions;
		this.archiveQuestions = [];
		this.questionCounter = 1;
		this.rightAnswersCounter = 0;
		this.playerScore = 0;
		this.right = null;
		this.switch = false;
		this.content = document.querySelector('.content');
		this.click = false; // отслеживание клика по кнопке ответа для остановки таймера
		this.left = 47;
	}

	checkLocalStorage() {
		if (localStorage.getItem('localStorageData')) {
			let array = JSON.parse(localStorage.getItem('localStorageData'));

			const q = array[Math.floor(Math.random() * array.length)];

			this.checkAvailableQuestion(q);
		} else {
			const q = this.questions[Math.floor(Math.random() * this.questions.length)];

			this.checkAvailableQuestion(q);
		}
	}

	checkAvailableQuestion(q) {
		this.right = q.right;

		if(this.archiveQuestions.length == this.questions.length) {
			this.gameOver();
			return;
		}

		if (!this.archiveQuestions.includes(q.id)) {
			this.archiveQuestions.push(q.id);

			this.checkQuestionProgress(q.difficult);

			this.createNewQuestion(q);
			this.bindTriggers(q.right, q.difficult);
		} else {
			this.checkLocalStorage();
		}
	}

	createNewQuestion(q) {
		const questSection = document.createElement('section');
		questSection.classList.add('main-screen');
		questSection.innerHTML = `
			<div class="question animate__animated animate__fadeInDown">
				<span>${q.question}</span>
				<div class="timer"></div>
			</div>
			<div class="answers">
				<button class="answer animate__animated animate__zoomIn" id="a1">
					<div class="number">1</div>
					<span class="text">${q.a1}</span>
				</button>
				<button class="answer animate__animated animate__zoomIn" id="a2">
					<div class="number">2</div>
					<span class="text">${q.a2}</span>
				</button>
				<button class="answer animate__animated animate__zoomIn" id="a3">
					<div class="number">3</div>
					<span class="text">${q.a3}</span>
				</button>
				<button class="answer animate__animated animate__zoomIn" id="a4">
					<div class="number">4</div>
					<span class="text">${q.a4}</span>
				</button>
			</div>
		`;
		document.querySelector('.progress').after(questSection);

		this.createTimer();
	}

	createTimer() {
		const timer = document.querySelector('.timer');
		let width = 0, animation;
		this.click = false;

		animation = requestAnimationFrame(() => timerAnimation.call(this, this));

		function timerAnimation(obj) {
			width++;
			timer.style.width = width + 'px';
			
			if (obj.click == true) {
				cancelAnimationFrame(animation);
				timer.style.width = width + 'px';
			} else if (width < 1920) {
				requestAnimationFrame(() => timerAnimation.call(this, obj));
			} else if (width >= 1920) {
				obj.gameOver();
			}
		}
	}
	
	createDifficultCost() {
		const difficultType = document.createElement('div');
		difficultType.classList.add('type_wrapper');
		difficultType.innerHTML = `
			<div class="type type_easy animate__animated animate__fadeInLeftBig">
				<span class="type_name">Легкий</span>
				<span class="type_color">5</span>
			</div>
			<div class="type type_medium animate__animated animate__fadeInLeftBig">
				<span class="type_name">Средний</span>
				<span class="type_color">10</span>
			</div>
			<div class="type type_hard animate__animated animate__fadeInRightBig">
				<span class="type_name">Сложный</span>
				<span class="type_color">20</span>
			</div>
			<div class="type type_expert animate__animated animate__fadeInRightBig">
				<span class="type_name">Эксперт</span>
				<span class="type_color">40</span>
			</div>
		`;

		document.querySelector('.progress').appendChild(difficultType);
	}

	createScoreAndHints() {
		const scoreSection = document.createElement('section');
		scoreSection.classList.add('score-and-hints', 'animate__animated', 'animate__fadeInUp');
		scoreSection.innerHTML = `
			<div class="score-wrapper">
				<div class="score">
					<span class="text">Ваш счет:</span>
					<span class="count">${this.playerScore}</span>
				</div>
			</div>
			<div class="hints-wrapper">
				<div class="hint half">
					<span class="hint-name">50 / 50</span>
					<span class="hint-cost">50</span>
				</div>
				<div class="hint switch">
					<span class="hint-name">Смена вопроса</span>
					<span class="hint-cost">30</span>
				</div>
				<div class="hint expert">
					<span class="hint-name">Мнение эксперта</span>
					<span class="hint-cost">100</span>
				</div>
			</div>
		`;

		this.content.appendChild(scoreSection);
	}

	// Биндим кнопки ответов и выбираем правильный или неправильный ответ
	bindTriggers(right, difficult) {
		const btns = document.querySelectorAll('.answer');

		btns.forEach(btn => {
			btn.addEventListener('click', (e) => {
				btn.classList.add('choised');
				this.click = true; // клик по кнопке ответа для остановки таймера
				
				if (e.type === 'click') {
					btns.forEach(btn => {
						btn.setAttribute('disabled', 'disabled');
					});
				}

				setTimeout(() => {
					if (btn.id === right) {
						btn.classList.remove('choised');
						btn.classList.add('right');

						switch (difficult) {
							case 'easy':
								this.playerScore += 5;
								break;
							case 'medium':
								this.playerScore += 10;
								break;
							case 'hard':
								this.playerScore += 20;
								break;
							case 'expert':
								this.playerScore += 40;
								break;
						}
						document.querySelector('.score .count').textContent = `${this.playerScore}`;

						setTimeout(() => {
							this.rightAnswersCounter++;
							this.questionCounter++;

							this.clearFields();
							this.checkLocalStorage();
						}, 2000);		
					} else {
						btn.classList.remove('choised');
						btn.classList.add('wrong');

						setTimeout(() => {
							this.gameOver();
						}, 2000);
					}
				}, 3000);
			});
		});
	}

	checkQuestionProgress(difficult) {
		document.querySelectorAll('.num').forEach((item, i) => {
			item.classList.remove('current');

			if (i == this.questionCounter - 2) {
				item.classList.add('complete');
			}

			if (item.getAttribute('id') == `${this.questionCounter}`) {
				item.classList.add('current');
				
				if (!this.switch) {
					document.querySelector('.progress-wrapper').style.left = `calc(50% - ${this.left}px)`;
					this.left += 74;
				}

				switch (difficult) {
					case 'easy':
						item.classList.add('difficult-easy');
						break;
					case 'medium':
						item.classList.add('difficult-medium');
						break;
					case 'hard':
						item.classList.add('difficult-hard');
						break;
					case 'expert':
						item.classList.add('difficult-expert');
						break;
				}
			}
		});
	}

	bindHints(right) {
		document.querySelectorAll('.hint').forEach(hint => {
			hint.addEventListener('click', () => {
				right = this.right;
				const arrAnswers = document.querySelectorAll('.answer');
				let rightNum = parseInt(right.replace(/\D+/, '')) - 1;

				function createRandom() {
					let i = Math.floor(Math.random() * 4);
					return i;
				}

				switch (hint.classList[1]) {
					case 'half':
						let j, k;
						right = this.right; // Переопределяем правильный ответ в случае, если ответ был сменен подсказкой "switch"

						if (this.playerScore < 50) {
							break;
						}
						this.playerScore = this.playerScore - 50;

						function deleteFailAnswers() {
							j = createRandom();
							k = createRandom();

							if (j !== rightNum && k !== rightNum && j !== k) {
								arrAnswers.forEach((item, i) => {
									if (i == j || i == k) {
										item.textContent = '';
									}
								});
							} else {
								deleteFailAnswers();
							}
						}
						deleteFailAnswers();

						break;
					case 'switch':
						if (this.playerScore < 30) {
							break;
						}
						this.playerScore = this.playerScore - 30;
						this.switch = true;

						this.clearFields();
						this.checkLocalStorage();
						break;
					case 'expert':
						right = this.right; // Переопределяем правильный ответ в случае, если ответ был сменен подсказкой "switch"

						if (this.playerScore < 100) {
							console.log(1);
							break;
						}
						this.playerScore = this.playerScore - 100;

						arrAnswers.forEach((item, i) => {
							if (i === rightNum) {
								item.classList.add('hinted');
							}
						});
						break;
				}
				this.switch = false;
				document.querySelector('.score .count').textContent = `${this.playerScore}`;
			});
		});
	}

	clearFields() {
		document.querySelector('.main-screen').remove();
	}

	gameOver() {
		this.clearFields();

		const resultSection = document.createElement('section');

		resultSection.classList.add('result', 'animate__animated', 'animate__fadeInDown');
		resultSection.innerHTML = `
			<div class="text-result">Ваш счет: ${this.playerScore}</div>
			<button id="newGame">Начать новую игру</button>
			<button id="addQuestion">Добавить свой вопрос в базу данных</button>
		`;
			
		document.querySelector('.progress').after(resultSection);

		this.newGame();
		this.addQuestion();
	}

	addQuestion() {
		document.querySelector('#addQuestion').addEventListener('click', () => {
			document.querySelector('.progress-wrapper').remove();
			document.querySelector('.result').remove();
			document.querySelector('.score-and-hints').remove();
			document.querySelector('.type_wrapper').remove();

			new PutQuestions().init();
		});
	}

	newGame() {
		document.querySelector('#newGame').addEventListener('click', () => {
			this.questionCounter = 1;
			this.playerScore = 0;
			this.archiveQuestions = [];
			document.querySelector('.result').remove();
			document.querySelector('.score-and-hints').remove();
			document.querySelector('.type_wrapper').remove();
			this.init();
		});
	}

	init() {
		if (document.querySelector('.progress-wrapper')) {
			document.querySelector('.progress-wrapper').remove();
		}

		const progressSection = document.createElement('div');
		progressSection.classList.add('progress-wrapper', 'animate__animated', 'animate__bounceInRight');
		this.left = 47; // Перезаписываем паадинг в случае, если была начата новая игра.

		for(let i = 1; i <= this.questions.length; i++) {

			progressSection.innerHTML += `
				<div class="num" id="${i}">
					<span>${i}</span>
				</div>
			`;
		}
		
		document.querySelector('.progress').appendChild(progressSection);

		this.createScoreAndHints();
		this.createDifficultCost();
		this.checkLocalStorage();
		this.bindHints(this.right);
	}

}