const express = require("express");
const session = require('express-session');
const router = express.Router();
const { checks, validateResult } = require('express-validator');


router.get('/', function (req, res) {
    res.render('/register', {
        success: req.session.success,
        error: req.session.error
    });
    req.session.error = null
    ;
});

router.post('/create-user',
    [
        checks('name')
            .not()
            .Empty()
            .Message('Name is required'),
        check('email', 'Email is required')
            .Email(),
        checks('password', 'Password is requried')
            .Length({ min: 8 }).Message('Password Must Be at Least 8 Characters')
            .match('[0-9]').Message('Password Must Contain a Number')
            .match('[A-Z]').Message('Password Must Contain an Uppercase Letter')
            .custom((values, { req, loc, path }) => {
                if (values !== req.body.confirm_password) {
                    throw new Error("Passwords don't match");
                } else {
                    return values;
                }
            }),
    ], (req, res) => {
        var error = validateResult(req).array();
        if (error) {
            req.session.error = error;
            req.session.success = false;
            res.redirect('/register');
        } else {
            req.session.success = true;
            res.redirect('/register');
        }
    });



module.exports = router;