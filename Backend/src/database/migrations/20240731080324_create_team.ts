import { Knex } from "knex";

const TABLE_NAME = "team";

/**
 * Create table team.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id").primary();
    table.string("name", 100).nullable();
    table.bigInteger("user_id").unsigned().notNullable();
    table.bigInteger("team_pokemon1").unsigned().nullable();
    table.bigInteger("team_pokemon2").unsigned().nullable();
    table.bigInteger("team_pokemon3").unsigned().nullable();
    table.bigInteger("team_pokemon4").unsigned().nullable();
    table.bigInteger("team_pokemon5").unsigned().nullable();
    table.bigInteger("team_pokemon6").unsigned().nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    // Foreign key constraints
    table.foreign("user_id").references("id").inTable("user");
    table.foreign("team_pokemon1").references("id").inTable("team_pokemon");
    table.foreign("team_pokemon2").references("id").inTable("team_pokemon");
    table.foreign("team_pokemon3").references("id").inTable("team_pokemon");
    table.foreign("team_pokemon4").references("id").inTable("team_pokemon");
    table.foreign("team_pokemon5").references("id").inTable("team_pokemon");
    table.foreign("team_pokemon6").references("id").inTable("team_pokemon");
  });
}

/**
 * Drop table team.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
