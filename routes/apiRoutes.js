const router = require('express').Router();
const data = require('../db/data');
const { uuid } = require('uuidv4');
// GET "/api/notes" responds with all notes from the database
router.get('/notes', (req, res) => {
  
    data
      .getNotes()
      .then((notes) => {
        return res.json(notes);
      })
      .catch((err) => res.status(500).json(err));
  });

  //router.post
  router.post('/notes', (req, res) => {
  
    data
      .addNote({
          ...req.body,
          id:uuid()
      })
      .then((notes) => {
        return res.json(notes);
      })
      .catch((err) => res.status(500).json(err));
  });

  //router.delete
  router.delete('/notes/:id', (req, res) => {
  
    data
      .removeNote(req.params.id)
      .then((notes) => {
        return res.json(notes);
      })
      .catch((err) => res.status(500).json(err));
  });

  module.exports = router;