import { MenuItem, MenuCategory } from "../menu";
import { LocaleString } from "@/lib/interfaces";

const SUPPORTED_LANGUAGES = ["en", "fi", "sv", "th"] as const;

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(content: string): string[][] {
  const lines = content.trim().split("\n");
  return lines.map(parseCSVLine);
}

function getLocaleString(
  values: string[],
  prefix: string,
): LocaleString | undefined {
  const locale: LocaleString = {};
  let hasAny = false;
  const prefixUpper = prefix.toUpperCase();

  for (const lang of SUPPORTED_LANGUAGES) {
    const keyUpper = `${prefixUpper}_${lang.toUpperCase()}`;
    const index = headers.findIndex((h) => h.trim().toUpperCase() === keyUpper);
    if (index !== -1 && values[index] && values[index].trim()) {
      (locale as Record<string, string>)[lang] = values[index].trim();
      hasAny = true;
    }
  }

  return hasAny ? locale : undefined;
}

let headers: string[] = [];

export async function fetchMenuFromSheets(
  sheetUrl: string,
): Promise<MenuCategory[]> {
  const response = await fetch(sheetUrl, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch menu: ${response.status}`);
  }
  const csvContent = await response.text();
  const rows = parseCSV(csvContent);

  if (rows.length < 2) return [];

  headers = rows[0].map((h) => h.trim());
  const categoriesMap = new Map<string, MenuCategory>();

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    if (!values[0]) continue;

    const categoryName = values[0];
    if (!categoriesMap.has(categoryName)) {
      categoriesMap.set(categoryName, {
        id: categoryName.toLowerCase().replace(/\s+/g, "-"),
        name: getLocaleString(values, "category") || { en: categoryName },
        description: getLocaleString(values, "category_description"),
        items: [],
      });
    }

    const category = categoriesMap.get(categoryName)!;
    const name = getLocaleString(values, "name");
    if (!name) continue;

    const priceStr =
      values[headers.findIndex((h) => h.toLowerCase() === "price")] || "0";
    const price = parseFloat(priceStr) || 0;

    const item: MenuItem = {
      id: `item-${i}`,
      category: categoryName,
      name: getLocaleString(values, "name")!,
      description: getLocaleString(values, "desc"),
      ingredients: getLocaleString(values, "ingredients")
        ? [getLocaleString(values, "ingredients")!]
        : undefined,
      price,
      spiceLevel:
        parseInt(
          values[headers.findIndex((h) => h.toLowerCase() === "spice_level")] ||
            "0",
        ) || 0,
      imageUrl:
        values[headers.findIndex((h) => h.toLowerCase() === "image_url")],
      signatureDish:
        values[
          headers.findIndex((h) => h.toLowerCase() === "signature")
        ]?.toLowerCase() === "true",
    };
    category.items.push(item);
  }

  return Array.from(categoriesMap.values());
}
