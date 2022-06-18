// const api = require("./routes/apiRoutes");

const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware for parsing JSON and the urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api", api);
app.use("/api", require("./routes/apiRoutes"));
app.use(express.static("public"));
app.use("/", require("./routes/htmlRoutes"));

app.listen(PORT, () =>
	console.log(`Server is listening on port ${PORT} http://localhost:${PORT}`)
);
