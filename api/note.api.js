const { auth } = require('../Security/auth');
const { addNote, update, deleteNote, getNote, getNoteByTitleOrContent, getAllNotes, loggedNotes, getNotesForToday } = require('../services/note.service');
const { catchAsyncError } = require('../util/catchAsync');

const app = require('express').Router()

app.post('/', auth, catchAsyncError(addNote))
app.put('/update', auth, catchAsyncError(update))
app.delete('/:id', catchAsyncError(deleteNote))
app.get('/getNote', catchAsyncError(getNote))
app.get('/getNoteByTitleOrContent', auth, catchAsyncError(getNoteByTitleOrContent))
app.get('/getAllNotes', catchAsyncError(getAllNotes))
app.get('/loggedNotes', auth, catchAsyncError(loggedNotes))
app.get('/getNotesForToday', auth, catchAsyncError(getNotesForToday))

module.exports = app;