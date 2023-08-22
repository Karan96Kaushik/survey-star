const router = new (require('express')).Router()
const mongoose = require("mongoose");
const { Questions } = require("../models/Questions")
const { Responses } = require("../models/Responses")
let crypto = require('crypto');
const {
	getAllFiles,
	uploadToS3,
	getFilePath
} = require("../modules/useS3");

const fs = require('fs');
const path = require("path");


router.get("/api/question", async (req, res) => {
	let _;

	// console.log(req.query, '----------')

	let data = await Questions.findOne({
		// orderID:parseInt(req.query.currentID) + 1
	})
	.skip(getRandomInt(global.questionCount - 1))

	data = data._doc

	data.fileRef = fileLocs[getRandomInt(fileLocs.length - 1)]

	let files = fs.readdirSync(__dirname + '/../MIDIs/' + data.fileRef)
	files = files.filter(f => f.includes('.mp3'))

	const file_name = __dirname + '/../MIDIs/' + data.fileRef + '/' + files[getRandomInt(files.length)]

	data.file = await fs.readFileSync(
		file_name, 
		{encoding: 'base64'}
	); // await getFilePath(getRandomFile(data.fileRef))

	res.json(data)
})


router.post("/api/response", async (req, res) => {
	let _;

	console.log(req.body)

	if (Object.keys(req.body).length < 3) {
		return res.send('KO')
	}

	let data = await Responses.create({
		...req.body
	})

	res.send("OK")
})




// range - [0 to max]
const getRandomInt = (max) => {
  return Math.floor(Math.random() * (max + 1))
}

const fileLocs = [
	"RF1", "RF2", "RF3", "RF4", 
	"SA1", "SA2",  "SA3", "SA4", 
	"NA1", "NA2",  "NA3", "NA4", 
]

const files = {}



module.exports = router