// lib/notion.ts
import { Client } from "@notionhq/client";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DISHES_DB_ID = process.env.NOTION_DISHES_DB_ID;
const NOTION_LOCATION_DB_ID = process.env.NOTION_LOCATION_DB_ID;

if (!NOTION_TOKEN) {
  throw new Error("Missing NOTION_TOKEN in env");
}

if (!NOTION_DISHES_DB_ID) {
  throw new Error("Missing NOTION_DISHES_DB_ID in env");
}

if (!NOTION_LOCATION_DB_ID) {
  throw new Error("Missing NOTION_LOCATION_DB_ID in env");
}

export const notion = new Client({ auth: NOTION_TOKEN });

export const DATABASE_ID = NOTION_DISHES_DB_ID;
export const DISHES_DATABASE_ID = NOTION_DISHES_DB_ID;
export const LOCATION_DATABASE_ID = NOTION_LOCATION_DB_ID;
