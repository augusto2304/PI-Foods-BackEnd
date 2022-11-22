var express = require('express');
var router = express.Router();
const{getDiets} = require('../controllers/controller');


router.get('/', async (req,res) => {
    const allDiets = await getDiets();
    try {
        res.status(200).send(allDiets)
    } catch (error) {
        res.status(404).send(error.message)

    }
});



module.exports = router






