import { defineType, defineField } from "sanity";

export const NavigationType = defineType({
  name: "navigation",
  title: "Navigation Bar",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "links",
      title: "Navigation Links",
      type: "array",
      of: [
        defineField({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "localeString",
            },
            {
              name: "href",
              title: "URL",
              type: "string",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "button",
      title: "Optional Button",
      type: "object",
      fields: [
        {
          name: "label",
          title: "Button Label",
          type: "localeString",
        },
        {
          name: "href",
          title: "Button Link",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "languages",
      title: "Available Languages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Finnish", value: "fi" },
          { title: "Swedish", value: "sv" },
        ],
      },
    }),
  ],
});
