const db = require("../../data/dbConfig");

module.exports = {
    getResources,
    insertResource
}

function getResources() {
    return db('resources');
}

function insertResource(resource) {
    return db('resources').insert(resource)
        .then(([id]) => {
            return db('resources').where('resource_id', id).first();
        });
}