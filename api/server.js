const express = require("express");
const server = express();
const db = require("../data/dbConfig.js");
const accountsRouter = require("../accounts/accountsRouter");

server.use(express.json());
server.use("/api/accounts", accountsRouter);

server.get("/", (req, res) => {
    res.send("<h2>SQL & Knex!</h2>");
})

module.exports = server;