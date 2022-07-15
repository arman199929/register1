const url = require('url');
const Admin = require('../models/admin.js');
const {validationResult, cookie} = require("express-validator");
const {isNumeric} = require("validator");
const {isObject} = require("url/util");
const admPath = ('../views/admin/adminLog.ejs'),
    admParamsPath = ('../views/admin/'),
    admDash = ('../views/admin/adminDashboard.ejs'),
    listPath = ('../views/admin/userList.ejs');
const include = require('includes');
const session = require('express-session')

/**Login as admin **/
exports.adminLogin = (req, res) => {
    const urlValue = Object.keys(req.query).toString()
    let pass, username = "";
    if (urlValue === 'password')
        pass = urlValue
    if (urlValue === 'username')
        username = urlValue

    res.render(admPath, {
        title: 'Admin login',
        layouts: admPath,
        pass, username
    })
}
/**Get all users **/
exports.showUsers = (req, res) => {

    Admin.getUsers()
        .then(result => {
            const name = req.body.username;
            if (name === 'user123') {
                res.render(admDash, {
                    title: "ADMIN DASHBOARD",
                    layout: admDash
                })
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.sendStatus(404)
        })
}
exports.adminParams = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'password' || arrParam === 'username') {
            return res.redirect(url.format({
                pathname: '../views/main.ejs',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    Admin.getUsers()
        .then(result => {
            res.render(listPath, {
                title: 'User list',
                users: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}
/**Delete users **/
exports.deleteUser = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'id') {
            return res.redirect(url.format({
                pathname: '../views/main.ejs',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const dId = req.body.id
    Admin.delete(dId)
        .then(result => {
            res.render(admDash, {
                title: 'The user which id ' + dId + ' is deleted successfully.'
            })
        }).catch(err => {
        res.sendStatus(404)
        console.log(err)
    })
    console.log(dId)
}
/**Change Users parameters**/
exports.editUsers = (req, res) => {
    const id = req.params.id
    Admin.edit(id)
        .then(result => {
            res.render(`${admParamsPath}edit.ejs`, {
                title: "Edit user parameters",
                user: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.update = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'full_name' || arrParam === 'username' || arrParam === 'city'
            || arrParam === 'phone' || arrParam === 'whatsapp' || arrParam === 'id') {
            return res.redirect(url.format({
                pathname: '/admin',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const data = [req.body.full_name, req.body.username, req.body.city, req.body.phone, req.body.whatsapp, req.body.id]
    Admin.update(data)
        .then(result => {
            res.render(admDash, {
                title: 'User which id ' + req.body.id + ' is updated successfully.'
            })
        })
        .catch(err => {
            throw err
        })
};
/**Admin sign out**/
exports.sign_out = (req, res) => {
    if (res.redirect('/')) {
        console.log('sign out')
    }

}
