const db = require('../config/db');

module.exports.renderStudents = (req, res) => {
    let sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.render("showStudents", {
            result
        });
    })
}

module.exports.renderAddStudent = (req, res) => {
    res.render("addStudent");
}

module.exports.addStudent = (req, res) => {
    console.log(req.body);
    let student = {
        reg_no: req.body.regno, 
        roll_no: req.body.rollno, 
        name: req.body.name, 
        class: req.body.class,
        cgpa: req.body.cgpa, 
        email: req.body.email, 
        phone_no: req.body.phone, 
        gender: req.body.gender, 
        dept: req.body.dept
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, student, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log("Student added");
        req.flash("success", "Student added");
        res.redirect("/addstudent");
    })
}

module.exports.renderEditStudent = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM student where reg_no = '${id}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.render("editStudent", {result});
    })
}

module.exports.editStudent = (req, res) => {
    const { id } = req.params;
    console.log(req.body);

    let student = {
        reg_no: req.body.regno, 
        roll_no: req.body.rollno, 
        name: req.body.name, 
        class: req.body.class,
        cgpa: req.body.cgpa, 
        email: req.body.email, 
        phone_no: req.body.phone, 
        gender: req.body.gender, 
        dept: req.body.dept
    };
    const par = [student, id];
    let sql = "UPDATE student SET ? where reg_no = ?";
    db.query(sql, par, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log("Student edited");
        req.flash("success", "Student edited");
        res.redirect("/students");
    })
}

module.exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM student where reg_no = '${id}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.redirect("/students");
    })
}