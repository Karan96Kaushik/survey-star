require("../scripts/db")
const mongoose = require("mongoose");
const { Questions } = require("../models/Questions")
const { Responses } = require("../models/Responses")

const deleteResps = async () => {
	try {

		await Responses.deleteMany({}).then(() => console.debug("DONEENE"))
	}
	catch (err) {

	}

}

deleteResps()