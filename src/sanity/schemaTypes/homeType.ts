import { defineType, defineField } from "sanity";

export const HomeType = defineType({
  name: "homepage",
  title: "Homepage",
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

    // LOCATION SECTION
    defineField({
      name: "location",
      title: "Location Section",
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
          name: "address",
          title: "Address",
          type: "localeString",
        }),
        defineField({
          name: "mapEmbed",
          title: "Google Maps Embed URL",
          type: "url",
        }),
        defineField({
          name: "openingHours",
          title: "Opening Hours",
          type: "object",
          fields: [
            defineField({
              name: "weekdays",
              title: "Weekdays",
              type: "localeString",
            }),
            defineField({
              name: "saturday",
              title: "Saturday",
              type: "localeString",
            }),
            defineField({
              name: "sunday",
              title: "Sunday",
              type: "localeString",
            }),
          ],
        }),
      ],
    }),
  ],
});
