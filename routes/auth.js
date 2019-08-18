const router = require("express").Router()
const User = require('../models//User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { loginValidation, regValidation } = require('../validate')

router.post('/register', async(req, res) => {
    const { error } = regValidation(res.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) return res.status(400).send('this User already exist ')
        //hashing password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassord = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassord
    });
    try {
        const saveUser = await user.save()
        res.send({ user: user._id })
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.datails[0].message);

    const user = await User.findOne({ email: req.boy.email })
    if (!user) return res.send('user does not exist')

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('invalid password ');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

    res.send(true);
});

module.exports = router