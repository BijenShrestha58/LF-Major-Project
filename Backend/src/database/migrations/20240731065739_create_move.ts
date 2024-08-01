import { Knex } from "knex";

const TABLE_NAME = "move";

/**
 * Create table move.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id").primary();
    table.string("name", 100).notNullable();
    table.integer("power").nullable();
    table.integer("accuracy").nullable();
    table.string("type", 50).notNullable();
    table.string("move_damage_class", 50).notNullable();
    table.integer("pp").notNullable();
    table.integer("priority").notNullable();
    table.string("stat_change").nullable();
    table.integer("stat_change_value").nullable();
  });
}

/**
 * Drop table move.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
