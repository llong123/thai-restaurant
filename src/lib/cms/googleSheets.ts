import type { LocaleString, DishData } from "@/lib/interfaces";
import type { HomepageData } from "@/lib/interfaces/homeData";
import type { AboutData } from "@/lib/interfaces/aboutData";
import type { FooterData } from "@/lib/interfaces/footerData";
import type { LocationData } from "@/lib/interfaces/locationData";
import type { MenuPageData } from "@/lib/interfaces/menuData";
import type { NavigationData } from "@/lib/interfaces/navigationData";

const SHEET_ID = "1itLRp1amEGWnwEktgMLzqyZxUZF1-6x-otRN-V7v1mk";
const LANGUAGES = ["en", "fi", "sv", "th"] as const;
type Language = (typeof LANGUAGES)[number];
type Row = Record<string, string>;

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const source = csv.replace(/^\uFEFF/, "");

  for (let i = 0; i < source.length; i += 1) {
    const character = source[i];
    if (character === '"') {
      if (quoted && source[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && source[i + 1] === "\n") i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

async function fetchSheet(sheetName: string): Promise<Row[]> {
  const url = new URL(
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`,
  );
  url.searchParams.set("tqx", "out:csv");
  url.searchParams.set("sheet", sheetName);

  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`Could not read the ${sheetName} tab (${response.status})`);
  }

  const rows = parseCSV(await response.text());
  const isMenuHeader = (row: string[]) =>
    row.includes("Dish name — English") || row.includes("Dish name - English");
  const headerRowIndex = rows.findIndex(
    (row) => row.includes("Page") || isMenuHeader(row),
  );
  if (headerRowIndex < 0) return [];

  const headers = rows[headerRowIndex].map((header, index) => {
    if (index === 0 && isMenuHeader(rows[headerRowIndex])) return "Category";
    return header.trim();
  });
  return rows.slice(headerRowIndex + 1).map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""])),
  );
}

const websiteTextRows = () => fetchSheet("WEBSITE TEXT");
const foodMenuRows = () => fetchSheet("FOOD MENU");
const websiteImageRows = () => fetchSheet("WEBSITE IMAGES");

function localized(row: Row, columns: Record<Language, string>): LocaleString {
  return Object.fromEntries(
    LANGUAGES.flatMap((language) => {
      const value = row[columns[language]]?.trim();
      return value ? [[language, value]] : [];
    }),
  ) as LocaleString;
}

function textRows(
  rows: Row[],
  page: string,
  section: string,
): Row[] {
  return rows.filter((row) => row.Page === page && row.Section === section);
}

function rowForChange(rows: Row[], change: string): Row | undefined {
  return rows.find((row) => row["What to change"] === change);
}

function websiteLocale(row?: Row): LocaleString {
  return row
    ? localized(row, {
        en: "English",
        fi: "Finnish",
        sv: "Swedish",
        th: "Thai",
      })
    : {};
}

async function replacementImage(page: string, where: string): Promise<string | undefined> {
  const rows = await websiteImageRows();
  const imageRow = rows.find(
    (row) => row.Page === page && row["Where the photo appears"] === where,
  );
  const url =
    imageRow?.["Replace with photo link"]?.trim() ||
    imageRow?.["Current photo (click to view)"]?.trim();
  if (!isHttpUrl(url)) return undefined;
  const width = where === "Hero › Image" ? 1920 : where === "Logo Image" ? 500 : 1200;
  return optimizeRemoteImageUrl(url, width);
}

function isHttpUrl(value?: string): value is string {
  return Boolean(value && /^https?:\/\//i.test(value));
}

function optimizeRemoteImageUrl(source: string, width: number): string {
  try {
    const url = new URL(source);
    if (url.hostname !== "res.cloudinary.com") return source;

    const segments = url.pathname.split("/");
    const uploadIndex = segments.indexOf("upload");
    if (uploadIndex < 0) return source;

    const nextSegment = segments[uploadIndex + 1] || "";
    const hasTransformations =
      !/^v\d+$/.test(nextSegment) &&
      /^(?:a|b|c|dpr|e|f|fl|g|h|q|r|t|w)_[^/]+/.test(nextSegment);

    if (hasTransformations) {
      const transformations = new Set(nextSegment.split(","));
      transformations.add("f_auto");
      transformations.add("q_auto");
      if (![...transformations].some((value) => value.startsWith("w_"))) {
        transformations.add(`w_${width}`);
      }
      segments[uploadIndex + 1] = [...transformations].join(",");
    } else {
      segments.splice(uploadIndex + 1, 0, `f_auto,q_auto,w_${width}`);
    }

    url.pathname = segments.join("/");
    return url.toString();
  } catch {
    return source;
  }
}

function imageFromMenuRow(row: Row): string | undefined {
  const replacement = row["Replace with photo link"]?.trim();
  const currentPhoto = row["Current photo (click to view)"]?.trim();
  const url = isHttpUrl(replacement) ? replacement : currentPhoto;
  return isHttpUrl(url) ? optimizeRemoteImageUrl(url, 900) : undefined;
}

export async function getSheetDishes(): Promise<DishData[]> {
  const rows = await foodMenuRows();
  return rows.flatMap((row, index) => {
    const name = localized(row, {
      en: "Dish name — English",
      fi: "Dish name — Finnish",
      sv: "Dish name — Swedish",
      th: "Dish name — Thai",
    });
    if (!name.en && !name.fi && !name.sv && !name.th) return [];

    const category: LocaleString = {
      en: row.Category || undefined,
      fi: row["Category — Fi"] || undefined,
      sv: row["Category — Sv"] || undefined,
      th: row["Category — Thai"] || undefined,
    };
    const ingredients = localized(row, {
      en: "Ingredients — English",
      fi: "Ingredients — Finnish",
      sv: "Ingredients — Swedish",
      th: "Ingredients — Thai",
    });
    const description = localized(row, {
      en: "Description — English",
      fi: "Description — Finnish",
      sv: "Description — Swedish",
      th: "Description — Thai",
    });
    const imageUrl = imageFromMenuRow(row);
    const price = Number.parseFloat((row["Price (€)"] || "0").replace(",", "."));
    const spiceLevel = Number.parseInt(row["Spice level (0–3)"] || row["Spice level (0-3)"] || "0", 10);

    return [{
      _id: `dish-${index + 1}`,
      pageTitle: {},
      pageDescription: {},
      name,
      description,
      ingredients: Object.values(ingredients).some(Boolean) ? [ingredients] : [],
      category,
      price: Number.isFinite(price) ? price : 0,
      spiceLevel: Number.isFinite(spiceLevel) ? spiceLevel : 0,
      dishImage: imageUrl
        ? {
            asset: {
              _ref: "",
              _type: "image",
              url: imageUrl,
            },
          }
        : undefined,
      signatureDish: /^yes$/i.test(row["Signature dish? (Yes/No)"] || ""),
    }];
  });
}

export async function getHomepageData(): Promise<HomepageData> {
  const rows = await websiteTextRows();
  const heroRows = textRows(rows, "Home page", "Main banner");
  const featuredRows = textRows(rows, "Home page", "Featured dishes");
  const aboutRows = textRows(rows, "Home page", "Home page — about section");
  const announcementRows = textRows(rows, "Home page", "Announcement");
  const announcement = rowForChange(announcementRows, "Announcement text");
  const announcementToggle = rowForChange(announcementRows, "Show announcement?");
  const announcementSetting = announcementToggle?.[
    "Current value (if applicable)"
  ]?.trim();
  const showAnnouncement = /^yes$/i.test(announcementSetting || "");

  const [heroImage, aboutImage] = await Promise.all([
    replacementImage("Home page", "Hero › Image"),
    replacementImage("Home page", "About › Image"),
  ]);

  return {
    hero: {
      title: websiteLocale(rowForChange(heroRows, "Main heading")),
      description: websiteLocale(rowForChange(heroRows, "Short introduction")),
      cta: websiteLocale(rowForChange(heroRows, "heroMenuCta")),
      ctaUrl: "/menu",
      locationCta: websiteLocale(rowForChange(heroRows, "heroLocationCta")),
      locationCtaUrl: "/location",
      image: heroImage,
      imageCaption: websiteLocale(rowForChange(heroRows, "Photo description")),
    },
    signatureDishes: {
      title: websiteLocale(rowForChange(featuredRows, "Section heading")),
      description: websiteLocale(rowForChange(featuredRows, "Introduction")),
    },
    about: {
      title: websiteLocale(rowForChange(aboutRows, "Section heading")),
      description: websiteLocale(rowForChange(aboutRows, "Introduction")),
      image: aboutImage,
    },
    reserveTable: { title: {}, description: {} },
    location: {
      title: {},
      description: {},
      sections: [],
      map: {},
    },
    alertBanner: {
      showBanner: showAnnouncement,
      message: websiteLocale(announcement),
      backgroundColor: "#E5484D",
      textColor: "#FFFFFF",
    },
  };
}

export async function getAboutData(): Promise<AboutData> {
  const rows = await websiteTextRows();
  const pageRows = textRows(rows, "About page", "About page");
  const storyRows = textRows(rows, "About page", "Our story");
  const valueRows = textRows(rows, "About page", "Our values");
  const values = [1, 2, 3].map((number) => ({
    _key: `value-${number}`,
    _type: "valueGroup" as const,
    valueTitle: websiteLocale(rowForChange(valueRows, `Value ${number} heading`)),
    valueDescription: websiteLocale(rowForChange(valueRows, `Value ${number} description`)),
  }));
  const image = await replacementImage("About page", "Main Image");

  return {
    title: websiteLocale(rowForChange(pageRows, "Page heading")),
    paragraph: [{
      _key: "story",
      _type: "paragraphGroup",
      paragraphTitle: websiteLocale(rowForChange(storyRows, "Section 1 heading")),
      paragraphDescription: websiteLocale(rowForChange(storyRows, "Section 1 text")),
    }],
    paragraphInBoxTitle: websiteLocale(rowForChange(valueRows, "Section heading")),
    paragraphInBox: values,
    mainImage: image ? { asset: { url: image } } : undefined,
  };
}

export async function getLocationData(): Promise<LocationData> {
  const rows = await websiteTextRows();
  const pageRows = textRows(rows, "Location page", "Location page");
  const detailRows = textRows(rows, "Location page", "Location details");
  const moreRows = textRows(rows, "Location page", "More location details");

  const makeSections = (sectionRows: Row[]) => {
    const headings = sectionRows.filter((row) => /^Section \d+ heading$/.test(row["What to change"]));
    return headings.map((heading) => {
      const number = heading["What to change"].match(/^Section (\d+)/)?.[1];
      const lines = sectionRows.filter((row) =>
        new RegExp(`^Section ${number} — line \\d+$`).test(row["What to change"]),
      );
      return {
        title: websiteLocale(heading),
        info: lines.map(websiteLocale),
      };
    });
  };

  return {
    title: websiteLocale(rowForChange(pageRows, "Page heading")),
    description: websiteLocale(rowForChange(pageRows, "Introduction")),
    sections: makeSections(detailRows),
    moreSections: makeSections(moreRows),
    map: {
      embedUrl: "https://www.google.com/maps?q=L%C3%B6nnrotinkatu%2034%2C%2000180%20Helsinki&output=embed",
    },
  };
}

export async function getNavigationData(): Promise<NavigationData> {
  const rows = await websiteTextRows();
  const logoUrl = await replacementImage("Website header", "Logo Image");
  const headerRows = textRows(rows, "Website header", "Website header");
  const paths = ["/", "/menu", "/about", "/location"];
  const links = headerRows
    .filter((row) => /^Menu item \d+ label$/.test(row["What to change"]))
    .sort((a, b) => Number(a["What to change"].match(/\d+/)?.[0]) - Number(b["What to change"].match(/\d+/)?.[0]))
    .map((row, index) => ({ name: websiteLocale(row), href: paths[index] || "/" }));
  const restaurantName = rowForChange(headerRows, "Restaurant name");

  return {
    siteTitle: restaurantName?.["Current value (if applicable)"] || "Chao Phraya",
    logoUrl,
    links,
    languages: [...LANGUAGES],
  };
}

export async function getFooterData(): Promise<FooterData> {
  const rows = await websiteTextRows();
  const footerRows = textRows(rows, "Footer", "Footer");
  const [nav, logoUrl] = await Promise.all([
    getNavigationData(),
    replacementImage("Website header", "Logo Image"),
  ]);
  const socials = [
    { platform: "Instagram", url: "https://www.instagram.com/chaophraya.fi/" },
    { platform: "Facebook", url: "https://www.facebook.com/ChaoPhrayaHelsinki" },
  ];

  return {
    logoUrl,
    quickLinks: nav.links.map((link) => ({ label: link.name, url: link.href })),
    followUs: socials.filter((social) =>
      footerRows.some((row) => row["Current value (if applicable)"] === social.platform),
    ),
    copyright: websiteLocale(rowForChange(footerRows, "Copyright text")),
  };
}

export async function getMenuPageData(): Promise<MenuPageData> {
  const rows = await websiteTextRows();
  const menuRows = textRows(rows, "Menu page", "Menu page");
  return {
    _id: "google-sheet-menu-page",
    pageTitle: websiteLocale(rowForChange(menuRows, "Page heading")),
    pageDescription: websiteLocale(rowForChange(menuRows, "Introduction")),
    category: {},
    categoryDescription: {},
    dishListTitle: websiteLocale(rowForChange(menuRows, "Dish list heading")),
    dishListDescription: websiteLocale(rowForChange(menuRows, "Dish list introduction")),
  };
}
