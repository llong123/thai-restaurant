import { type SchemaTypeDefinition } from "sanity";
import { DishType } from "./dishType";
import { AboutType } from "./aboutType";
import { localeString } from "./localeStringType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [AboutType, DishType, localeString],
};
