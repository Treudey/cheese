const express = require('express');

const cheese = require('../models/cheese');

const router = express.Router();

router.get('/', async (req, res) => {
    data = await cheese.selectAllCheeses();
    const hbsObject = {
        cheeses: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
});


router.post("/api/cheese", async (req, res) => {
    await cheese.insertCheese("cheese_name", req.body.cheese); 
    
    res.end();
});

router.put("/api/cheese/:id", async (req, res) => {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    const result = cheese.updateCheese({
        devoured: true
    }, condition);

    if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
    } else {
        res.status(200).end();
    } 
});

module.exports = router;