const fs = require("fs");
const htmlRoutes = require("express").Router();
const path = require("path");
// The following HTML routes should be created:

// GET /notes should return the notes.html file.

htmlRoutes.get("/notes", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "../public/notes.html"));
});

// GET * should return the index.html file.

module.exports = htmlRoutes;
