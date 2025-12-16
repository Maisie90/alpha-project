// import db from "../db/connect";
const db = require("../db/connect")

class User {
  constructor({
    id,
    username,
    password,
    name,
    role,
    imageUrl,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    this.id = id
    this.username = username
    this.password = password
    this.name = name
    this.role = role
    this.imageUrl = imageUrl
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }

  static async getAll() {
    console.log("running getAll() from users model")
    const response = await db.query("SELECT * FROM users")
    if (!response || response.rows.length === 0) {
      throw new Error("No users available.")
    }
    console.log("returning getAll() from users model")
    return response.rows.map((user) => new User(user))
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM users WHERE id = $1", [id])
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.")
    }
    return new User(response.rows[0])
  }

  static async getOneByUsername(username) {
    console.log("running getOneByUsername from user model")
    const response = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ])
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.")
    }
    console.log("returning getOneByUsername from user model")
    return new User(response.rows[0])
  }

  static async create(data) {
    const { username, password, name, role } = data
    // Check if username already exists
    const existingUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    )
    if (existingUser.rows.length > 0) {
      throw new Error("Username already taken.")
    }
    let response = await db.query(
      "INSERT INTO users (username, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id;",
      [username, password, name, role],
    )
    const newId = response.rows[0].id
    const newUser = await User.getOneById(newId)
    return newUser
  }
}

// export default User;

module.exports = User
