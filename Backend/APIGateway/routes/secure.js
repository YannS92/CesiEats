const express = require('express');
const router = express.Router();

//Get secure ressources
router.get('/', function(req, res, next){
    res.json({infos:'secure ressources', _id: req.app.get("userId")});
});

module.exports = router;