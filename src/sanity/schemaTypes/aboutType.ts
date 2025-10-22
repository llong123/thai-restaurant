import { defineField, defineType } from "sanity";

export const AboutType = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
    }),
    defineField({
      name: "paragraph",
      title: "Paragraph",
      type: "array",
      of: [
        {
          type: "object",
          name: "paragraphGroup",
          title: "Paragraph Group",
          fields: [
            {
              name: "paragraphTitle",
              title: "Paragraph Title",
              type: "localeString",
            },
            {
              name: "paragraphDescription",
              title: "Paragraph Description",
              type: "localeString", // inner array
            },
          ],
        },
      ],
    }),
    defineField({
      name: "paragraphInBoxTitle",
      title: "Paragraph In Box Title",
      type: "localeString",
    }),
    defineField({
      name: "paragraphInBox",
      description: "Paragraph in Box",
      type: "array",
      of: [
        {
          type: "object",
          name: "valueGroup",
          title: "Value Group",
          fields: [
            {
              name: "valueTitle",
              title: "Value Title",
              type: "localeString",
            },
            {
              name: "valueDescription",
              title: "Value Description",
              type: "localeString", // inner array
            },
          ],
        },
      ],
    }),
  ],
});
