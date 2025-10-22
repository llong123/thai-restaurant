import { defineField, defineType } from "sanity";

export const DishType = defineType({
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    defineField({
      name: "dishImage",
      title: "Dish Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "name",
      description: "Name of the dish",
      type: "string",
    }),
    defineField({
      name: "description",
      description: "Description of the dish",
      type: "localeString",
    }),
    defineField({
      name: "ingredients",
      description: "Ingredients of the dish",
      type: "array",
      of: [{ type: "localeString" }],
    }),
    defineField({
      name: "category",
      description: "Category of the dish",
      type: "string",
    }),
    defineField({
      name: "price",
      description: "Price of the dish",
      type: "number",
    }),
    defineField({
      name: "spiceLevel",
      description: "Spice level of the dish",
      type: "number",
    }),
    defineField({
      name: "signatureDish",
      description: "Signature dish of the restaurant",
      type: "boolean",
    }),
  ],
});
