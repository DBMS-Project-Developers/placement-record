const db = require('../config/db');

module.exports.renderCompanies = (req, res) => {
    let sql = "SELECT * FROM company";
    db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.render("showCompanies", {result});
    })
}

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

    let company = {
        name: req.body.company, 
        type: req.body.type,
        cgpa_criteria: req.body.cgpa,
        dept_criteria: dept,
        contact_name: req.body.contactname,
        contact_email: req.body.contactemail,
        contact_phone: req.body.contactphone
    };
    let sql = "INSERT INTO company SET ?";
    db.query(sql, company, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log("Company added");
        req.flash("success", "Company added");
        res.redirect("/addcompany");
    })
}

module.exports.renderEditCompany = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM company where name = '${id}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.render("editCompany", {result});
    })
}

module.exports.editCompany = (req, res) => {
    const { id } = req.params;
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

    let company = {
        name: req.body.company, 
        type: req.body.type,
        cgpa_criteria: req.body.cgpa,
        dept_criteria: dept,
        contact_name: req.body.contactname,
        contact_email: req.body.contactemail,
        contact_phone: req.body.contactphone
    };
    const par = [company, id];
    let sql = "UPDATE company SET ? where name = ?";
    db.query(sql, par, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log("Company edited");
        req.flash("success", "Company edited");
        res.redirect("/companies");
    })
}

module.exports.deleteCompany = (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM company where name = '${id}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.redirect("/companies");
    })
}

