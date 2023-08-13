import express from 'express'
import cors from 'cors'
import session from './session-handler.js'
import quiz from './quiz-operations.js'

const app = express()
const corsMiddleware = cors({ origin: '*' })
const port = 8080

app.use(express.json())
app.use(corsMiddleware)

app.post('/login', (req, res) => {
	const { username, password } = req.body

	try{
		const authToken = session.login(username, password)
		res.json({ authToken })
	} catch(e) {
		console.error(e)
		res.status(401).send(e)
	}
})

app.get('/quiz/:id?', (req, res) => {
	const { id } = req.params

	try {
		res.json(quiz.get(id))
	} catch(e) {
		console.error(e)
		res.status(404).send(e)
	}
})

app.post('/quiz', (req, res) => {
	const token = req.headers.authorization
	const data = req.body

	console.log(token)
	session.validate(token)

	try {
		id = quiz.create(data)
		res.json({ id })
	} catch(e) {
		console.error(e)
		res.status(500).send(e)
	}
})

app.put('/quiz/:id', (req, res) => {
	const token = req.headers.authorization
	const { id } = req.params
	const data = req.body

	session.validate(token)

	try {
		quiz.update(id, data)
		res.sendStatus(200)
	} catch(e) {
		console.error(e)
		res.status(500).send(e)
	}
})

app.delete('/quiz/:id', (req, res) => {
	const token = req.headers.authorization
	const { id } = req.params

	session.validate(token)

	try {
		quiz.remove(id)
		res.sendStatus(200)
	} catch(e) {
		console.error(e)
		res.status(500).send(e)
	}
})

app.listen(port, () => {
	console.log(`Example app listenting on port ${port}`)
})
