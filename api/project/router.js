const express = require("express");

const Projects = require("./model");

const router = express.Router();

router.get("/", (req, res) => {
    Projects.getProjects()
        .then(projects => {
            projects.map(project => {
                const toBoolean = project.project_completed;
                toBoolean === 1
                    ? project.project_completed = true
                    : project.project_completed = false;
            });
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get projects" });
        });
});

router.post("/", (req, res) => {
    Projects.insertProject(req.body)
        .then(project => {
            const toBoolean = project.project_completed;
            toBoolean === 1
                ? project.project_completed = true
                : project.project_completed = false;
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to insert project" });
        })
});

module.exports = router;