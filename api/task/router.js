const express = require("express");

const Tasks = require("./model");

const router = express.Router();

router.get("/", (req, res) => {
    Tasks.getTasks()
        .then(tasks => {
            tasks.map(task => {
                const toBoolean = task.task_completed;
                toBoolean === 1
                    ? task.task_completed = true
                    : task.task_completed = false;
            });
            res.status(200).json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get tasks" });
        });
});

router.post("/", (req, res) => {
    Tasks.insertTask(req.body)
        .then(task => {
            if (!task.project_id || !task.task_description) {
                res.status(400).json({ message: "Please include a description and project id" });
            } else {
                const toBoolean = task.task_completed;
                toBoolean === 1
                    ? task.task_completed = true
                    : task.task_completed = false;
                res.status(201).json(task);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to insert task" });
        })
});

module.exports = router;