const db = require('../config/db');

module.exports.renderAddPlacement = (req, res) => {
    let sql = "SELECT name FROM company";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.render("addPlacement", {result});
    })
}

module.exports.addPlacement = (req, res) => {
    console.log(req.body);
    let placement = {
        reg_no: req.body.regno, 
        type: req.body.type, 
        company_name: req.body.company, 
        role: req.body.role,
        location: req.body.location, 
        placement_date: req.body.pdate, 
        salary: req.body.salary
    };
    let sql = "INSERT INTO placement SET ?";
    db.query(sql, placement, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log("Placement added");
        req.flash("success", "Placement added");
        res.redirect("/addplacement");
    })
}

module.exports.renderPlacements = (req, res) => {
    let sql = "SELECT * FROM placement";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.render("showPlacements", {result});
    })
}