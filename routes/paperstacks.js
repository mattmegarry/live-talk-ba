'use strict';
const express = require('express');
const router = express.Router();

const Paperstack = require('../models/paperstack');
const User = require('../models/user');

// This is for viewing/creating/deleting/editing one collection, since listing collections
// is the job of the dashboard...

// create()

router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }
});

router.post('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const paperstackName = req.body.paperstackName;
  const paperstackDescription = req.body.paperstackDescription;

  const newPaperstack = new Paperstack({
    name: paperstackName,
    description: paperstackDescription
  });

  newPaperstack.save()
    .then((paperstack) => {
      const userId = req.session.currentUser._id;
      User.findByIdAndUpdate(userId, { $push: { paperstacks: paperstack._id } })
        .then(() => {
          return res.json(paperstack);
        });
    })
    .catch(next);
});

module.exports = router;
