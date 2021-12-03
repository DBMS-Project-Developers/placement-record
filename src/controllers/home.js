const db = require('../config/db');

module.exports.renderHome = (req, res) => {
    let sql = "SELECT dept, count(*) as cnt FROM student where reg_no in (select reg_no from placement) group by dept; SELECT gender, count(*) as cnt FROM student where reg_no in (select reg_no from placement) group by gender";
    db.query(sql, [2, 1], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.render("home", {result});
    })
}