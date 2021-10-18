const db = require('../config/db');

module.exports.renderAddCompany = (req, res) => {
    res.render("addCompany");
}

module.exports.addCompany = (req, res) => {
    console.log(req.body);

    let dept = "";
    if(req.body.compCB && req.body.itCB && req.body.entcCB) dept = "CE IT EnTC";
    else if(req.body.compCB && req.body.itCB) dept = "CE IT";
    else if(req.body.compCB && req.body.entcCB) dept = "CE EnTC";
    else if(req.body.itCB && req.body.entcCB) dept = "IT EnTC";
    else if(req.body.compCB) dept = "CE";
    else if(req.body.itCB) dept = "IT";
    else if(req.body.entcCB) dept = "EnTC";
    else dept = "-";

    let student = {
        name: req.body.company, 
        type: req.body.type,
        cgpa_criteria: req.body.cgpa,
        dept_criteria: dept,
        contact_name: req.body.contactname,
        contact_email: req.body.contactemail,
        contact_phone: req.body.contactphone
    };
    let sql = "INSERT INTO company SET ?";
    db.query(sql, student, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log("Company added");
        req.flash("success", "Company added");
        res.redirect("/addcompany");
    })
}

module.exports.renderCompanies = (req, res) => {
    let sql = "SELECT * FROM company";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.render("showCompanies", {result});
    })
}