import { writeFileSync, rmSync } from 'fs'

const _quizPath = id => `./quizzes/${id}.html`

const _choiceTemplate = (choice, type, name) => `
	<div class="choice" result="${choice.result}">
		<input type="${type}" name="${name}" />
		<img src="${choice.image}" />
		<p>${choice.text}</p>
	</div>
`

const _questionTemplate = question => `
	<div class="question">
		<h1>${question.title}</h1>
		<img src="${question.image}" />
		<p>${question.description}</p>

		<div class="choices">
			${question.choices.map(
				choice => _choiceTemplate(choice, question.type, question.name)
			).join()}
		</div>
	</div>
`

const _resultTemplate = result => `
	<div class="result">
		<h1>${result.title}</h1>
		<img src="${result.image}" />
		<p>${result.description}</p>
	</div>
`

const _quizTemplate = data => `
	<!DOCTYPE html>
	<html>

	<head>
		<link type="text/css" rel="stylesheet" href="/css/quiz.css">
		<script type="module" src="/js/quiz.js"></script>
	</head>

	<body>

		<div id="quiz-info">
			<h1>${data.title}</h1>
			<img src="${data.image}" />
			<p>${data.description}</p>
		</div>

		<div id="questions">
			${data.questions.map(
				question => _questionTemplate(question)
			).join()}
		</div>

		<div id="results">
			${data.results.map(
				result => _resultTemplate(result)
			).join()}
		</div>

	</body>
	</html>
`

const render = (id, data) => writeFileSync(_quizPath(id), _quizTemplate(data))

const remove = id => rmSync(_quizPath(id))

export default { render, remove }
