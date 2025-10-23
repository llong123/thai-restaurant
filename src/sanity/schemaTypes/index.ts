import { type SchemaTypeDefinition } from "sanity";
import { DishType } from "./dishType";
import { AboutType } from "./aboutType";
import { localeString } from "./localeStringType";
import { LocationType } from "./locationType";
import { NavigationType } from "./navigationType";
import { HomeType } from "./homeType";
import { FooterType } from "./footerType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    HomeType,
    NavigationType,
    LocationType,
    AboutType,
    DishType,
    FooterType,
    localeString,
  ],
};
