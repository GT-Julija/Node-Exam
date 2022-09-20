const express = require("express");
const mysql = require("mysql2/promise");
const { dbconfig } = require("../config");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT * FROM users");
    await con.end();
    res.send(response);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const user = req.body;
    const [response] = await con.execute(
      `INSERT INTO users (name, email, address) values(${con.escape(
        user.name
      )}, ${con.escape(user.email)}, ${con.escape(user.address)})`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});

router.get("/names", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(`SELECT id,name FROM users`);
    res.send(response[0]);

    await con.end();
  } catch (e) {
    console.error(e);
  }
});

router.get("/emails", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(`SELECT id,name,email FROM users`);
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});

router.get("/address", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response]= await con.execute(`SELECT id,name,address FROM users`);
    res.send(response[0]);

    await con.end();
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
