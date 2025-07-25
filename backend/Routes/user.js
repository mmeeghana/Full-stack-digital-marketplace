const express = require('express');
const { User } = require('../db');
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const zod = require('zod');
const router = express.Router();
const {Product} = require('../db');

const signUpSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    fullName: zod.string()
});
router.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        const {success} = signUpSchema.safeParse(body);
        if (!success) {
            return res.status(400).json({
                message: "Incorrect inputs, please check your inputs",
            });
        }

        const user = await User.findOne({
            username: body.username
        });
        if (user) {
            return res.status(400).json({
                message: "User Already Exists",
            });
        }

        const dbUser = await User.create(body);
        const userId = dbUser._id;
        await Product.create({
	    userId : userId,
        products : []
        })
        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (error) {
        console.error("Error in /signup:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post('/signin', async (req, res) => {
    try {
    const success = signinBody.safeParse(req.body);
    if (!success.success) {
        return res.status(400).json({
            message: "Incorrect Inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.json({
            token
        });
    }

    res.status(401).json({
        message: "Invalid username or password"
    });
    } catch (error) {
        console.error("Error in /signin:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


module.exports = router;
