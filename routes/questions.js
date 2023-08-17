const router     = new (require('express')).Router()
const mongoose = require("mongoose");
const {Users} = require("../models/Questions")
const {Users} = require("../models/Responses")
let crypto = require('crypto');

router.get("/api/question", async (req, res) => {
	let _;

	let data = await Questions.find({
		orderID:parseInt(req.body.currentID) + 1
	})
		.sort({order: -1})

	data = data.map(d => d._doc).map(async f => {

		if (f.type == 'file') {
			let fName = getRandom(f.fileLocation)
			f.flink = await getFilePath(fName)
		}
		return f

	})

	res.json(data._doc)
})


router.get("/api/answer", async (req, res) => {
	let _;

	let answers 

	let data = await Responses.create({
		orderID:parseInt(req.body.currentID) + 1
	})
		.sort({order: -1})

	data = data.map(d => d._doc).map(async f => {

		if (f.type == 'file') {
			let fName = getRandom(f.fileLocation)
			f.flink = await getFilePath(fName)
		}
		return f

	})

	res.json(data._doc)
})


// router.post("/api/files", async (req, res) => {
// 	try {
// 		const file = await getFilePath(req.body.fileName)
// 		// console.log(file)
// 		res.json({file})
// 	} catch (err) {
// 		console.log(err)
// 		res.status(404).send()
// 	}
// })

// router.get("/api/audiofiles", async (req, res) => {
// 	let _;

// 	let files = await getAllFiles(leads.leadID + "/")
// 	files = files.map(f => f.Key)
// 	// leads.files = files
	
// 	// const save = await Users.create({...req.body.info, isActive:true});

// 	res.json(files)
// })

module.exports = router
