const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

mongoose
    .connect(process.env.DB_URL)
    .then((obj) => {
        console.log("connected to db", obj.connection.host);
    })
    .catch((err) => console.log(err));

const notesSchema = new mongoose.Schema({
    note: String,
});

const Notes = mongoose.model("Note", notesSchema);

app.get("/notes", async (req, res) => {
    try {
        const notes = await Notes.find();
        res.status(200).json({
            success: true,
            data: notes,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});

app.post("/notes/new", async (req, res) => {
    const { note } = req.body;

    try {
        if (!note) return;
        const newNotes = {
            note,
        };
        const creatednote = await Notes.create(newNotes);
        if (!creatednote) throw Error("Failed to create the note");
        res.status(200).json({
            success: true,
            data: creatednote,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

app.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Notes.findOneAndDelete(id);
        if (!note) throw new Error("no note with this id");
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

app.listen(process.env.PORT || 6000, () =>
    console.log(`Server is running on ${process.env.PORT} PORT`)
);
