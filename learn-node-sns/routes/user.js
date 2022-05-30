const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}}); // 사용자의 아이디
        if(user) {
            await user.addFollowing(parseInt(req.params.id, 10)); // 팔로우 할 사람의 아이디
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;
