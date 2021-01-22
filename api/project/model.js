const db = require("../../data/dbConfig");

module.exports = {
    getProjects,
    insertProject
}

function getProjects() {
    return db('projects');
}

function insertProject(project) {
    return db('projects').insert(project)
        .then(([id]) => {
            return db('projects').where('project_id', id).first();
        });
}