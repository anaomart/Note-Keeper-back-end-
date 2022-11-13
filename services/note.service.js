const moment = require("moment/moment");
let noteModel = require("../models/note.model");

module.exports.addNote = async(req, res) => {
    console.log("add note api here")
    console.log(req.headers)
    const createdBy = req.user.userId;
    const { title, details, category } = req.body;
    let newNote = await noteModel.insertMany({ title, details, createdBy, category });
    res.json("Note added ");
};
module.exports.update = async(req, res) => {
    const createdBy = req.user.userId;
    const { id, title, content } = req.body;
    let updatedNote = await noteModel.updateOne({ _id: id }, { title, content, createdBy });
    res.json("Note updated ");
}
module.exports.deleteNote = async(req, res) => {
    const { id } = req.params;
    let updatedNote = await noteModel.findByIdAndDelete(id);
    res.json("Note Deleted ");
}
module.exports.getNote = async(req, res) => {
    const { id } = req.body;
    let note = await noteModel.find({ _id: id }).populate("createdBy", " -password -__v");;
    res.json({ note })
}
module.exports.getNoteByTitleOrContent = async(req, res) => {
    const { title, content } = req.body;
    let noteByTitle = await noteModel.findOne({ title });
    let noteByContent = await noteModel.findOne({ content });
    res.json({ Note: noteByContent || noteByTitle })

}
module.exports.getAllNotes = async(req, res) => {
    let notes = await noteModel.find();
    res.json(notes);
}
module.exports.loggedNotes = async(req, res) => { // NOtes for logged user
    console.log("im heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer")
    console.log(req.user)
    let id = req.user.userId
    console.log(id)
    let notes = await noteModel.find({ createdBy: id });
    console.log(notes)
    res.json(notes);
}
var start = new Date();
start.setHours(0, 0, 0, 0);

var end = new Date();
end.setHours(23, 59, 59, 999);
module.exports.getNotesForToday = async(req, res) => {
    let notes = await noteModel.find({ created_on: { $gte: start, $lt: end } });
    res.json({ notes });
}
yesterday = moment().add(-1, 'days');
module.exports.getNotesForYesterday = async(req, res) => {
    let notes = await noteModel.find({ "date": { "$lt": yesterday } })
    res.json({ notes });
}