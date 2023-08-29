import { writeFileSync, rmSync } from 'fs'

const _quiz_path = id => `./quizzes/${id}.html`

const _use_template = data => JSON.stringify(data) //TODO

const render = (id, data) => writeFileSync(_quiz_path(id), _use_template(data))

const remove = id => rmSync(_quiz_path(id))

export default { render, remove }
