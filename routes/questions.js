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



router.get("/api/question", async (req, res) => {
	let _;

	// console.log(req.query, '----------')

	let data = await Questions.findOne({
		// orderID:parseInt(req.query.currentID) + 1
	})
	.skip(getRandomInt(global.questionCount - 1))

	data = data._doc

	data.fileRef = fileLocs[fileLocs.length - 1]
	console.log(data.fileRef)
	data.file = await getFilePath(getRandomFile(data.fileRef))

	res.json(data)
})


router.post("/api/response", async (req, res) => {
	let _;

	console.log(req.body)

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

fileLocs.forEach(async f => {
	let fileList = await getAllFiles(f)
	fileList = fileList.map(f => f.Key)

	files[f] = fileList
})

const getRandomFile = (fileLoc) => {
	return files[fileLoc][getRandomInt(files[fileLoc].length - 1)]
}





module.exports = router
