import { $ } from '/js/modules/common.js'

const endpoint = `${location.protocol}//api.${location.hostname}`
const testQuiz = await fetch('/js/data/test-quiz.json')
	.then(res => res.json())
const updatedQuiz = Object.assign({}, testQuiz, { title: 'Updated Test Quiz' })

const _showOutput = output => {
	$('#output').innerHTML = JSON.stringify(output, null, 4)
}

$('#login').onclick = () => fetch(`${endpoint}/login`, {
	method: 'post',
	headers: { 'content-type': 'application/json' },
	body: JSON.stringify(
		{ username: 'eggie', password: 'hashtaghashbrown' }
	)
})
	.then(res => res.json())
	.then(output => {
		localStorage.authToken = output.authToken
		_showOutput(output)
	})

$('#getAllQuizzes').onclick = () => fetch(`${endpoint}/quiz`)
	.then(res => res.json())
	.then(output => _showOutput(output))

$('#getQuiz0').onclick = () => fetch(`${endpoint}/quiz/0`)
	.then(res => res.json())
	.then(output => _showOutput(output))

$('#newQuiz').onclick = () => fetch(`${endpoint}/quiz`, {
	method: 'post',
	headers: {
		'authorization': localStorage.authToken,
		'content-type': 'application/json'
	},
	body: JSON.stringify(testQuiz)
})
	.then(res => res.json())
	.then(output => _showOutput(output))

$('#updateQuiz0').onclick = () => fetch(`${endpoint}/quiz/0`, {
	method: 'put',
	headers: {
		'authorization': localStorage.authToken,
		'content-type': 'application/json'
	},
	body: JSON.stringify(
		{ value: Math.floor(Math.random() * 100) }
	)
})
	.then(res => res.text())
	.then(output => _showOutput(output))

$('#deleteQuiz0').onclick = () => fetch(`${endpoint}/quiz/0`, {
	method: 'delete',
	headers: {
		'authorization': localStorage.authToken,
		'content-type': 'application/json'
	},
})
	.then(res => res.text())
	.then(output => _showOutput(output))
