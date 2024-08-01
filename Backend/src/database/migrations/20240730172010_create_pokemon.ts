import { Knex } from "knex";

const TABLE_NAME = "pokemon";

/**
 * Create table pokemon.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id");
    table.string("name", 100).notNullable();
    table.string("type1", 50).notNullable();
    table.string("type2", 50).nullable();
    table.integer("hp").notNullable();
    table.integer("attack").notNullable();
    table.integer("defense").notNullable();
    table.integer("special_attack").notNullable();
    table.integer("special_defense").notNullable();
    table.integer("speed").notNullable();
    table.string("front_sprite", 255).nullable();
    table.string("back_sprite", 255).nullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable().defaultTo(knex.fn.now());
  });
}

/**
 * Drop table pokemon.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
