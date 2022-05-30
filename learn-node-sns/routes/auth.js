const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        // 같은 이메일로 가입한 사용자가 있는지 조회
        const exUser = await User.findOne({ where: { email }});
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        // 비밀번호를 암호화해서 사용자 정보 생성 및 저장
        const hash = await bcrypt.hash(password, 12);   // 12이상 추천, 31까지 사용가능
        await User.create({
            email,
            nick,
            password: hash,
        });

        return res.redirect('/');
    } catch(error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    // 이 미들웨어가 로컬 로그인 전략 수행
    // 미들웨어에 사용자 정의 기능 추가하고 싶을때, 미들웨어속에 미들웨어를 넣는다.
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(error);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.meesage}`);
        }
        // 로그인을 수행한다.
        return req.login(user, (loginError) => {
            if(loginError){
                console.log(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next를 붙인다.)
});

router.get('/logout', isLoggedIn, (req,res)=> {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', { // 카카오 로그인 결과를 받아서 실제 로그인 수행
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
})

module.exports = router;