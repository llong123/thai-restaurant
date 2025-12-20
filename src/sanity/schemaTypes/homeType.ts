import { defineType, defineField } from "sanity";

export const HomeType = defineType({
  name: "homepage",
  title: "Home Page",
  type: "document",

  fields: [
    // HERO SECTION
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "localeString",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "localeString",
        }),
        defineField({
          name: "cta",
          title: "Call to Action Text",
          type: "localeString",
        }),
        defineField({
          name: "ctaUrl",
          title: "Call to Action URL",
          type: "url",
        }),
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "imageCaption",
          title: "Image Caption",
          type: "localeString",
        }),
      ],
    }),

    defineField({
      name: "alertBanner",
      title: "Alert Banner",
      type: "object",
      fields: [
        defineField({
          name: "message",
          title: "Message",
          type: "localeString",
        }),
        defineField({
          name: "showBanner",
          title: "Show Banner",
          type: "boolean",
        }),
        defineField({
          name: "backgroundColor",
          title: "Background Color (English)",
          type: "string",
        }),
        defineField({
          name: "textColor",
          title: "Text Color (English)",
          type: "string",
        }),
      ],
    }),

    // SIGNATURE DISHES
    defineField({
      name: "signatureDishes",
      title: "Signature Dishes Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "localeString",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "localeString",
        }),
      ],
    }),

    // ABOUT SECTION
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "localeString",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "localeString",
        }),
        defineField({
          name: "image",
          title: "About Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // RESERVE TABLE SECTION
    defineField({
      name: "reserveTable",
      title: "Reserve Table Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "localeString",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "localeString",
        }),
      ],
    }),
  ],
});
