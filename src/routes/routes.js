const express = require("express");
const {renderAddStudent, addStudent, renderStudents} = require('../controllers/students');
const {renderAddCompany, addCompany, renderCompanies} = require('../controllers/companies');
const {renderAddPlacement, addPlacement, renderPlacements} = require('../controllers/placements');
const {renderLogin, renderSignup, login, signup, logout} = require('../controllers/users');
const {renderHome} = require('../controllers/home');

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

router.route("/login")
    .get(renderLogin)
    .post(login);
router.route("/signup")
    .get(renderSignup)
    .post(signup);
router.route("/logout").get(logout);

router.route("/").get(renderHome);

module.exports = router;