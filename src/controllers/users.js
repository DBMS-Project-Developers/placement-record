const db = require('../config/db');

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
                console.log('tnp logged in');
                req.session.loggedinUser = true;
                req.session.user = result[0];
                req.flash("success", "Successfully logged in");
                res.redirect('/');
            }
            else{
                console.log('student/teacher logged in');
                req.session.loggedinUser = true;
                req.session.user = result[0];
                req.flash("success", "Successfully logged in");
                res.redirect('/');
            }
        }
        else{
            console.log("invalid credentials");
            req.flash("error", "Invalid credentials");
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
        console.log("tnp registered");
        req.flash("success", "User signed up");
        res.redirect('/login');
    }
    else if(req.body.role == 'tnp' && req.body.accesskey != '12345'){
        console.log("invalid credentials");
        req.flash("error", "Invalid credentials");
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
        })
        console.log("student/teacher signed up");
        req.flash("success", "User signed up");
        res.redirect('/login');
    }
}

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}