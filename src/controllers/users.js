const db = require('../config/db');

let Role = null;

module.exports.renderLogin = (req, res) => {
    res.render("login");
}

module.exports.renderSignup = (req, res) => {
    res.render("signup");
}

module.exports.login = (req, res) => {
    console.log(req.body);
    let sql = `SELECT * FROM users where username = '${req.body.username}' and password = '${req.body.password}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        if(result.length == 1){
            if(result[0].role == 'tnp'){
                Role = 'tnp';
                console.log('tnp logged in');
                res.redirect('/');
            }
            else{
                Role = result[0].role;
                console.log('student/teacher logged in');
                res.redirect('/');
            }
        }
        else{
            Role = null;
            console.log("invalid credentials");
            res.redirect('/login');
        }
    })
}

module.exports.signup = (req, res) => {
    console.log(req.body);
    if(req.body.role == 'tnp' && req.body.accesskey == '12345'){
        let user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        };
        let sql = "INSERT INTO users SET ?";
        db.query(sql, user, (err, result) => {
            if(err) throw err;
            console.log(result);
        })
        Role = 'tnp';
        console.log("tnp registered");
        res.redirect('/');
    }
    else if(req.body.role == 'tnp' && req.body.accesskey != '12345'){
        Role = null;
        console.log("invalid credentials");
        res.redirect("/signup");
    }
    else{
        let user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        };
        let sql = "INSERT INTO users SET ?";
        db.query(sql, user, (err, result) => {
            if(err) throw err;
            console.log(result);
            Role = result[0].role;
        })
        console.log("student/teacher signed up");
        res.redirect('/');
    }
}

module.exports.logout = (req, res) => {
    Role = null;
    res.redirect('/login');
}

module.exports.Role = Role;