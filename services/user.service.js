const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { models } = require("mongoose");

module.exports.signup = async(req, res) => {
    console.count("request sent");
    const { name, email, password, age } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {

        res.json({ Message: "Email already exists" });
        return new Error("Email already exits")
    } else {
        bcrypt.hash(password, 4, async(err, hash) => {
            await userModel.insertMany({ name, email, password: hash, age });
            res.json({ Message: "Added", name, email });
        })

    }
};
module.exports.login = async(req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
        let match = await bcrypt.compare(password, user.password)
        if (match) {
            let token = jwt.sign({ userId: user.id, userName: user.name, userAge: user.age, userEmail: email, userPassword: password }, "omar")
            res.json({ Message: "Login", token: token })
        } else {
            res.json({ Message: "Invalid password" });
        }
    } else {
        res.json({ Message: "user not found", });
    }
}
module.exports.deleteAccount = async(req, res) => {
    await userModel.deleteOne({ _id: req.user.userId })
    res.json({ Message: "User deleted" })
}
module.exports.getAllUsers = async(req, res) => {
    let users = await userModel.find();
    res.json({ Message: users });

}

module.exports.getUserByNameOrEmail = async(req, res) => {
    console.log("getUserByNameOrEmail");
    const { name, email } = req.body;
    let userByName = await userModel.findOne({ name: name })
    let userByEmail = await userModel.findOne({ email: email })
    console.warn(userByName, userByEmail)
    if (userByName || userByEmail) res.json({ msg: userByEmail || userByName })
    else res.json({ Message: "User not found" })
}
module.exports.usersUnder_30 = async(req, res) => {
    let usersUnder_30 = await userModel.find({ age: { $lt: 30 } })
    console.log(usersUnder_30);
    res.json({ msg: usersUnder_30 });
}
module.exports.usersAbove_30 = async(req, res) => {
    let usersUnder_30 = await userModel.find({ age: { $gt: 30 } })
    console.log(usersUnder_30);
    res.json({ msg: usersUnder_30 });
}
module.exports.usersUnderOrEqual_30 = async(req, res) => {
    let usersUnder_30 = await userModel.find({ age: { $lte: 30 } })
    console.log(usersUnder_30);
    res.json({ msg: usersUnder_30 });
}