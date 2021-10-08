const express = require("express");
const {renderAddStudent, addStudent, renderStudents} = require('../controllers/students');
const {renderAddCompany, addCompany, renderCompanies} = require('../controllers/companies');
const {renderAddPlacement, addPlacement, renderPlacements} = require('../controllers/placements');
const {renderLogin} = require('../controllers/users');

//set up express router
const router = express.Router();

router.route("/addstudent")
    .get(renderAddStudent)
    .post(addStudent);
router.route("/students").get(renderStudents);

router.route("/addcompany")
    .get(renderAddCompany)
    .post(addCompany);
router.route("/companies").get(renderCompanies);

router.route("/addplacement")
    .get(renderAddPlacement)
    .post(addPlacement);
router.route("/placements").get(renderPlacements);

router.route("/").get(renderLogin);

module.exports = router;