const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { update } = require("./models/Workout");
const { Workout } = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.post("/api/workouts", async (req, res) => {
    const response = await db.Workout.create({ type: "workout" })
    res.json(response);
});

app.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    db.Workout.findByIdAndUpdate({ _id: id }, { $push: { exercises: req.body } }, { new: true })
        .then(event => {
            res.json(event);
        })
        .catch(err => {
            res.json(err);
        });
})

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(event => {
            res.json(event);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(event => {
            res.json(event);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});