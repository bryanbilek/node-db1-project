const express = require("express");
const router = express.Router();

//database access using knex
const db = require("../data/dbConfig");

//GET /api/accounts
router.get("/", (req, res) => {
    db.select("*").from("accounts")
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ message: "problem retrieving accounts" });
        });
});

//GET /api/accounts/id
router.get("/:id", (req, res) => {
    const id = req.params;
    db("accounts").where(id)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ message: "problem retrieving selected account" });
        });
});

//POST /api/accounts
router.post("/", (req, res) => {
    const account = req.body;
    if (!account.name || !account.budget) {
        res.status(400).json({ message: "all fields required" });
    } else {
        db("accounts").insert(account)
            .then(account => {
                res.status(201).json(account);
            })
            .catch(err => {
                res.status(500).json({ message: "problem creating account" });
            });
    }
});

//DELETE /api/accounts/id
router.delete("/:id", (req, res) => {
    const id = req.params;
    db("accounts").where(id)
        .del()
        .then(account => {
            if (account > 0) {
                res.status(200).json({ message: "account deleted successfully " });
            } else {
                res.status(404).json({ message: "account not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "problem deleting account" });
        });
});

//PUT /api/accounts/id
router.put("/:id", (req, res) => {
    const changes = req.body;
    const id = req.params;
    if (!changes.name || !changes.budget) {
        res.status(400).json({ errorMessage: "all fields required to update" });
    }
    db("accounts").where(id)
        .update(changes)
        .then(account => {
            if (account > 0) {
                res.status(200).json({ message: "account updated successfully " });
            } else {
                res.status(404).json({ message: "account not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "problem updating account" });
        });
});

module.exports = router;