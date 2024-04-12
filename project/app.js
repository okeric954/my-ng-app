const express = require("express");
const path = require("path");

const app = express();

// Define port and use 3000 as default
const port = process.env.PORT || 3000;

// Configure static directory for serving CSS, JS, images, etc.
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src/views")));
app.use(express.static(path.join(__dirname, "bower_components")));

// Define routes
app.get("/", (req, res) => {
  res.send("Hello Friends!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

/* import express from "express";
import path from "path"; // Import the 'path' module

const app = express();
const port = 3000;



app.get("/", (req, res) => {
  res.send("Hello Friend!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
*/
