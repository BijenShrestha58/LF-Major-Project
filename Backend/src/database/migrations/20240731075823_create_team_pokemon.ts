import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create team_pokemon table
  await knex.schema.createTable("team_pokemon", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("pokemon_id").unsigned().notNullable();
    table.bigInteger("move1").unsigned().nullable();
    table.bigInteger("move2").unsigned().nullable();
    table.bigInteger("move3").unsigned().nullable();
    table.bigInteger("move4").unsigned().nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    // Foreign key constraints
    table.foreign("pokemon_id").references("id").inTable("pokemon");
    table.foreign("move1").references("id").inTable("move");
    table.foreign("move2").references("id").inTable("move");
    table.foreign("move3").references("id").inTable("move");
    table.foreign("move4").references("id").inTable("move");
  });
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("team_pokemon");
}
