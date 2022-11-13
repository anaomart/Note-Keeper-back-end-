const { auth } = require('../Security/auth');
const { userValidation } = require('../Security/validation');
const {
    signup,
    login,
    deleteAccount,
    getAllUsers,
    getUserByNameOrEmail,
    usersUnder_30,
    usersAbove_30,
    usersUnderOrEqual_30
} = require('../services/user.service');
const { catchAsyncError } = require('../util/catchAsync');

const app = require('express').Router();
catchAsyncError
app.post("/signup", userValidation, catchAsyncError(signup));
app.post("/login", userValidation, catchAsyncError(login));
app.delete('/deleteAccount', auth, catchAsyncError(deleteAccount));
app.get('/getAllUsers', auth, catchAsyncError(getAllUsers))
app.get('/getUserByNameOrEmail', auth, catchAsyncError(getUserByNameOrEmail))
app.get('/usersUnder_30', auth, catchAsyncError(usersUnder_30));
app.get('/usersAbove_30', auth, usersAbove_30);
app.get('/usersUnderOrEqual_30', auth, usersUnderOrEqual_30);
module.exports = app