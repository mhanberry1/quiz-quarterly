import { writeFileSync, rmSync } from 'fs'

const _quizPath = id => `./quizzes/${id}.html`

const _useTemplate = data => JSON.stringify(data) //TODO

const render = (id, data) => writeFileSync(_quizPath(id), _useTemplate(data))

const remove = id => rmSync(_quizPath(id))

export default { render, remove }
