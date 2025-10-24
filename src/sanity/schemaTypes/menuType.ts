import { defineField, defineType } from "sanity";

export const MenuPageType = defineType({
  name: "menupage",
  title: "Menu Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      description: "Title of menu page",
      type: "localeString",
    }),
    defineField({
      name: "pageDescription",
      description: "Description of menu page",
      type: "localeString",
    }),
    defineField({
      name: "category",
      description: "Title of category",
      type: "localeString",
    }),
    defineField({
      name: "categoryDescription",
      description: "Description of category",
      type: "localeString",
    }),
  ],
});
