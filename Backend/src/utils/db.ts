import toSnakeCase from "to-snake-case";
import { baseKnexConfig } from "../knexfile";
import knex, { Knex } from "knex";
import camelize from "camelize";

/**
 * Knex configuration with custom identifier wrapping and response processing.
 *
 * - Converts identifiers to snake_case.
 * - Camelizes response keys.
 *
 * @module
 */

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  wrapIdentifier: (value, originalImpl) => {
    if (value === "*") {
      return originalImpl(value);
    }

    return originalImpl(toSnakeCase(value));
  },
  postProcessResponse: (result) => {
    return camelize(result);
  },
};
export default knex(knexConfig);
