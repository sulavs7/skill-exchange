const express = require('express');
const router = express.Router();

router.get('/experience', (req, res) => {
  res.render('experience.ejs');
});
router.get('/tourist-pov', (req, res) => {
  res.render('tourist-select-item.ejs');
});



module.exports = router;
