const express = require('express');
const diet = require("../../controller/diet/dietController");
const router = express.Router();

router.get('/autodiet', diet.getAutoDiet);
//router.post('/autodiet', diet);

//router.get('/sortdiet', diet.getSortDiet);
//router.post('/sortdiet', diet.postSortDiet);

router.get('/sortdiet', diet.getSortSearchDiet)
router.post('/sortdiet', diet.postSortSearchDiet)


module.exports = router;






