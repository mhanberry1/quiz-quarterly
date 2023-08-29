import { existsSync, readFileSync, writeFileSync } from 'fs'
import renderer from './quiz-renderer.js'

const dataFile = './data/quizzes.json'
const quizzes = existsSync(dataFile) ?
	JSON.parse(readFileSync(dataFile)) :
	[]

const _writeFile = () => writeFileSync(
	dataFile,
	JSON.stringify(quizzes)
)

const get = id => id != undefined ? quizzes[id] : quizzes

const create = data => {
	quizzes.push(data)
	_writeFile()
	renderer.render(quizzes.length, data)
	return quizzes.length
}

const update = (id, data) => {
	quizzes[id] = data
	_writeFile()
	renderer.render(id, data)
}

const remove = id => {
	quizzes.splice(id, 1)
	_writeFile()
	renderer.remove(id)
}

export default { get, create, update, remove }
