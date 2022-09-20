const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());
app.use(cors());

const { port } = require("./config");

const users = require("./routes/users");
app.use("/users/", users);

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));



















/*const express = require("express");
const mysql = require("mysql2/promise");
const fetch = require("node-fetch");

const { PORT, dbconfig } = require("./config");

const app = express();
app.use(express.json());

app.get("/api/fill", async (req, res) => {
  try {
    const user = await fetch("https://jsonplaceholder.typicode.com/users");
    const userResponse = await user.json();
    const userId = userResponse[0].id;
    const userName = userResponse[0].name;
    const userEmail = userResponse[0].email;
    const userAddress = `${userResponse[0].address.street} 
    ${userResponse[0].address.suite} 
    ${userResponse[0].address.city} 
    ${userResponse[0].address.zipcode}`;

    const con = await mysql.createConnection(dbconfig);
    await con.execute(
      `INSERT INTO user (id, name, email, address) values (${mysql.escape(
        userId
      )}, ${mysql.escape(userName)}, ${mysql.escape(userEmail)}, ${mysql.escape(
        userAddress
      )})`
    );

    const [response] = await con.execute("SELECT * FROM user");
    await con.end();
    res.send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Error" });
  }
});

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
*/