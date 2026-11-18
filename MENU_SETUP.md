# Google Sheets CMS

The website reads its content from the **Chao Phraya DB** spreadsheet. The sheet must remain viewable by anyone with the link for the website's server to read it. Changes are cached for about one minute.

## Editing content

- **FOOD MENU**: use one dish per row. Enter English, Finnish, Swedish, and Thai values in their language columns. Prices may use a comma or period decimal separator. Use `Yes` or `No` for signature dishes.
- **WEBSITE TEXT**: edit language cells for page copy. The `Page`, `Section`, and `What to change` columns identify where each item is used.
- **WEBSITE IMAGES**: paste a public, direct image URL in `Replace with photo link`. When this is blank, the website keeps using its existing photo; a replacement URL overrides it.

## Adding images

Image URLs must be publicly accessible to website visitors. For Google Drive photos, use an image host or a direct URL that serves the image itself; a private file or a Drive preview page will not work as an image source.

No CMS credentials or environment variables are required for content reads.
