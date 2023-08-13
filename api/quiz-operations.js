import { existsSync, readFileSync, writeFileSync } from 'fs'

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
	return quizzes.length
}

const update = (id, data) => {
	quizzes[id] = data
	_writeFile()
}

const remove = id => {
	quizzes.splice(id, 1)
	_writeFile()
}

export default { get, create, update, remove }
