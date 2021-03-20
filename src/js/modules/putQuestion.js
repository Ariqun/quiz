import GetQuestions from "./getQuestions";

export default class PutQuestions {
	constructor() {
		this.content = document.querySelector('.content');
		this.questions = null;
		this.questionNameValue = null;
		this.answersValue = [];
		this.rightAnswerValue = null;
		this.difficultValue = null;
	}
	
	checkLocalStorage() {
		if (localStorage.getItem('localStorageData')) {
			let array = JSON.parse(localStorage.getItem('localStorageData'));
			this.questions = array;
		} else {
			this.questions = questions;
		}
	}

	addQuestion() {
		document.querySelector('#addQuestion').addEventListener('click', (e) => {
			e.preventDefault();
			this.checkLocalStorage();

			const questionName = document.querySelector('#question_name'),
				  answers = document.querySelectorAll('.answer_name'),
				  rightAnswers = document.querySelectorAll('.right_answer'),
				  difficult = document.querySelectorAll('.difficult_type');
			
			this.questionNameValue = questionName.value;

			answers.forEach(answer => {
				this.answersValue.push(answer.value);
			});

			rightAnswers.forEach(right => {
				if (right.checked) {
					this.rightAnswerValue = right.value;
				}
			});

			difficult.forEach(dif => {
				if (dif.checked) {
					this.difficultValue = dif.value;
				}
			});

			if (this.questionNameValue == '' || this.answersValue[0] == '' || this.answersValue[1] == '' || this.answersValue[2] == '' ||
			this.answersValue[3] == '' || this.rightAnswerValue == null || this.difficultValue == null) {
				document.querySelector('.submit_wrapper button').classList.add('wrong', 'animate__animated', 'animate__zoomIn');
				this.clearData();

				setTimeout(() => {
					document.querySelector('.submit_wrapper button').classList.remove('wrong', 'animate__animated', 'animate__zoomIn');
				}, 2000);
			} else {
				this.questions.push({
					question: this.questionNameValue,
					a1: this.answersValue[0],
					a2: this.answersValue[1],
					a3: this.answersValue[2],
					a4: this.answersValue[3],
					right: this.rightAnswerValue,
					difficult: this.difficultValue,
					id: this.questions.length
				});
	
				localStorage.setItem('localStorageData', JSON.stringify(this.questions));

				document.querySelector('.submit_wrapper button').classList.add('ok', 'animate__animated', 'animate__zoomIn');

				setTimeout(() => {
					document.querySelector('.submit_wrapper button').classList.remove('ok', 'animate__animated', 'animate__zoomIn');
				}, 2000);

				this.clearData();
				document.querySelector('.form_for_question form').reset();
			}
		});
	}

	clearData() {
		this.questionNameValue = null;
		this.answersValue = [];
		this.rightAnswerValue = null;
		this.difficultValue = null;
	}

	newGame() {
		document.querySelector('#newGame').addEventListener('click', () => {
			document.querySelector('.form_for_question').remove();
			document.querySelector('.title').remove();

			new GetQuestions().init();
		});
	}

	init() {
		const formSection = document.createElement('section');
		formSection.classList.add('form_for_question');

		formSection.innerHTML = `
			<form action="" method="post">
				<label class="animate__animated animate__fadeInDownBig" for="question_name"><p>Напишите свой вопрос:</p></label>
				<input class="animate__animated animate__fadeInDownBig" id="question_name" type="text" name="question" autocomplete="off" required>

				<label class="options" for="right"><p>Заполните 4 варианта ответа и отметьте правильный:</p>
					<div class="radio_wrapper">
						<label class="radio animate__animated animate__fadeInLeftBig">
							<input class="right_answer" type="radio" name="right" value="a1" required>
							<div class="radio__text"></div>
							<input class="answer_name" type="text" name="answer" autocomplete="off" required>
						</label>
						<label class="radio animate__animated animate__fadeInRightBig">
							<input class="right_answer" type="radio" name="right" value="a2" required>
							<div class="radio__text"></div>
							<input class="answer_name" type="text" name="answer" autocomplete="off" required>
						</label>
						<label class="radio animate__animated animate__fadeInLeftBig">
							<input class="right_answer" type="radio" name="right" value="a3" required>
							<div class="radio__text"></div>
							<input class="answer_name" type="text" name="answer" autocomplete="off" required>
						</label>
						<label class="radio animate__animated animate__fadeInRightBig">
							<input class="right_answer" type="radio" name="right" value="a4" required>
							<div class="radio__text"></div>
							<input class="answer_name" type="text" name="answer" autocomplete="off" required>
						</label>
					</div>
				</label>

				<label class="difficult animate__animated animate__fadeInUpBig" for="difficult"><p>Оцените сложность вопроса:</p>
					<div class="radio_wrapper">
						<label class="radio">
							<input class="difficult_type" type="radio" name="difficult" value="easy" required>
							<div class="radio__text">Легкий</div>
						</label>
						<label class="radio">
							<input class="difficult_type" type="radio" name="difficult" value="medium" required>
							<div class="radio__text">Средний</div>
						</label>
						<label class="radio">
							<input class="difficult_type" type="radio" name="difficult" value="hard" required>
							<div class="radio__text">Сложный</div>
						</label>
						<label class="radio">
							<input class="difficult_type" type="radio" name="difficult" value="expert" required>
							<div class="radio__text">Эксперт</div>
						</label>
					</div>
				</label>

				<div class="submit_wrapper animate__animated animate__fadeInUpBig">
					<button id="addQuestion" type="submit"></button>
				</div>
			</form>	
			
			<button id="newGame" class="animate__animated animate__fadeInUpBig">Начать новую игру</button>
		`;

		this.content.appendChild(formSection);

		const title = document.createElement('div');
		title.classList.add('title', 'animate__animated', 'animate__zoomIn');
		title.textContent = "Добавление вопроса в базу данных";
		document.querySelector('.progress').appendChild(title);

		this.addQuestion();
		this.newGame();
	}


}