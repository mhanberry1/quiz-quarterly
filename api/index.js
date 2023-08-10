import express from 'express'
import { login, validateToken } from './session-handler.js'

const app = express()
const port = 8080

app.use(express.json())

app.post('/login', (req, res) => {
	const { username, password } = req.body

	try{
		const authToken = login(username, password)
		validateToken(authToken)
		res.json({ authToken })
	} catch(e) {
		console.error(e)
		res.status(401).send(e)
	}
})

app.listen(port, () => {
	console.log(`Example app listenting on port ${port}`)
})
