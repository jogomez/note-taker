const router = require('express').Router();
const path = require('path');
// GET "/api/notes" responds with all notes from the database
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

  module.exports = router;