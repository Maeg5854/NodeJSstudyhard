const express = require('express');
//const { Comment } = require('../models');
const Comment = require('../schema/comment')

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    const result = await Comment.populate(comment, {path: 'commenter'});
    res.status(201).json(result); // 결과는 commenter 정보를 합쳐서 보내준다.
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update({
        _id: req.params.id,
      }, {
        //where: { id: req.params.id },
        comment: req.body.comment,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      //const result = await Comment.destroy({ where: { id: req.params.id } });
      const result = await Comment.remove({_id: req.params.id});
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;