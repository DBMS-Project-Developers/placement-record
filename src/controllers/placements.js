const db = require('../config/db');

module.exports.renderPlacements = (req, res) => {
    let sql = "SELECT * FROM placement";
    db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.render("showPlacements", {result});
    })
}

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

module.exports.renderEditPlacement = (req, res) => {
    const { id } = req.params;
    let sql1 = `SELECT * FROM placement where reg_no = '${id}'`;
    let sql2 = "SELECT name FROM company";

    db.query(sql1, (err1, result1) => {
        if(err1) throw err1;
        db.query(sql2, (err2, result2) => {
            if(err2) throw err2;
            console.log(result1);
            console.log(result2);
            res.render("editPlacement", {result1, result2});
        })
    })
}

module.exports.editPlacement = (req, res) => {
    const { id } = req.params;
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
    const par = [placement, id];
    let sql = "UPDATE placement SET ? where reg_no = ?";
    db.query(sql, par, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log("Placement edited");
        req.flash("success", "Placement edited");
        res.redirect("/placements");
    })
}

module.exports.deletePlacement = (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM placement where reg_no = '${id}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.redirect("/placements");
    })
}

