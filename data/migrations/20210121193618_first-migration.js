
exports.up = function (knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increment('project_id');
            tbl.string('project_name').notNullable();
            tbl.string('project_description');
            tbl.boolean('project_completed').notNullable();
        })
        .createTable('resources', tbl => {
            tbl.increment('resource_id');
            tbl.string('resource_name').notNullable().unique();
            tbl.string('resource_description');
        })
        .createTable('tasks', tbl => {
            tbl.increment('task_id');
            tbl.string('task_description').notNullable();
            tbl.string('task_notes');
            tbl.boolean('task_completed').notNullable();
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onDelete('RESTRICT');
        })
        .createTable('project_resources', tbl => {
            tbl.increment('project_resource_id');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('resource_id')
                .inTable('resources')
                .onDelete('RESTRICT');
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onDelete('RESTRICT');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
};
