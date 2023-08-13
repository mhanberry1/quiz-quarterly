import { writeFileSync } from 'fs'
import quizzes from './data/quizzes.json' assert { type: 'json' }

const _writeFile = () => writeFileSync(
	'./data/quizzes.json',
	JSON.stringify(quizzes)
)

const get = id => id != undefined ? quizzes[id] : quizzes

const create = data => {
	quizzes.push(data)
	_writeFile()
	return quizzes.length
}

const update = (id, data) => {
	quizzes[id] = data
	_writeFile()
}

const remove = id => {
	quizzes[id] = undefined
	_writeFile()
}

export default { get, create, update, remove }
