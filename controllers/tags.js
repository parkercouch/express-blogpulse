var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');


// GET /tags -- Show all tags
router.get('/', function(req, res){
  db.tag.findAll()
  .then(function(tags){
    res.render('tags/index', { tags: tags });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });

});

// GET /tags/:id -- Show one tag
router.get('/:id', function(req, res){
  db.tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [ db.post ],
  })
  .then(function(tag){
    res.render("tags/show", { tag: tag });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
