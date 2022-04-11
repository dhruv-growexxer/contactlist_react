const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const Contact = require('../models/contacts');

const id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

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

// update contacts
// api/contact
router.put('/contact/:id', async (req, res, next) => {
  try {
    // mongoose.Types.ObjectId();
    const doc = await Contact.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
    });
    console.log('docs ', doc);
    res.json({ msg: 'contact updated successfully' });
  } catch (error) {
    console.log('error from .put', error);
    res.json({ msg: 'failed to update contact' });
  }
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
