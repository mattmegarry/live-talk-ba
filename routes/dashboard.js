'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({ yeah: 'boy' });
});

module.exports = router;
