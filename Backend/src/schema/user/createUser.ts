import Joi from "joi";
import { ROLE } from "../../enum/role";

export const createUserBodySchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be atleast 8 characters long",
      "password.uppercase":
        "Password must have atleast one uppercase character",
      "password.lowercase":
        "Password must have atleast one lowercase character",
      "password.special": "Password must have atleast one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }

      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }

      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
  role: Joi.string()
    .valid(ROLE.ADMIN, ROLE.USER)
    .required()
    .messages({
      "any.required": "Role is required",
      "any.only": `Role must be one of [${Object.values(ROLE).join(", ")}]`,
    }),
});
