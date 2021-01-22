const db = require("../../data/dbConfig");

module.exports = {
    getTasks,
    insertTask
}

function getTasks() {
    return db('tasks');
}

function insertTask(task) {
    return db('tasks').insert(task)
        .then(([id]) => {
            return db('tasks').where('task_id', id).first();
        });
}