import { type SchemaTypeDefinition } from "sanity";
import { DishType } from "./dishType";
import { AboutType } from "./aboutType";
import { localeString } from "./localeStringType";
import { LocationType } from "./locationType";
import { NavigationType } from "./navigationType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [NavigationType, LocationType, AboutType, DishType, localeString],
};
