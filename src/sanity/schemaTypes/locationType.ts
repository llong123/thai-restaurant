import { defineType, defineField } from "sanity";

export const LocationType = defineType({
  name: "visitUs",
  title: "Visit Us Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "localeString",
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "localeString",
    }),

    // Reusable sections: Address / Contact / Opening Hours
    defineField({
      name: "sections",
      title: "Info Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            {
              name: "title",
              title: "Section Title",
              type: "localeString",
            },
            {
              name: "info",
              title: "Section Info Lines",
              type: "array",
              of: [{ type: "localeString" }],
            },
          ],
        },
      ],
    }),

    // MAP
    defineField({
      name: "map",
      title: "Map",
      type: "object",
      fields: [
        {
          name: "embedUrl",
          title: "Google Maps Embed URL",
          type: "url",
        },
      ],
    }),

    // Reusable sections e.g Directions, Parking
    defineField({
      name: "moreSections",
      title: "More Info Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            {
              name: "title",
              title: "Section Title",
              type: "localeString",
            },
            {
              name: "info",
              title: "Section Info Lines",
              type: "array",
              of: [{ type: "localeString" }],
            },
          ],
        },
      ],
    }),
  ],
});
