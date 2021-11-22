const express = require("express");
const {renderStudents, renderAddStudent, addStudent, renderEditStudent, editStudent, deleteStudent} = require('../controllers/students');
const {renderCompanies, renderAddCompany, addCompany, renderEditCompany, editCompany, deleteCompany} = require('../controllers/companies');
const {renderPlacements, renderAddPlacement, addPlacement, renderEditPlacement, editPlacement, deletePlacement} = require('../controllers/placements');
const {renderLogin, renderSignup, login, signup, logout} = require('../controllers/users');
const {renderHome} = require('../controllers/home');
const {renderFaculty} = require('../controllers/faculty');

//set up express router
const router = express.Router();

router.route("/faculty").get(renderFaculty);

router.route("/students").get(renderStudents);
router.route("/addstudent")
    .get(renderAddStudent)
    .post(addStudent);
router.route("/students/:id/edit")
    .get(renderEditStudent)
    .post(editStudent);
router.route("/students/:id/delete").post(deleteStudent);

router.route("/companies").get(renderCompanies);
router.route("/addcompany")
    .get(renderAddCompany)
    .post(addCompany);
router.route("/companies/:id/edit")
    .get(renderEditCompany)
    .post(editCompany);
router.route("/companies/:id/delete").post(deleteCompany);

router.route("/placements").get(renderPlacements);
router.route("/addplacement")
    .get(renderAddPlacement)
    .post(addPlacement);
    router.route("/placements/:id/edit")
    .get(renderEditPlacement)
    .post(editPlacement);
router.route("/placements/:id/delete").post(deletePlacement);

router.route("/login")
    .get(renderLogin)
    .post(login);
router.route("/signup")
    .get(renderSignup)
    .post(signup);
router.route("/logout").get(logout);

router.route("/").get(renderHome);

module.exports = router;