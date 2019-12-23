const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// рендер формы регистрации
router.get('/new', (req, res) => {
    res.render('./users/user-new', { userLogged: req.session.logged, name: req.session.name });
})
router.get('/login', (req, res) => {
    res.render('./users/login', { userLogged: req.session.logged, name: req.session.name });
})
// Обработчик на логаут, который будет
// Удалять у пользователя куку и перенаправлять
// На главную страницу приложения
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})
// Обработчик пост-запроса на адрес /login
// Который проверяет соответсвие имени и пароля
// При совпадении присваивает сессию
router.post('/login', async (req, res) => {
    let currentUser = await User.getUserByName(req.body.username)
    bcrypt.compare(req.body.password, currentUser.password, function (err, result) {
        if (result) {
            console.log(req.session);

            req.session.logged = 'true';
            req.session.name = req.body.username;
            req.session.key = currentUser.key;
            res.redirect('/user/personal');
        } else {
            res.send('Login or password is invalid');
        }
    })

})
// личный кабинет
router.get('/personal', async (req, res) => {
    res.render('./users/personal', { name: req.session.name, userLogged: req.session.logged })
})


// //отображение пользователя по id
// router.get('/:id', async (req, res) => {
//     res.render('./users/user', { userData: await User.getUser(req.params.id), userLogged: req.session.user_sid });
// })
//отображение формы авторизации
// передача данных о регистрации на сервер

router.post('/', async (req, res) => {
    console.log(req.body);

    const validateUsername = await User.findOne({
        name: req.body.username,
    })

    const validateEmail = await User.findOne({
        email: req.body.email,
    })

    if (validateUsername || validateEmail) {
        res.send(JSON.stringify({ validationError: 'This username or email is already in use!' }))
    } else {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            let newUser = new User({
                name: req.body.username,
                password: hash,
                email: req.body.email,
                key: Math.random(),
            });
            await newUser.save();
        });
        res.send(JSON.stringify({ redirectTo: '/' }));
    }
    // res.redirect('/');
})



module.exports = router;