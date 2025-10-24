import { defineType, defineField } from "sanity";

export const FooterType = defineType({
  name: "footer",
  title: "Footer Section",
  type: "document",
  fields: [
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      of: [
        defineField({
          name: "link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "localeString",
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "followUs",
      title: "Follow Us Links",
      type: "array",
      of: [
        defineField({
          name: "social",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "localeString",
    }),
  ],
});
