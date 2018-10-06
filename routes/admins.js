const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    let body = req.body;
    const login = {
        username: body.adminUsername,
        password: body.adminPassword
    };
    const adminUsername = 'admin';
    const password1 = 'younow';
    const password2 = 'askme';

    req.checkBody('adminUsername', 'username is required').notEmpty();
    req.checkBody('adminPassword', 'Password is required').notEmpty();

    let adminErrors = req.validationErrors();

    if (adminErrors) {
        res.render('index', {
            title: 'NCP Pensions - Home',
            style: 'index.css',
            script: 'index.js',
            adminUsername: username,
            adminPassword: password,
            adminErrors
        });
    } else if ((login.username === adminUsername) && (login.password === password1 || login.password === password2)) {
        res.redirect('/admins/dashboard');
    } else {
        req.flash('failure', 'Incorrect Username');
        res.render('index', {
            title: 'NCP Pensions - Home',
            style: 'index.css',
            script: 'index.js',
            adminUsername: login.username,
            adminPassword: login.password,
            adminLoginError: 'Incorrect Username or Password'
        });
    }
});
router.get('/dashboard', (req, res) => {
    res.render('adminDashboard', {
        title: 'Admin Dashboard',
        style: 'adminDashboard.css',
        script: 'adminDashboard.js',
        admin: true
    });
});

module.exports = router;