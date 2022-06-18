const fs = require("fs");
const api = require("express").Router();
const path = require("path");
const uuid = require("uuid");

//  GET Request to get notes from the db.json file
api.get("/notes", (req, res) => {
	// Try to read the db.json file and declare to a variable named notes
	try {
		const notes = fs.readFileSync(
			path.resolve(__dirname, "../db/db.json"),
			"utf8"
		);
		// If there are no notes, then send a 404 response to the client
		if (!notes) {
			return res.status(404).json({ message: "Notes not found" });
		}
		//otherwise, send the notes to the client after parsing them into JSON
		res.status(200).json(JSON.parse(notes));
	} catch (err) {
		//if there is an issue getting the notes, send a 500 response to the client (500 response code is for server error)
		console.log(err);
		res.status(500).json({ message: "Error getting notes" });
	}
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file,
//and then return the new note to the client.
//You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
api.post("/notes", (req, res) => {
	// console.log(req);
	if (!req.body.title || !req.body.text) {
		console.log("should have errored");
		return res.status(400).send({
			message: "missing title or body text",
		});
	}

	try {
		const notes = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, "../db/db.json"), "utf8")
		);
		const newNote = {
			id: uuid.v4(),
			title: req.body.title,
			text: req.body.text,
		};
		notes.push(newNote);
		fs.writeFileSync(
			path.resolve(__dirname, "../db/db.json"),
			JSON.stringify(notes),
			"utf8"
		);
		return res.status(201).json(newNote);
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "error writing note",
		});
	}
});

// Bonus
// You haven’t learned how to handle DELETE requests, but this application has that functionality in the front end. As a bonus, see if you can add the DELETE route to the application using the following guideline:

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json

module.exports = api;
