const express = require('express');

const router = express.Router();

const Contact = require('../models/contacts');

// retreiving data
// /api/contacts
router.get('/contacts', (req, res, next) => {
  // res.send('Retreiving the contact list');
  Contact.find((err, contacts) => {
    res.json(contacts);
  });
});

// add contacts
// api/contact
router.post('/contact', (req, res, next) => {
  const newContact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
  });

  newContact.save((err, contact) => {
    if (err) {
      res.json({ msg: 'failed to add contact' });
    } else {
      res.json({ msg: 'contact added successfully' });
    }
  });
});

// delete contacts
// api/contact/:id
router.delete('/contact/:id', (req, res, next) => {
  Contact.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
