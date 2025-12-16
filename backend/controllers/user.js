// import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken';
// import User from '../models/user';
// import dotenv from 'dotenv';
// dotenv.config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
require("dotenv").config()

async function register(req, res) {
  try {
    const data = req.body

    // Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))

    // Hash the password
    data["password"] = await bcrypt.hash(data.password, salt)
    console.log(data)
    const result = await User.create(data)

    res.status(201).send(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function login(req, res) {
  const data = req.body
  try {
    console.log("running /login from users controller")
    const user = await User.getOneByUsername(data.username)
    if (!user) {
      throw new Error("No user with this username")
    }
    const match = await bcrypt.compare(data.password, user.password)

    if (match) {
      const payload = { username: user.username,  }
      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation")
        }
        res.status(200).json({
          success: true,
          token: token,
          role: user.role,
        })
      }

      jwt.sign(
        payload,
        process.env.SECRET_TOKEN,
        { expiresIn: 3600 },
        sendToken,
      )
      console.log("success /login from users controller")
    } else {
      throw new Error("User could not be authenticated")
    }
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

async function index(req, res) {
  try {
    console.log("running / from users controller")
    const users = await User.getAll()
    res.status(200).json(users)
    console.log("success / from users controller")
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// export default {
//     register,
//     login,
// }

module.exports = {
  register,
  login,
  index,
}
