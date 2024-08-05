import { Knex } from "knex";

const TABLE_NAME = "battle";

/**
 * Create table battle.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id").primary();

    table
      .bigInteger("player1_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user");
    table
      .bigInteger("player2_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user");

    table
      .bigInteger("player1_active_pokemon_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("team_pokemon");
    table
      .bigInteger("player2_active_pokemon_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("team_pokemon");

    table.integer("player1_active_pokemon_hp").notNullable();
    table.integer("player2_active_pokemon_hp").notNullable();

    table
      .enum("status", ["active", "completed"])
      .notNullable()
      .defaultTo("active");

    table
      .bigInteger("winner_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("user");

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").nullable();

    table
      .bigInteger("created_by")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("user");

    table
      .bigInteger("updated_by")
      .unsigned()
      .references("id")
      .inTable("user")
      .nullable();
  });
}

/**
 * Drop table battle.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
